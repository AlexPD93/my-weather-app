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

let dayTime = document.querySelector(`#day`);
dayTime.innerHTML = `${day}`;

let todaysDate = document.querySelector(`#date`);
todaysDate.innerHTML = `${date}/${month}/${year}`;

function searchCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector(`#change-city-input`);
  let city = document.querySelector(`#city-title`);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}`;
  let apiKey = `d3da927bc59cf1a6983a5b442fc7678e`;

  city.innerHTML = `${citySearch.value}`;

  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showCityInfo);
  document.forms["change-city-form"].reset();
  celsiusLink.classList.remove("remove-underline");
  fahrenLink.classList.add("remove-underline");
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector(`#forecast`);

  let forecastHTML = `<div class="forecast-wrapper">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5)
      forecastHTML =
        forecastHTML +
        `<div class="day-weather">
           <div>${formatDay(forecastDay.dt)}</div> 
            <div class="weather-image">
              <img
                class="weather-emojis"
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="Sun emoji"          
              />
            </div>
            <div class="day-temperatures">
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}</span>
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temp.min
            )}</span>
            </div>
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

function getForecast(coordinates) {
  let apiKey = `d3da927bc59cf1a6983a5b442fc7678e`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  let apiKey = `dac344694bff4911a980eb0b3d3c6c11`;

  let apiUrl = `https://timezone.abstractapi.com/v1/current_time?api_key=${apiKey}&location=${city}`;
  axios.get(`${apiUrl}`).then(showLiveTime);

  getForecast(response.data.coord);
}

function showLiveTime(response) {
  let currentTime = response.data.datetime.slice(10, 16);
  let todayDate = response.data.datetime.slice(8, 10);
  let month = response.data.datetime.slice(5, 7);
  let year = response.data.datetime.slice(0, 4);

  let time = document.querySelector(`#time`);
  let date = document.querySelector(`#date`);

  date.innerHTML = `${todayDate}-${month}-${year}`;
  time.innerHTML = `${currentTime}`;
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
