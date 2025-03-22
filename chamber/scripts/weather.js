const weatherApiKey = "29d21f6d21332090b676864d7a297325"; // Replace with your OpenWeatherMap API Key
const city = "Harare";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${weatherApiKey}`;

document.addEventListener("DOMContentLoaded", () => {
    fetchWeather();
    fetchForecast();
});

async function fetchWeather() {
    try {
        console.log("Fetching current weather data...");
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Weather Data:", data);
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

async function fetchForecast() {
    try {
        console.log("Fetching 3-day forecast...");
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Forecast Data:", data);
        displayForecast(data);
    } catch (error) {
        console.error("Error fetching forecast:", error);
    }
}

function displayWeather(data) {
    const weatherContainer = document.getElementById("current-weather");
    weatherContainer.innerHTML = `
        <h3>Today's Weather in Harare</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Feels Like: ${data.main.feels_like}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById("weather-forecast");
    forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";

    let dailyForecasts = {};

    data.list.forEach((entry) => {
        const date = entry.dt_txt.split(" ")[0]; // Extract date
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = entry;
        }
    });

    Object.values(dailyForecasts).slice(0, 3).forEach((forecast) => {
        forecastContainer.innerHTML += `
            <div>
                <h4>${forecast.dt_txt.split(" ")[0]}</h4>
                <p>Temp: ${forecast.main.temp}°C</p>
                <p>Weather: ${forecast.weather[0].description}</p>
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
            </div>
        `;
    });
}
