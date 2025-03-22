const weatherApiKey = "29d21f6d21332090b676864d7a297325"; // Replace with your OpenWeatherMap API Key
const city = "Harare";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${weatherApiKey}`;

const weatherCacheKey = "weatherData";
const forecastCacheKey = "forecastData";
const cacheExpiry = 3600000; // 1 hour in milliseconds

document.addEventListener("DOMContentLoaded", () => {
    loadCachedWeather();
    loadCachedForecast();
});

async function loadCachedWeather() {
    const cachedData = localStorage.getItem(weatherCacheKey);
    const cachedTime = localStorage.getItem(weatherCacheKey + "Time");

    if (cachedData && cachedTime && (Date.now() - cachedTime < cacheExpiry)) {
        const data = JSON.parse(cachedData);
        displayWeather(data);
    } else {
        fetchWeather();
    }
}

async function loadCachedForecast() {
    const cachedData = localStorage.getItem(forecastCacheKey);
    const cachedTime = localStorage.getItem(forecastCacheKey + "Time");

    if (cachedData && cachedTime && (Date.now() - cachedTime < cacheExpiry)) {
        const data = JSON.parse(cachedData);
        displayForecast(data);
    } else {
        fetchForecast();
    }
}

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
        localStorage.setItem(weatherCacheKey, JSON.stringify(data));
        localStorage.setItem(weatherCacheKey + "Time", Date.now());
    } catch (error) {
        console.error("Error fetching weather:", error);
        displayErrorMessage("Failed to load current weather. Please try again later.");
    }
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayForecast(data);
        localStorage.setItem(forecastCacheKey, JSON.stringify(data));
        localStorage.setItem(forecastCacheKey + "Time", Date.now());
    } catch (error) {
        console.error("Error fetching forecast:", error);
        displayErrorMessage("Failed to load weather forecast. Please try again later.");
    }
}

function displayWeather(data) {
    const weatherContainer = document.getElementById("current-weather");
    weatherContainer.innerHTML = ""; // Clear existing content

    const h3 = document.createElement("h3");
    h3.textContent = "Today's Weather in Harare";
    weatherContainer.appendChild(h3);

    const tempP = document.createElement("p");
    tempP.textContent = `Temperature: ${data.main.temp}°C`;
    weatherContainer.appendChild(tempP);

    const feelsLikeP = document.createElement("p");
    feelsLikeP.textContent = `Feels Like: ${data.main.feels_like}°C`;
    weatherContainer.appendChild(feelsLikeP);

    const weatherDescriptionP = document.createElement("p");
    weatherDescriptionP.textContent = `Weather: ${data.weather[0].description}`;
    weatherContainer.appendChild(weatherDescriptionP);

    const img = document.createElement("img");
    img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    img.alt = data.weather[0].description;
    weatherContainer.appendChild(img);
}

function displayForecast(data) {
    const forecastContainer = document.getElementById("weather-forecast");
    forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";

    let dailyForecasts = {};

    data.list.forEach((entry) => {
        const date = entry.dt_txt.split(" ")[0]; // Extract date
        const time = entry.dt_txt.split(" ")[1]; // Extract time

        if (!dailyForecasts[date] || Math.abs(new Date(entry.dt_txt).getHours() - 12) < Math.abs(new Date(dailyForecasts[date].dt_txt).getHours() - 12)) {
            dailyForecasts[date] = entry;
        }
    });

    Object.values(dailyForecasts).slice(0, 3).forEach((forecast) => {
        const forecastDiv = document.createElement("div");

        const h4 = document.createElement("h4");
        h4.textContent = forecast.dt_txt.split(" ")[0];
        forecastDiv.appendChild(h4);

        const tempP = document.createElement("p");
        tempP.textContent = `Temp: ${forecast.main.temp}°C`;
        forecastDiv.appendChild(tempP);

        const weatherDescriptionP = document.createElement("p");
        weatherDescriptionP.textContent = `Weather: ${forecast.weather[0].description}`;
        forecastDiv.appendChild(weatherDescriptionP);

        const img = document.createElement("img");
        img.src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        img.alt = forecast.weather[0].description;
        forecastDiv.appendChild(img);

        forecastContainer.appendChild(forecastDiv);
    });
}

function displayErrorMessage(message) {
    const errorDiv = document.getElementById("weather-error"); // Make sure you have an element with this ID
    if (errorDiv) {
        errorDiv.textContent = message;
    } else {
        alert(message);
    }
}