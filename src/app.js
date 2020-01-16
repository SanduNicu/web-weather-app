const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const request = require('request');

const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/view');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address needed!', })
  }

  getWeather(req.query.address, res);

});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
  });
});

app.listen(3000, () => {
  console.log('Server up!');
});

const getWeather = (userAddress, res) => {
  geocode(userAddress, (error, data = {}) => {
    if (error) {
      return res.send({ error });
    }
    const { longitude, latitude, location } = data;

    forecast({ longitude, latitude }, (err, data) => {
      if (error) {
        return res.send({ error });
      }
      const { summary, temperature, precipProbability } = data;
      res.send({
        address: userAddress,
        location,
        summary,
        temperature,
        precipProbability
      })
    })
  });
}
