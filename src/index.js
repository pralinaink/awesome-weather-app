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

function displayForecast(response) {
  console.log(response.data.daily);
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
                21°C
              </div>`;
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8bbb9otb892b40003fdadb08ecfd649a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  celciusTemp = response.data.temperature.current;
  let roundTemp = Math.round(celciusTemp);
  let temp = document.querySelector("#wartosc");
  temp.innerHTML = `${roundTemp}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);

  document.querySelector(
    "#zmienialneMiasto"
  ).innerHTML = `${response.data.city}`;

  document.querySelector(
    "#what-sky"
  ).innerHTML = `${response.data.condition.description}`;

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.temperature.humidity}`;

  getForecast(response.data.coordinates);
}

function serchCity(citySearch) {
  let apiKey = "8bbb9otb892b40003fdadb08ecfd649a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${citySearch}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function search(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let citySearch = document.querySelector("#city-input").value;
    serchCity(citySearch);
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8bbb9otb892b40003fdadb08ecfd649a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function geoButton() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

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

let input = document.querySelector("#city-input");
input.addEventListener("keypress", search);

let loc = document.querySelector("#location");
loc.addEventListener("click", geoButton);

let fahrenheitLink = document.querySelector("#fahr-link");
fahrenheitLink.addEventListener("click", displayfahrenheitTemp);

let celciusLink = document.querySelector("#cel-link");
celciusLink.addEventListener("click", displaycelciusTemp);

serchCity("Zagreb");
