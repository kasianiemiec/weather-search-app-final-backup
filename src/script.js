let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10 || hours < 10) {
  let date = document.querySelector("#current-date");
  date.innerHTML = `${day} ${hours}:0${minutes}`;
} else {
  let date = document.querySelector("#current-date");
  date.innerHTML = `${day} ${hours}:${minutes}`;
}
function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = temperature;

  let description = response.data.condition.description;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = description;

  let wind = response.data.wind.speed;
  let currentWindSpeed = document.querySelector("#current-wind");
  currentWindSpeed.innerHTML = wind;

  let icon = `<img
                src="${response.data.condition.icon_url}"
                alt="weather-image"
                class="image"
            />`;
  let currentIcon = document.querySelector("#icon");
  currentIcon.innerHTML = icon;

  let humidity = response.data.temperature.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = humidity;
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let city = searchInput.value;
  let apiKey = "98bc9f158331o422ta5db05dbd90ba36";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
