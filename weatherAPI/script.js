document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("cityInput");
  const searchBtn = document.getElementById("search-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMsg = document.getElementById("error-msg");

  const API_KEY = "836d6eab709df8137488b17a77235b81"; //env variable

  searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    //it may throw an error
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });
  searchBtn.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      console.log("Enter pressed");

      const city = cityInput.value.trim();
      if (!city) return;

      //it may throw an error
      try {
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
      } catch (error) {
        showError();
      }
    }
  });

  async function fetchWeatherData(city) {
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }
  function displayWeatherData(data) {
    //display
    console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    console.log(name);

    //unlock the display
    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
    temperatureDisplay.textContent = `Temperature: ${main.temp} °C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
  }
  function showError() {
    weatherInfo.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }
});
