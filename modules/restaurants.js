const geolib = require('geolib');
const jsonContent = require('../db_restaurants');

exports.search = function (req, res) {
  const queryString = req.query.q;
  const numberOfRestaurants = jsonContent.restaurants.length;
  const selectionByQueryString = [];
  for (let i = 0; i < numberOfRestaurants; i++) {
    if (jsonContent.restaurants[i].name.indexOf(queryString) !== -1) {
      selectionByQueryString.push(jsonContent.restaurants[i]);
    } else if (jsonContent.restaurants[i].description.indexOf(queryString) !== -1) {
      selectionByQueryString.push(jsonContent.restaurants[i]);
    } else if (jsonContent.restaurants[i].tags.join(' ').indexOf(queryString) !== -1) {
      selectionByQueryString.push(jsonContent.restaurants[i]);
    }
  }
  let distance = 0;
  const maxDistance = 3000;
  const selectedRestaurants = [];
  for (let i = 0; i < selectionByQueryString.length; i++) {
    distance = geolib.getDistance(
      { latitude: req.query.lat, longitude: req.query.lon },
      { latitude: selectionByQueryString[i].location[1], longitude: selectionByQueryString[i].location[0] },
    );
    if (distance < maxDistance) {
      selectedRestaurants.push(selectionByQueryString[i]);
    }
  }
  res.json(selectedRestaurants);
};
