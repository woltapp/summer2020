(function () {
  //window.onload = function () {
  //  document.querySelector('.spinner-border').style.display = 'none';
  //};
  const linkDiv = document.querySelector('.row');
  const restaurantsArray = jsonContent.restaurants;
  function createRestaurantsCards(restaurantsList) {
    linkDiv.innerHTML = '';
    let massiveCards = '';
    let restaurantsOnline = '';
    const restaurantsNumber = restaurantsList.length;
    for (let i = 0; i < restaurantsNumber; i++) {
      restaurantsOnline = '';
      if (restaurantsList[i].online) {
        restaurantsOnline = '<span class="badge badge-success">online</span>';
      } else {
        restaurantsOnline = '<span class="badge badge-danger">offline</span>';
      }
      massiveCards += `<div class = 'col mb-4'>
        <div class = 'card h-100'>
        <img style = "height: 250px; object-fit: cover" src = ${restaurantsList[i].image} class = 'card-img-top'>
        <div class = 'card-body'>
        <h5 class = 'card-title text-truncate'>${restaurantsList[i].name}</h5>
        <p class = 'card-text text-truncate'>${restaurantsList[i].description}</p>
        </div>
        <div class="card-footer text-muted text-truncate">
        ${restaurantsOnline}
        <small>${restaurantsList[i].tags}</small>
        </div>
        </div>
        </div>`;
    }
    linkDiv.innerHTML += massiveCards;
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
  const hiddenBtn = document.querySelectorAll('.hidden');
  const searchRestaurant = document.querySelector('.searchRestaurant');
  searchRestaurant.onsubmit = function search(event) {
    event.preventDefault();
    hiddenBtn[0].hidden = true;
    hiddenBtn[1].hidden = true;
    const latitude = [];
    const longitude = [];
    for (let i = 0; i < restaurantsArray.length; i++) {
      latitude.push(restaurantsArray[i].location[1]);
      longitude.push(restaurantsArray[i].location[0]);
    }
    const maxLatitude = Math.max.apply(null, latitude);
    const minLatitude = Math.min.apply(null, latitude);
    const maxLongitude = Math.max.apply(null, longitude);
    const minLongitude = Math.min.apply(null, longitude);
    const randomLatitude = Math.random() * (maxLatitude - minLatitude) + minLatitude;
    const randomLongitude = Math.random() * (maxLongitude - minLongitude) + minLongitude;
    const searchWords = event.target.search_word.value;
    window.history.replaceState({}, '', searchWords);
    //Функция ниже будет вызываться для заданного numberOfPage,пока это значение фиксированно!
    //function createListOfReasaurants(numberOfPage) {
      const requestUrl = `/restaurants/search?q=${searchWords}&lat=${randomLatitude}&lon=${randomLongitude}&page=2`;//${numberOfPage}`;
      const request = new XMLHttpRequest();
      request.open('GET', requestUrl);
      request.responseType = 'json';
      request.send();
      request.onload = function () {
        const foundRestaurants = request.response;
        if (foundRestaurants.data.length == 0) {
          linkDiv.innerHTML = 'Unfortunately there is no such restaurant';
          return;
        }
        hiddenBtn[0].hidden = false;
        hiddenBtn[1].hidden = false;
        createRestaurantsCards(foundRestaurants.data);
        const ascAlphabetSortingBtn = document.querySelector('.ascAlphSort');
        ascAlphabetSortingBtn.onclick = function () {
          alphabetSortingArray(foundRestaurants.data);
          createRestaurantsCards(foundRestaurants.data);
          window.history.replaceState({}, '', '/asc');
        };
        const descAlphabetSortingBtn = document.querySelector('.descAlphSort');
        descAlphabetSortingBtn.onclick = function () {
          alphabetSortingArray(foundRestaurants.data);
          foundRestaurants.data.reverse();
          createRestaurantsCards(foundRestaurants.data);
          window.history.replaceState({}, '', '/desc');
        };
      };
    }
}());
