import { useFonts } from "expo-font";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import { Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [advice, setAdvice] = useState({});

  preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    regular: Manrope_400Regular,
    medium: Manrope_500Medium,
    "semi-bold": Manrope_600SemiBold,
    bold: Manrope_700Bold,
    "extra-bold": Manrope_800ExtraBold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        const response = await fetch(`http://192.168.0.109:3000`);
        const data = await response.json();
        setAdvice(data.slip);

        if (fontsLoaded) {
          setIsAppReady(true);
          await hideAsync();
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, [fontsLoaded]);

  const handlePress = async () => {
    const response = await fetch(`http://192.168.0.109:3000`);
    const data = await response.json();
    setAdvice(data.slip);
  };

  if (!isAppReady) return null;
  return (
    <View style={styles.container}>
      <View style={styles.advice}>
        <View style={styles.boxHead}>
          <Text style={styles.adviceHead}>ADVICE #{advice.id}</Text>
        </View>
        <View style={styles.boxBody}>
          <Text style={styles.adviceText}>{advice.advice}</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.pause}>
          <MaterialCommunityIcons name="pause" size={20} color="#cee3e9" />
        </View>
      </View>
      <View style={styles.dice}>
        <TouchableOpacity onPress={handlePress}>
          <MaterialCommunityIcons name="dice-5" size={40} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f2632",
    alignItems: "center",
    justifyContent: "center",
  },
  advice: {
    width: width / 1.1,
    backgroundColor: "#323a49",
    paddingHorizontal: 20,
    paddingVertical: 45,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  adviceHead: {
    color: "#52ffa8",
    textTransform: "uppercase",
    fontSize: 15,
    letterSpacing: 1,
    fontFamily: "extra-bold",
  },
  boxBody: {
    marginVertical: 20,
  },
  adviceText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    fontFamily: "bold",
    width: width / 1.2,
  },
  divider: {
    height: 1,
    backgroundColor: "#cee3e9",
    marginTop: 40,
    marginBottom: 30,
    width: width / 1.2,
  },
  dice: {
    backgroundColor: "#52ffa8",
    padding: 8,
    borderRadius: 100,
    marginTop: -30,
  },
  pause: {
    backgroundColor: "#4e5d73",
    padding: 2,
    marginTop: -42,
  },
});
