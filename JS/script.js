(function () {
  const linkDiv = document.querySelector('.row');
  const requestUrl = 'https://raw.githubusercontent.com/victor-syrkashev/summer2020/master/restaurants.json';
  const request = new XMLHttpRequest();
  request.open('GET', requestUrl);
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    const repositories = request.response;
    const restaurantsMass = repositories.restaurants;
    const restaurantsNumber = restaurantsMass.length;
    let massiveCards = '';
    for (let i = 0; i < restaurantsNumber; i++) {
      massiveCards += `<div class = 'col mb-4'> \
          <div class = 'card h-100'> \
          <img style = "height: 200px; object-fit: cover" src = ${restaurantsMass[i].image} class = 'card-img-top'> \
          <div class = 'card-body'> \
          <h5 class = 'card-title'>${restaurantsMass[i].name}</h5> \
          <p class = 'card-text'>${restaurantsMass[i].tags}</p> \
          </div> \
          </div> \
          </div>`;
    }
    linkDiv.innerHTML += massiveCards;
  };
  const alphSortBtn = document.querySelector('.alphSort');
  alphSortBtn.onclick = function () {
    linkDiv.innerHTML = '';
    const repositories = request.response;
    const restaurantsMass = repositories.restaurants;
    restaurantsMass.sort((a, b) => {
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
    const restaurantsNumber = repositories.restaurants.length;
    let massiveCards = '';
    for (let i = 0; i < restaurantsNumber; i++) {
      massiveCards += `<div class = 'col mb-4'> \
          <div class = 'card h-100'> \
          <img style = "height: 200px; object-fit: cover" src = ${restaurantsMass[i].image} class = 'card-img-top'> \
          <div class = 'card-body'> \
          <h5 class = 'card-title'>${restaurantsMass[i].name}</h5> \
          <p class = 'card-text'>${restaurantsMass[i].tags}</p> \
          </div> \
          </div> \
          </div>`;
    }
    linkDiv.innerHTML += massiveCards;
  };
  const revAlphSort = document.querySelector('.revAlphSort');
  revAlphSort.onclick = function () {
    linkDiv.innerHTML = '';
    const repositories = request.response;
    const restaurantsMass = repositories.restaurants;
    restaurantsMass.sort((a, b) => {
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
    restaurantsMass.reverse();
    const restaurantsNumber = restaurantsMass.length;
    let massiveCards = '';
    for (let i = 0; i < restaurantsNumber; i++) {
      massiveCards += `<div class = 'col mb-4'> \
          <div class = 'card h-100'> \
          <img style = "height: 200px; object-fit: cover" src = ${restaurantsMass[i].image} class = 'card-img-top'> \
          <div class = 'card-body'> \
          <h5 class = 'card-title'>${restaurantsMass[i].name}</h5> \
          <p class = 'card-text'>${restaurantsMass[i].tags}</p> \
          </div> \
          </div> \
          </div>`;
    }
    linkDiv.innerHTML += massiveCards;
  };
}());
