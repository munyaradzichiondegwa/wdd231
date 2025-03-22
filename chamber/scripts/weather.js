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

// Function to get the appropriate local weather icon
function getWeatherIcon(condition) {
    const icons = {
        clear: "clear.png",
        sunny: "sunny.png",
        clouds: "cloudy.png",
        overcast: "cloudy.png",
        rain: "rainy.png",
        drizzle: "rainy.png", // Treat drizzle as rain
        thunderstorm: "thunderstorm.png",
        snow: "snowy.png",
        brokenclouds: "broken-clouds.png",
        mist: "mist.png",
        haze: "mist.png",
        default: "default.png" // Fallback icon
    };

    return icons[condition.toLowerCase()] || icons.default;
}

// Load cached weather data if available
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

// Load cached forecast data if available
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

// Fetch current weather data
async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        displayWeather(data);
        localStorage.setItem(weatherCacheKey, JSON.stringify(data));
        localStorage.setItem(weatherCacheKey + "Time", Date.now());
    } catch (error) {
        console.error("Error fetching weather:", error);
        displayErrorMessage("Failed to load current weather. Please try again later.");
    }
}

// Fetch 3-day forecast data
async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        displayForecast(data);
        localStorage.setItem(forecastCacheKey, JSON.stringify(data));
        localStorage.setItem(forecastCacheKey + "Time", Date.now());
    } catch (error) {
        console.error("Error fetching forecast:", error);
        displayErrorMessage("Failed to load weather forecast. Please try again later.");
    }
}

// Display current weather
function displayWeather(data) {
    const weatherContainer = document.getElementById("current-weather");
    weatherContainer.innerHTML = ""; // Clear existing content

    const condition = data.weather[0].main.toLowerCase();
    const iconFile = getWeatherIcon(condition);

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
    img.src = `images/${iconFile}`;
    img.alt = data.weather[0].description;
    weatherContainer.appendChild(img);
}

// Display 3-day forecast
function displayForecast(data) {
    const forecastContainer = document.getElementById("weather-forecast");
    forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";

    let dailyForecasts = {};

    data.list.forEach((entry) => {
        const date = entry.dt_txt.split(" ")[0]; // Extract date
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = entry; // Save the first occurrence for the day
        }
    });

    Object.values(dailyForecasts).slice(0, 3).forEach((forecast, index) => {
        const forecastDiv = document.createElement("div");
        forecastDiv.id = `day${index + 1}`;

        const condition = forecast.weather[0].main.toLowerCase();
        const iconFile = getWeatherIcon(condition);

        const h4 = document.createElement("h4");
        h4.textContent = forecast.dt_txt.split(" ")[0];
        forecastDiv.appendChild(h4);

        const tempP = document.createElement("p");
        tempP.id = `forecast-temp${index + 1}`;
        tempP.textContent = `Temp: ${forecast.main.temp}°C`;
        forecastDiv.appendChild(tempP);

        const weatherDescriptionP = document.createElement("p");
        weatherDescriptionP.id = `forecast-desc${index + 1}`;
        weatherDescriptionP.textContent = `Weather: ${forecast.weather[0].description}`;
        forecastDiv.appendChild(weatherDescriptionP);

        const img = document.createElement("img");
        img.src = `images/${iconFile}`;
        img.alt = forecast.weather[0].description;
        forecastDiv.appendChild(img);

        forecastContainer.appendChild(forecastDiv);
    });
}

// Display error message
function displayErrorMessage(message) {
    const errorDiv = document.getElementById("weather-error");
    if (errorDiv) {
        errorDiv.textContent = message;
    } else {
        alert(message);
    }
}
