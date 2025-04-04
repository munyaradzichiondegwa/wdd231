document.addEventListener("DOMContentLoaded", () => {
    fetch("data/discover.json")
        .then(response => response.json())
        .then(data => displayCards(data))
        .catch(error => console.error("Error loading JSON data:", error));

    function displayCards(items) {
        const container = document.getElementById("discover");
        container.innerHTML = "";
        
        items.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");
            
            card.innerHTML = `
                <figure>
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </figure>
                <div class="card-content">
                    <h2>${item.name}</h2>
                    <address>${item.address}</address>
                    <p>${item.description}</p>
                    <button onclick="window.location.href='${item.link}'">Learn More</button>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    // Visitor message using localStorage
    const visitorMessage = document.getElementById("visitor-message");
    if (visitorMessage) {
        const lastVisit = localStorage.getItem("lastVisit");
        const now = Date.now();

        if (!lastVisit) {
            visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const lastVisitDate = parseInt(lastVisit, 10);
            const timeDifference = now - lastVisitDate;
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            if (daysDifference < 1) {
                visitorMessage.textContent = "Back so soon! Awesome!";
            } else {
                visitorMessage.textContent = `You last visited ${daysDifference} day${daysDifference > 1 ? 's' : ''} ago.`;
            }
        }

        localStorage.setItem("lastVisit", now);
    }
});
