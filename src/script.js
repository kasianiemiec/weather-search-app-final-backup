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
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  currentTemp.innerHTML = temperature;
  currentDescription.innerHTML = description;
  currentWindSpeed.innerHTML = wind;
  currentIcon.innerHTML = icon;
  currentHumidity.innerHTML = humidity;
  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "98bc9f158331o422ta5db05dbd90ba36";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` <div class="weather-forecast-day">
          ${formatDay(day.time)} <br /><img
            src="${day.condition.icon_url}"
            alt=""
            width="60px"
          />
          <br /><span class="temp-max">${Math.round(
            day.temperature.maximum
          )}°</span
          ><span class="temp-min"> ${Math.round(
            day.temperature.minimum
          )}°</span>
        </div>`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

searchCity("Paris");
