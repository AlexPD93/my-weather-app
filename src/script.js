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
  document.forms["change-city-form"].reset();
  celsiusLink.classList.remove("remove-underline");
  fahrenLink.classList.add("remove-underline");
}

function displayForecast() {
  let forecastElement = document.querySelector(`#forecast`);

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class="forecast-wrapper">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="day-weather">
           <div>${day}</div> 
            <div class="weather-image">
              <img
                class="weather-emojis"
                src="Images/Sun emoji.png"
                alt="Sun emoji"          
              />
            </div>
            <div class="day-temperatures">15°C/5°C</div>
          </div>
          `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayCelciusTemp(event) {
  event.preventDefault();
  let city = document.querySelector(`#city-title`).textContent;
  celsiusLink.classList.remove("remove-underline");
  fahrenLink.classList.add("remove-underline");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
  let apiKey = `d3da927bc59cf1a6983a5b442fc7678e`;
  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showCityInfo);
}

function displayFahrenTemp(event) {
  event.preventDefault();
  let city = document.querySelector(`#city-title`).textContent;
  celsiusLink.classList.add("remove-underline");
  fahrenLink.classList.remove("remove-underline");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
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
  let cityTitle = document.querySelector(`#city-title`);
  let countryTitle = document.querySelector(`#country-title`);
  let iconElement = document.querySelector(`#icon`);

  cityTitle.innerHTML = `${city}`;
  countryTitle.innerHTML = `${country}`;
  iconElement.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(`alt`, response.data.weather[0].description);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  let apiKey = `d3da927bc59cf1a6983a5b442fc7678e`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showLocation);
}

function showLocation(response) {
  celsiusLink.classList.remove("remove-underline");
  fahrenLink.classList.add("remove-underline");
  let location = response.data.name;
  let country = response.data.sys.country;
  let cityTitle = document.querySelector(`#city-title`);
  let countryTitle = document.querySelector(`#country-title`);
  cityTitle.innerHTML = `${location}`;
  countryTitle.innerHTML = `${country}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector(`#temperature`);
  temperatureDisplay.innerHTML = `${temperature}`;
  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector(`#weather-description`);
  let iconElement = document.querySelector(`#icon`);

  weatherDescription.innerHTML = `${description}`;
  icon.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(`alt`, response.data.weather[0].description);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
  let apiKey = `d3da927bc59cf1a6983a5b442fc7678e`;
  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showCityInfo);
}

let form = document.querySelector(`#change-city-form`);
form.addEventListener(`submit`, searchCity);

let celsiusLink = document.querySelector(`#celcius-temp`);
celsiusLink.addEventListener(`click`, displayCelciusTemp);

let fahrenLink = document.querySelector(`#fahren-temp`);
fahrenLink.addEventListener(`click`, displayFahrenTemp);

let currentLocation = document.querySelector(`#current-location`);
currentLocation.addEventListener(`click`, getCurrentLocation);

search("London");
displayForecast();
