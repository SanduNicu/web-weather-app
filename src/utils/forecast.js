const request = require('request');

const forecast = ({ longitude, latitude }, callback) => {
  const weatherUrl = `https://api.darksky.net/forecast/1a6b7d625e7cdc2f8e30b19a1512ecfe/${longitude},${latitude}?units=si`;
  request({ url: weatherUrl, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!');
    } else if (response.body.error) {
      callback(response.body.error);
    } else {
      const { currently: { temperature, precipProbability }, daily: { data: [{ summary }] } } = response.body;
      callback(undefined, {
        summary,
        temperature,
        precipProbability,
      })
    }
  });
}

module.exports = forecast;
