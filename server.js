const express = require('express');
const restaurants = require('./modules/restaurants');

const app = express();

app.use(express.static('public'));
app.get('/restaurants/search', restaurants.search);

app.listen(3000);
console.log('Server starts!');
