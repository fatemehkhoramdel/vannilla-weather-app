let apiKey = "a2d5c141caa760021e618a903bcc320b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York &appid=${apiKey}&units=metric`;
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

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#Humidity");
  let windElement = document.querySelector("#Wind");
  let dateElement = document.querySelector("#dayandtime");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

axios.get(apiUrl).then(displayTemperature);
