document.addEventListener('DOMContentLoaded', function () {
    fetchEvents();
});

async function fetchEvents() {
    try {
        const response = await fetch('data/events.json');  // Path to the JSON file
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        loadEvents(data.events);
    } catch (error) {
        console.error('Error loading events:', error);
        displayErrorMessage('Failed to load events. Please try again later.');
    }
}

function loadEvents(events) {
    const eventsContainer = document.querySelector('.current-events');
    eventsContainer.innerHTML = ''; // Clear existing content

    const fragment = document.createDocumentFragment(); // Use fragment to minimize reflows

    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');

        const h3 = document.createElement('h3');
        h3.textContent = event.title;
        eventElement.appendChild(h3);

        const descriptionP = document.createElement('p');
        descriptionP.textContent = event.description;
        eventElement.appendChild(descriptionP);

        const dateP = document.createElement('p');
        dateP.innerHTML = `<strong>Date:</strong> ${event.date}`;
        eventElement.appendChild(dateP);

        const timeP = document.createElement('p');
        timeP.innerHTML = `<strong>Time:</strong> ${event.time}`;
        eventElement.appendChild(timeP);

        const locationP = document.createElement('p');
        locationP.innerHTML = `<strong>Location:</strong> ${event.location}`;
        eventElement.appendChild(locationP);

        const img = document.createElement('img');
        img.src = event.image;  // Corrected image path
        img.alt = event.title;
        img.width = "100%";
        img.height = "auto";
        eventElement.appendChild(img);

        fragment.appendChild(eventElement);
    });

    eventsContainer.appendChild(fragment);
}

function displayErrorMessage(message) {
    const errorDiv = document.getElementById('events-error');
    if (errorDiv) {
        errorDiv.textContent = message;
    } else {
        alert(message);
    }
}