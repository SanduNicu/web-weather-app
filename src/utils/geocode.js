const request = require('request');

const geocode = (location, callback) => {
  const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoic2FuZHVuaWN1IiwiYSI6ImNrMjlnM3p1YjI2dmIzZG1xZnF5eXVmd3IifQ.kt1tH9c-L9EhWVUFu5a5VQ&limit=1`;
  request({ url: locationUrl, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to location service');
    } else if (response.body.features.length === 0) {
      callback('Unable to find location. Try another search!');
    } else {
      const { features: [{ center: [ long, lat ]}] } = response.body
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      })
    }
  })
};

module.exports = geocode
