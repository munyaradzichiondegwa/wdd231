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
    fetch("./data/events.json") // ✅ Corrected relative path
        .then(response => response.json())
        .then(events => {
            const eventsContainer = document.getElementById("events-container");
            eventsContainer.innerHTML = ""; // Clear placeholder

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
                        <p><strong>Date:</strong> ${event.date}</p>
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

    // Fetch Weather
const apiKey = "f4619f75c2d45cc1bfe1a55992e82aaa";
const city = "Uyo"; 
const country = "NG"; 
const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${apiKey}`;
const oneCallURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`;

fetch(oneCallURL)
    .then(response => response.json())
    .then(data => {
        const currentTemp = Math.round(data.main.temp);
        const highTemp = Math.round(data.main.temp_max);
        const lowTemp = Math.round(data.main.temp_min);
        const humidity = data.main.humidity;
        const description = capitalizeEachWord(data.weather[0].description);
        const weatherIcon = getWeatherEmoji(data.weather[0].main);
        
        const sunrise = formatTime(data.sys.sunrise);
        const sunset = formatTime(data.sys.sunset);

        document.querySelector("#current-temp").innerHTML = `${weatherIcon} ${currentTemp}°C`;
        document.querySelector("#weather-desc").textContent = description;
        document.querySelector("#high-temp").textContent = `${highTemp}°C`;
        document.querySelector("#low-temp").textContent = `${lowTemp}°C`;
        document.querySelector("#humidity").textContent = `${humidity}%`;
        document.querySelector("#sunrise").textContent = sunrise;
        document.querySelector("#sunset").textContent = sunset;
    })
    .catch(error => console.error("Error fetching weather data:", error));

// Fetch 3-Day Forecast
fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
        for (let i = 1; i <= 3; i++) {
            const forecast = data.list[i * 8];
            const temp = Math.round(forecast.main.temp);
            const forecastIcon = getWeatherEmoji(forecast.weather[0].main);
            document.querySelector(`#day${i}-temp`).innerHTML = `${forecastIcon} ${temp}°C`;
        }
    })
    .catch(error => console.error("Error fetching forecast data:", error));

// Capitalize each word
function capitalizeEachWord(str) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
}

// Convert Unix timestamp to readable time
function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

// Weather Emoji function
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
 // Fetch Spotlight Members
document.addEventListener("DOMContentLoaded", () => {
    const spotlightContainer = document.getElementById("spotlight-container");

    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            // Filter only Gold and Silver members
            const eligibleMembers = data.filter(member => 
                member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
            );

            // Shuffle and select 2-3 random members
            const selectedMembers = getRandomMembers(eligibleMembers, 2, 3);

            // Display selected members
            spotlightContainer.innerHTML = selectedMembers.map(member => createMemberCard(member)).join("\n");
        })
        .catch(error => console.error("Error fetching member data:", error));
});

function getRandomMembers(array, min, max) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    return shuffled.slice(0, count);
}

function createMemberCard(member) {
    return `
        <div class="member-card">
            <img src="${member.image}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <span class="membership-level">${member.membershipLevel} Member</span>
        </div>
    `;
}