let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) hours = "0" + now.getHours();

let minutes = now.getMinutes();
if (minutes < 10) minutes = "0" + now.getMinutes();

let date = now.getDate();
if (date < 10) date = "0" + now.getDate();

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[now.getMonth()];

let year = now.getFullYear();

let dayTime = document.querySelector(`#day-time`);
dayTime.innerHTML = `${day} ${hours}:${minutes}`;

let todaysDate = document.querySelector(`#date`);
todaysDate.innerHTML = `${date}/${month}/${year}`;

function searchCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector(`#change-city-input`);
  let city = document.querySelector(`#city-title`);
  if (citySearch.value) {
    city.innerHTML = `${citySearch.value}`;
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}`;
  let apiKey = `d3da927bc59cf1a6983a5b442fc7678e`;
  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showCityInfo);
}

function searchCityCelcius(event) {
  event.preventDefault();
  let citySearch = document.querySelector(`#change-city-input`);
  let city = document.querySelector(`#city-title`);
  if (citySearch.value) {
    city.innerHTML = `${citySearch.value}`;
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}`;
  let apiKey = `d3da927bc59cf1a6983a5b442fc7678e`;
  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showCityInfo);
}

function searchCityFahren(event) {
  event.preventDefault();
  let citySearch = document.querySelector(`#change-city-input`);
  let city = document.querySelector(`#city-title`);
  if (citySearch.value) {
    city.innerHTML = `${citySearch.value}`;
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}`;
  let apiKey = `d3da927bc59cf1a6983a5b442fc7678e`;
  axios.get(`${apiUrl}&appid=${apiKey}&units=imperial`).then(showCityInfo);
}

function showCityInfo(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector(`#temperature`);
  temperatureDisplay.innerHTML = `${temperature}`;
  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector(`#weather-description`);
  weatherDescription.innerHTML = `${description}`;
  let city = response.data.name;
  let country = response.data.sys.country;
  let cityCountryTitle = document.querySelector(`#city-title`);
  cityCountryTitle.innerHTML = `${city},  ${country}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  let apiKey = `d3da927bc59cf1a6983a5b442fc7678e`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showLocation);
}

function showLocation(response) {
  let location = response.data.name;
  let country = response.data.sys.country;
  let locationTemp = document.querySelector(`#city-title`);
  locationTemp.innerHTML = `${location} ${country}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector(`#temperature`);
  temperatureDisplay.innerHTML = `${temperature}`;
  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector(`#weather-description`);
  weatherDescription.innerHTML = `${description}`;
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let form = document.querySelector(`#change-city-form`);
form.addEventListener(`submit`, searchCity);

let celciusTemp = document.querySelector(`#celcius-temp`);
celciusTemp.addEventListener(`click`, searchCityCelcius);

let fahrenTemp = document.querySelector(`#fahren-temp`);
fahrenTemp.addEventListener(`click`, searchCityFahren);

let currentLocation = document.querySelector(`#current-location`);
currentLocation.addEventListener(`click`, getCurrentLocation);
getCurrentLocation();
