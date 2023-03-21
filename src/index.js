function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}}`;
  }
  let day = date.getDay();
  let days = [
    "Saturday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sunday",
  ];
  return `${days[day]}  ${hours}:${minutes}`;
}
function getDate(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForcast(coordinates) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#Humidity");
  let windElement = document.querySelector("#Wind");
  let dateElement = document.querySelector("#dayandtime");
  let iconElement = document.querySelector("#icon");

  celsiusTempture = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = celsiusTempture;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForcast(response.data.coord);
}

function search(city) {
  let apiKey = "a2d5c141caa760021e618a903bcc320b";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handelElement(event) {
  event.preventDefault();
  let cityinputElement = document.querySelector("#query");
  search(cityinputElement.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  // remove active class from the celsius
  celsiusElement.classList.remove("active");
  // i wanna f be active class once i click on so add this class here
  fahrenheitElement.classList.add("active");
  let fahrenheitTemperature = document.querySelector("#temperature");
  fahrenheitTemperature.innerHTML = Math.round((celsiusTempture * 9) / 5 + 32);
}

function displaycelsiusTemprature(event) {
  event.preventDefault();
  // remove active class frome fehrenhiet
  fahrenheitElement.classList.remove("active");
  // add active class to celsius
  celsiusElement.classList.add("active");
  let celsiusElementTemp = document.querySelector("#temperature");
  celsiusElementTemp.innerHTML = celsiusTempture;
}

function displayForcast(response) {
  let days = response.data.daily;

  let forcastElement = document.querySelector("#forcast");
  let forcastHtml = `<div class="row">`;
  console.log(days);
  days.forEach(function (day) {
    forcastHtml =
      forcastHtml +
      `
    <div class="col-2">
      <div class="weather-forcast-day" id="forcast-day">
        ${getDate(day.dt)}
      </div>
      <div class="forcast-img">
        <img src="https://openweathermap.org/img/wn/${
          day.weather[0].icon
        }@2x.png" alt="clear sky" id="icon" width="50px">
      </div>
      <div class="weather-forcast-temperature">
        <span class="forcast-max" id="max-temp">
          ${Math.round(day.temp.max)}°
        </span>
        <span class="forcast-min" id="min-temp">
          ${Math.round(day.temp.min)}°
        </span>
      </div>
    </div>
    
  `;
  });
  forcastHtml = forcastHtml + `</div>`;
  forcastElement.innerHTML = forcastHtml;
}

let celsiusTempture;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handelElement);
let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", displayFahrenheit);
let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", displaycelsiusTemprature);

search("New york");
displayForcast();
