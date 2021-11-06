const request = require("postman-request");

const forecast = (lat, lon, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(
    lat
  )}&lon=${encodeURIComponent(
    lon
  )}&appid=b5db5ab0a0c6c1b64cb8ce9e0373373b&units=metric`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.message) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.weather[0].main}. It is currently ${body.main.temp} degress out. It feels like ${body.main.feels_like} degress out. The humidity is ${body.main.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
