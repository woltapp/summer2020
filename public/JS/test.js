(function () {
  const restaurant = jsonContent.restaurants;
  let latitude = [];
  let longitude = [];
  for (let i = 0; i < restaurant.length; i++) {
    latitude.push(restaurant[i].location[1]);
    longitude.push(restaurant[i].location[0]);
  }
  console.log(Math.max.apply(null, latitude), Math.min.apply(null, latitude));
  console.log(Math.max.apply(null, longitude), Math.min.apply(null, longitude));
}());
