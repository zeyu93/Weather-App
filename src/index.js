const path = require("path");
const express = require("express");
const getCoordsForCity = require("./utils/geoCode");
const getWeatherWithCoords = require("./utils/weather");

const app = express();

const PORT = process.env.PORT || 3000

const public = path.join(__dirname, "../public");
app.set("view engine", "hbs");
app.use(express.static(public));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App"
  });
});

app.get("/weather", async (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send("No address provided");
  }

  try {
    let data = await getCoordsForCity(address);
    let result = await getWeatherWithCoords(data);
    console.log(result)
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

app.get("/about", (req, res) => {
  res.send("about.html");
});

app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
