let apiKey = "a2d5c141caa760021e618a903bcc320b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York &appid=${apiKey}&units=metric`;

function displayTemperature(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  cityElement.innerHTML = response.data.name;

  descriptionElement.innerHTML = response.data.weather[0].description;
}

axios.get(apiUrl).then(displayTemperature);
