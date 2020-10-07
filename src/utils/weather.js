const BASE_URL = "http://api.weatherstack.com/current?";
const API_KEY = "827a0e8d06c09df1cf2bf641d1b60d1e";
const request = require("request");

const getWeatherWithCoords = data => {
  return new Promise((resolve, reject) => {
    const { long, lat, location } = data;
    let query = encodeURIComponent(`${lat},${long}`);
    request(
      {
        url: `${BASE_URL}access_key=${API_KEY}&query=${query}`,
        json: true
      },
      (err, response) => {
        if (err) {
          reject("no net work");
        } else if (response.body.error) {
          reject("Unable to find location");
        } else {
          let current = response.body.current;
          const { feelslike, temperature } = current;
          console.log(
            `it is currently ${temperature} but it feels like ${feelslike} in ${location}`
          );
          resolve({
            temperature,
            feelslike,
            location
          });
        }
      }
    );
  });
};

module.exports = getWeatherWithCoords;
