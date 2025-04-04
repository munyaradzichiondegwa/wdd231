document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const gallery = document.getElementById('discover-gallery');

    // Last Visit Logic
    function calculateVisitMessage() {
        const currentVisit = Date.now();
        const lastVisit = localStorage.getItem('lastVisit');

        if (!lastVisit) {
            sidebar.innerHTML = "Welcome! Let us know if you have any questions.";
        } else {
            const daysDifference = Math.floor((currentVisit - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
            
            if (daysDifference < 1) {
                sidebar.innerHTML = "Back so soon! Awesome!";
            } else {
                sidebar.innerHTML = `You last visited ${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago.`;
            }
        }

        localStorage.setItem('lastVisit', currentVisit.toString());
    }

    // Load Discover Items
    async function loadDiscoverItems() {
        const response = await fetch('data/discover-items.json');
        const data = await response.json();

        data.items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('discover-card');
            card.innerHTML = `
                <h2>${item.title}</h2>
                <figure>
                    <img src="images/${item.image}" alt="${item.title}">
                </figure>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <button>Learn More</button>
            `;
            gallery.appendChild(card);
        });
    }

    calculateVisitMessage();
    loadDiscoverItems();
});