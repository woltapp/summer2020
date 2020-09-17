(function () {
  //  window.onload = function () {
  //  document.querySelector('.spinner-border').style.display = 'none';
  //  };
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
    hiddenBtn[0].hidden = false;
    hiddenBtn[1].hidden = false;
    const ascAlphabetSortingBtn = document.querySelector('.ascAlphSort');
    const descAlphabetSortingBtn = document.querySelector('.descAlphSort');
    let numberOfPage = 1;
    let requestUrl = '';
    function createListOfReasaurants(elem) {
      if (elem === undefined) {
        requestUrl = `/restaurants/search?q=${searchWords}&lat=${randomLatitude}&lon=${randomLongitude}&page=${numberOfPage}`;
      } else {
        requestUrl = `/restaurants/search?q=${searchWords}&lat=${randomLatitude}&lon=${randomLongitude}&page=${numberOfPage}` + `${elem}`;
      }
      const linkNav = document.querySelector('.pagination');
      linkNav.innerHTML = '';
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
        createRestaurantsCards(foundRestaurants.data);
        let navContent = '';
        for (let i = 1; i <= foundRestaurants.numberOfPages; i++) {
          if (i == numberOfPage) {
            navContent += `<li class='page-item active'><a class='page-link'>${i}</a></li>`;
          } else {
            navContent += `<li class='page-item'><a class='page-link'>${i}</a></li>`;
          }
        }
        linkNav.innerHTML += navContent;
      };
    }
    createListOfReasaurants();
    ascAlphabetSortingBtn.onclick = function () {
      createListOfReasaurants('&sort=asc');
      window.history.replaceState({}, '', '/asc');
    };
    descAlphabetSortingBtn.onclick = function () {
      createListOfReasaurants('&sort=desc');
      window.history.replaceState({}, '', '/desc');
    };
    const pagination = document.getElementById('pagination');
    pagination.onclick = function (e) {
      const tar = e.target;
      numberOfPage = tar.innerHTML;
      if (ascAlphabetSortingBtn.onclick === true) {
        createListOfReasaurants('&sort=asc');
      } else if (descAlphabetSortingBtn.onclick === true) {
        createListOfReasaurants('&sort=desc');
      } else {
        createListOfReasaurants();
      }
    };
  };
}());
