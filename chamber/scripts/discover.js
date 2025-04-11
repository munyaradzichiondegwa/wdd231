document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("discover-cards");
  const visitMsg = document.getElementById("visit-message");

  // Visitor message
  const now = Date.now();
  const lastVisit = localStorage.getItem("lastVisit");

  if (!lastVisit) {
    visitMsg.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (days < 1) {
      visitMsg.textContent = "Back so soon! Awesome!";
    } else {
      visitMsg.textContent = `You last visited ${days} day${days > 1 ? "s" : ""} ago.`;
    }
  }

  localStorage.setItem("lastVisit", now);

  // Load JSON data
  fetch("data/discover.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.gridArea = `card${index + 1}`;

        card.innerHTML = `
          <h2>${item.name}</h2>
          <figure><img src="${item.image}" alt="${item.name} image" loading="lazy" /></figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;
        cardsContainer.appendChild(card);
      });
    })
    .catch((err) => {
      cardsContainer.innerHTML = "<p>Failed to load attractions.</p>";
      console.error("Error loading JSON:", err);
    });
});
