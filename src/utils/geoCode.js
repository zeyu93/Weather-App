const request = require("request");

const GEO_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const GEO_API_KEY =
  "pk.eyJ1Ijoiejc5bGl1IiwiYSI6ImNrZnBta2hrbzBiNjAydW11MGN6ZDBza2UifQ.RkyrjaG1h1LMTa8yIP-j8A";

const getCoordsForCity = city => {
  return new Promise((resolve, reject) => {
    let search_text = `${city}.json`;
    let url = `${GEO_URL}${encodeURIComponent(
      search_text
    )}?access_token=${GEO_API_KEY}`;
    request(
      {
        url,
        json: true
      },
      (err, res) => {
        if (err) {
          reject(err)
        } else if (res.body.error || !res.body.features.length) {
          reject("bad request, no location found");
        } else {
          let city = res.body.features[0];
          console.log(city)
          const [long, lat] = city.center;
          let data = {
            long,
            lat,
            location: city.place_name
          };
          resolve(data);
        }
      }
    );
  });
};

module.exports = getCoordsForCity;
