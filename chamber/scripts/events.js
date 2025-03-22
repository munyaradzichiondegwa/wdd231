// events.js

document.addEventListener('DOMContentLoaded', function () {
    fetch('data/events.json')  // Corrected the path to the JSON file
        .then(response => response.json())
        .then(data => loadEvents(data.events))
        .catch(error => console.error('Error loading events:', error));
});

function loadEvents(events) {
    const eventsContainer = document.querySelector('.current-events');
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');

        eventElement.innerHTML = `
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <img src="${event.image}" alt="${event.title}" width="100%" height="auto">
        `;

        eventsContainer.appendChild(eventElement);
    });
}
