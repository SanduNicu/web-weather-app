const path = require('path');
const express = require('express');
const hbs = require('hbs');

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

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
  });
});

// app.get('/weather', (req, res) => {
//   res.send('<h1>Help</h1>')
// });

app.listen(3000, () => {
  console.log('Server up!');
});
