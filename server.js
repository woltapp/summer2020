const express = require('express');
const restaurantsModule = require('./modules/restaurants');

const app = express();

app.get('/restaurants/search', restaurantsModule.search);
app.listen(3000);
