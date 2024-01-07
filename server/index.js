const express = require("express");

const app = express();

app.get("/", async (req, res) => {
  try {
    const data = await fetch("https://api.adviceslip.com/advice", {
      method: "GET",
    });

    const response = await data.json();

    return res.json(response);
  } catch (error) {
    res.json({ slip: { id: "0x0", advice: "Unknown error, restart app" } });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("App started");
});
