function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
}

function displayIcon(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

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

let apiKey = "597c40c39084687093b091cd48b366f8";
let apiUrl = "https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png";
axios.get(apiUrl).then(displayTemperature);

function searchCity(city) {
  let apiKey = "597c40c39084687093b091cd48b366f8";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric";
  axios.get(apiUrl).then(displayWeather);
}

function searchIcon(icon) {
  let apiKey = "597c40c39084687093b091cd48b366f8";
  let apiUrl =
     "https://api.openweathermap.org/data/2.5/weather?q=Dallas&appid=597c40c39084687093b091cd48b366f8&units=metric";
  axios.get(apiUrl).then(displayIcon);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function retrievePosition(position) {
  let apiKey = "597c40c39084687093b091cd48b366f8";
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
//farenheitUnit.innerHTML = `°`;
//}

//let farenheit = document.querySelector("#farenheit-link");
//farenheit.addEventListener("click", convertToFarenheit);

//function convertToCelsius(event) {
//event.preventDefault();
//let farenheitUnit = document.querySelector("#temperature");
//farenheitUnit.innerHTML = `°`;
//}

//let celsius = document.querySelector("#celsius-link");
//celsius.addEventListener("click", convertToCelsius);
