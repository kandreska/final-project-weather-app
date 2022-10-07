function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayIndex = date.getDay();
  let day = days[dayIndex];
  let time = `${day} ${hours}:${minutes}`;
  return time;
}

let currentTime = document.querySelector("#current-time");
let currentDate = new Date();
currentTime.innerHTML = formatDate(currentDate);

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "ed238469f9b5e9d801834270e65449bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function retrievePosition(position) {
  let apiKey = "ed238469f9b5e9d801834270e65449bc";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentPositionButton = document.querySelector("#current-position");
currentPositionButton.addEventListener("click", currentLocation);

searchCity("Dallas");

//function convertToFarenheit(event) {
//event.preventDefault();
//let farenheitUnit = document.querySelector("#temperature");
//farenheitUnit.innerHTML = `🌖 48°`;
//}

//let farenheit = document.querySelector("#farenheit-link");
//farenheit.addEventListener("click", convertToFarenheit);

//function convertToCelsius(event) {
//event.preventDefault();
//let farenheitUnit = document.querySelector("#temperature");
//farenheitUnit.innerHTML = `🌖 9°`;
//}

//let celsius = document.querySelector("#celsius-link");
//celsius.addEventListener("click", convertToCelsius);
