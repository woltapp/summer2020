(function () {
  const linkDiv = document.querySelector('.row');
  const restaurantsArray = jsonContent.restaurants;
  const restaurantsNumber = restaurantsArray.length;
  function createRestaurantsCards() {
    let massiveCards = '';
    let restaurantsOnline = '';
    for (let i = 0; i < restaurantsNumber; i++) {
      restaurantsOnline = '';
      if (restaurantsArray[i].online) {
        restaurantsOnline = '<span class="badge badge-success">online</span>';
      } else {
        restaurantsOnline = '<span class="badge badge-danger">offline</span>';
      }
      massiveCards += `<div class = 'col mb-4'> \
        <div class = 'card h-100'> \
        <img style = "height: 250px; object-fit: cover" src = ${restaurantsArray[i].image} class = 'card-img-top'> \
        <div class = 'card-body'> \
        <h5 class = 'card-title text-truncate'>${restaurantsArray[i].name}</h5> \
        <p class = 'card-text text-truncate'>${restaurantsArray[i].description}</p> \
        </div> \
        <div class="card-footer text-muted text-truncate">\
        ${restaurantsOnline}\
        <small>${restaurantsArray[i].tags}</small>\
        </div>\
        </div> \
        </div>`;
    }
    linkDiv.innerHTML += massiveCards;
  }
  createRestaurantsCards();
  function alphabetSortingArray() {
    restaurantsArray.sort((a, b) => {
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
  const ascAlphabetSortingBtn = document.querySelector('.ascAlphSort');
  ascAlphabetSortingBtn.onclick = function () {
    linkDiv.innerHTML = '';
    alphabetSortingArray();
    createRestaurantsCards();
  };
  const descAlphabetSortingBtn = document.querySelector('.descAlphSort');
  descAlphabetSortingBtn.onclick = function () {
    linkDiv.innerHTML = '';
    alphabetSortingArray();
    restaurantsArray.reverse();
    createRestaurantsCards();
  };
}());
