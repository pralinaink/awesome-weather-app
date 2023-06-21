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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon.", "Tues.", "Wed.", "Thurs.", "Fri."];
  let forecastHtml = `<div class="row future">`;
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` <div class="col">
                <i class="fa-solid fa-cloud-bolt ikona"></i>
                <br />
                <p class="day">${day}</p>
                21℃
              </div>`;
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function showTemp(response) {
  celciusTemp = response.data.main.temp;
  let roundTemp = Math.round(celciusTemp);
  let temp = document.querySelector("#wartosc");
  temp.innerHTML = `${roundTemp}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

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

function displayfahrenheitTemp(event) {
  event.preventDefault();

  let tempElement = document.querySelector("#wartosc");
  let farenheitTemp = (celciusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farenheitTemp);
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displaycelciusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#wartosc");
  tempElement.innerHTML = Math.round(celciusTemp);
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let celciusTemp = null;

let fahrenheitLink = document.querySelector("#fahr-link");
fahrenheitLink.addEventListener("click", displayfahrenheitTemp);

let celciusLink = document.querySelector("#cel-link");
celciusLink.addEventListener("click", displaycelciusTemp);

displayForecast();
serchCity("Zagreb");
