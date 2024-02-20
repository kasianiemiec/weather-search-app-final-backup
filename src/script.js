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
  let currentTemp = document.querySelector("#temp");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  let currentDescription = document.querySelector("#description");
  let description = response.data.condition.description;
  let wind = response.data.wind.speed;
  let currentWindSpeed = document.querySelector("#current-wind");
  let icon = `<img
                src="${response.data.condition.icon_url}"
                alt="weather-image"
                class="image"
            />`;
  let currentIcon = document.querySelector("#icon");
  let humidity = response.data.temperature.humidity;
  let currentHumidity = document.querySelector("#humidity");

  cityElement.innerHTML = response.data.city;
  currentTemp.innerHTML = temperature;
  currentDescription.innerHTML = description;
  currentWindSpeed.innerHTML = wind;
  currentIcon.innerHTML = icon;
  currentHumidity.innerHTML = humidity;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "98bc9f158331o422ta5db05dbd90ba36";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function getForecast(city) {
  let apiKey = "98bc9f158331o422ta5db05dbd90ba36";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` <div class="weather-forecast-day">
          ${day} <br /><img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-night.png"
            alt=""
            width="40px"
          />
          <br /><span class="temp-max">29°</span
          ><span class="temp-min"> 21°</span>
        </div>`;
  });
  forecastElement.innerHTML = forecastHtml;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

searchCity("Paris");
