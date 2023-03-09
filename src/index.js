let apiKey = "a2d5c141caa760021e618a903bcc320b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York &appid=${apiKey}&unit=metric`;

function displayTemperature(response) {
  console.log(response.data.main.temp);
}

axios.get(apiUrl).then(displayTemperature);
