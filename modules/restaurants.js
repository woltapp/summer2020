const geolib = require('geolib');
const dateBase = require('../dataBase');

module.exports.search = function (req, res) {
  const perPage = 5;
  const pageNumber = req.query.page;
  const sortType = req.query.sort;
  const queryString = req.query.q.toLocaleLowerCase();
  const restarantsCards = dateBase.restarantsList.restaurants;
  const numberOfRestaurants = dateBase.restarantsList.restaurants.length;
  const searchResults = {};
  const selectionByQueryString = [];
  for (let i = 0; i < numberOfRestaurants; i++) {
    const restarantName = restarantsCards[i].name.toLocaleLowerCase();
    const restarantDescription = restarantsCards[i].description.toLocaleLowerCase();
    const restaurantTags = restarantsCards[i].tags.join(' ');
    if (restarantName.indexOf(queryString) !== -1) {
      selectionByQueryString.push(restarantsCards[i]);
    } else if (restarantDescription.indexOf(queryString) !== -1) {
      selectionByQueryString.push(restarantsCards[i]);
    } else if (restaurantTags.indexOf(queryString) !== -1) {
      selectionByQueryString.push(restarantsCards[i]);
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
  function alphabetSortingArray(elem) {
    elem.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
  if (sortType === 'asc') {
    alphabetSortingArray(selectedRestaurants);
  } else if (sortType === 'desc') {
    alphabetSortingArray(selectedRestaurants);
    selectedRestaurants.reverse();
  }
  const pages = Math.ceil(selectedRestaurants.length / perPage);
  const restaurantsOnPage = [];
  for (let i = (pageNumber - 1) * perPage; i < pageNumber * perPage; i++) {
    if (selectedRestaurants[i] !== undefined) {
      restaurantsOnPage.push(selectedRestaurants[i]);
    }
  }
  searchResults.numberOfPages = pages;
  searchResults.data = restaurantsOnPage;
  res.json(searchResults);
};
