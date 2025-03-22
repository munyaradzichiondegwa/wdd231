const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=29d21f6d21332090b676864d7a297325";

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Debugging output
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.textContent = data.main.temp.toFixed(1);
    const iconCode = data.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.setAttribute("src", iconSrc);
    weatherIcon.setAttribute("alt", data.weather[0].description);
    captionDesc.textContent = data.weather[0].description;
}

apiFetch();
