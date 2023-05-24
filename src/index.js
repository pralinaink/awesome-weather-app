let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let formattedDate = `${currentDay}, ${currentHour}:${currentMinutes}`;

  return formattedDate;
}

let dayTime = document.querySelector("span#current-time");

let poprawny = formatDate(currentTime);

dayTime.innerHTML = poprawny;

function showTemp(response) {
  console.log(response.data);
  let roundTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector("#wartosc");
  temp.innerHTML = `${roundTemp}`;

  document.querySelector(
    "#zmienialneMiasto"
  ).innerHTML = `${response.data.name}`;

  document.querySelector(
    "#what-sky"
  ).innerHTML = `${response.data.weather[0].main}`;

  document.querySelector(
    "#wind-speed"
  ).innerHTML = `${response.data.wind.speed}`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}`;
}

function serchCity(citySearch) {
  let unit = "metric";
  let apiKey = "04a18c41bd60b7687f504a11ab9c3895";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemp);
}

function search(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let citySearch = document.querySelector("#city-input").value;
    serchCity(citySearch);
  }
}

let input = document.querySelector("#city-input");
input.addEventListener("keypress", search);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "04a18c41bd60b7687f504a11ab9c3895";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

function geoButton() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let loc = document.querySelector("#location");
loc.addEventListener("click", geoButton);

serchCity("Zagreb");
