async function fetchWeather() {
    const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
    const CITY = 'Harare';
    
    try {
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=imperial`
        );
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=imperial`
        );

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        updateWeatherUI(weatherData, forecastData);
    } catch (error) {
        console.error('Weather fetch error:', error);
        // Fallback to default values
        document.getElementById('current-temp').textContent = '75°F';
    }
}

function updateWeatherUI(currentWeather, forecastData) {
    document.getElementById('current-temp').textContent = 
        `${Math.round(currentWeather.main.temp)}°F`;
    document.getElementById('weather-description').textContent = 
        currentWeather.weather[0].description;
    document.getElementById('high-temp').textContent = 
        `${Math.round(currentWeather.main.temp_max)}°`;
    document.getElementById('low-temp').textContent = 
        `${Math.round(currentWeather.main.temp_min)}°`;
    document.getElementById('humidity').textContent = 
        `${currentWeather.main.humidity}%`;
    
    // Forecast
    const forecastList = forecastData.list;
    document.getElementById('today-forecast').textContent = 
        `${Math.round(forecastList[0].main.temp)}°F`;
    document.getElementById('wednesday-forecast').textContent = 
        `${Math.round(forecastList[8].main.temp)}°F`;
    document.getElementById('thursday-forecast').textContent = 
        `${Math.round(forecastList[16].main.temp)}°F`;
}

document.addEventListener('DOMContentLoaded', fetchWeather);