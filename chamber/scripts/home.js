document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach((section) => {
        observer.observe(section);
    });

    // Fetch Events
    fetch("./data/events.json")
        .then(response => response.json())
        .then(data => {
            const eventsContainer = document.getElementById("events-container");
            eventsContainer.innerHTML = ""; // Clear placeholder

            const events = data.events;

            if (events.length === 0) {
                eventsContainer.innerHTML = "<p>No upcoming events.</p>";
                return;
            }

            events.forEach(event => {
                const eventCard = document.createElement("div");
                eventCard.classList.add("event-card");

                eventCard.innerHTML = `
                    <img src="${event.image}" alt="${event.title}">
                    <div class="event-card-content">
                        <h3>${event.title}</h3>
                        <p><strong>Date:</strong> ${event.date} at ${event.time}</p>
                        <p><strong>Location:</strong> ${event.location}</p>
                        <p>${event.description}</p>
                    </div>
                `;

                eventsContainer.appendChild(eventCard);
            });
        })
        .catch(error => {
            console.error("Error loading events:", error);
            document.getElementById("events-container").innerHTML = "<p>Failed to load events.</p>";
        });

    // Fetch Weather Data
    const apiKey = "29d21f6d21332090b676864d7a297325"; // Replace with your real API key
    const city = "Harare";  // City name
    const country = "ZW";    // Country code for Zimbabwe
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${apiKey}`;

    // Fetch Current Weather
    fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
            const currentTemp = Math.round(data.main.temp);
            const weatherDescription = capitalizeEachWord(data.weather.map(event => event.description).join(", "));
            const weatherIcon = getWeatherEmoji(data.weather[0].main);

            document.querySelector("#current-temp").innerHTML = `${weatherIcon} ${currentTemp}°C`;
            document.querySelector("#weather-desc").textContent = weatherDescription;
            document.querySelector("#high-temp").textContent = `High: ${Math.round(data.main.temp_max)}°C`;
            document.querySelector("#low-temp").textContent = `Low: ${Math.round(data.main.temp_min)}°C`;
            document.querySelector("#humidity").textContent = `Humidity: ${data.main.humidity}%`;
            document.querySelector("#sunrise").textContent = `Sunrise: ${formatTime(data.sys.sunrise)}`;
            document.querySelector("#sunset").textContent = `Sunset: ${formatTime(data.sys.sunset)}`;
        })
        .catch(error => console.error("Error fetching weather data:", error));

    // Fetch 3-Day Forecast
    fetch(forecastURL)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.getElementById("forecast-container");
            forecastContainer.innerHTML = ""; // Clear previous forecast

            // Calculate the forecast for the next 3 days
            let dateCount = new Set();  // to keep track of unique dates
            let daysForecast = [];       // array to hold the forecast of 3 days

            // Loop through the forecast data
            data.list.forEach(forecast => {
                const forecastDate = new Date(forecast.dt * 1000).toDateString();
                // If we haven't already stored 3 unique forecasts for the coming days
                if (!dateCount.has(forecastDate) && daysForecast.length < 3) {
                    dateCount.add(forecastDate); // Mark this date as seen
                    daysForecast.push(forecast); // Add this forecast to the array
                }
            });

            // Now display the forecasts for each of the next 3 days
            daysForecast.forEach((forecast) => {
                const temp = Math.round(forecast.main.temp);
                const high = Math.round(forecast.main.temp_max);
                const low = Math.round(forecast.main.temp_min);
                const forecastDescription = capitalizeEachWord(forecast.weather.map(event => event.description).join(", "));
                const forecastIcon = getWeatherEmoji(forecast.weather[0].main);

                forecastContainer.innerHTML += `
                    <div class="forecast-card">
                        <h4>${new Date(forecast.dt * 1000).toLocaleDateString()}</h4>
                        <p>${forecastIcon} ${temp}°C</p>
                        <p>High: ${high}°C</p>
                        <p>Low: ${low}°C</p>
                        <p>${forecastDescription}</p>
                    </div>
                `;
            });
        })
        .catch(error => console.error("Error fetching forecast data:", error));

    // Fetch Spotlight Members
    const spotlightContainer = document.getElementById("spotlight-container");

    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            // Filter only Gold and Silver members
            const eligibleMembers = data.members.filter(member => 
                member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
            );

            // Shuffle and select 2-3 random members
            const selectedMembers = getRandomMembers(eligibleMembers, 2, 3);

            // Display selected members
            spotlightContainer.innerHTML = selectedMembers.map(member => createMemberCard(member)).join("\n");
        })
        .catch(error => {
            console.error("Error fetching member data:", error);
            spotlightContainer.innerHTML = "<p>Failed to load members.</p>";
        });

    function getRandomMembers(array, min, max) {
        const shuffled = array.sort(() => 0.5 - Math.random());
        const count = Math.floor(Math.random() * (max - min + 2)) + min;
        return shuffled.slice(0, count);
    }

    function createMemberCard(member) {
        return `
            <div class="member-card">
                <img src="${member.logoPath}" alt="${member.name} Logo">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <span class="membership-level">${member.membershipLevel} Member</span>
            </div>
        `;
    }

    function capitalizeEachWord(str) {
        return str.replace(/\b\w/g, c => c.toUpperCase());
    }

    function formatTime(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    function getWeatherEmoji(condition) {
        const emojis = {
            "Clear": "☀️",
            "Clouds": "☁️",
            "Rain": "🌧️",
            "Drizzle": "🌦️",
            "Thunderstorm": "⛈️",
            "Snow": "❄️",
            "Mist": "🌫️",
            "Fog": "🌁"
        };
        return emojis[condition] || "🌍";
    }
});