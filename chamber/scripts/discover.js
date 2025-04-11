document.addEventListener("DOMContentLoaded", () => {
  displayVisitMessage();
  fetchDiscoverCards(); // Use fetch instead of static sample data
});

// --- Visitor Message Logic ---
function displayVisitMessage() {
  const visitMsg = document.getElementById("visit-message");
  const now = Date.now();
  const lastVisit = localStorage.getItem("lastVisit");
  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const daysPassed = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
    if (daysPassed < 1) {
      message = "Back so soon! Awesome!";
    } else if (daysPassed === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${daysPassed} days ago.`;
    }
  }

  visitMsg.textContent = message;
  localStorage.setItem("lastVisit", now);
}

// --- Discover Cards Logic ---
function fetchDiscoverCards() {
  const cardsContainer = document.getElementById("discover-cards");

  fetch("data/discover.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((item, index) => {
        const card = document.createElement("article");
        card.classList.add("discover-card");
        card.style.gridArea = `card${index + 1}`; // Optional if using CSS grid-area

        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <h3>${item.name}</h3>
          <p><strong>Address:</strong> ${item.address}</p>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;

        cardsContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error loading discover data:", error);
      cardsContainer.innerHTML = `<p>Failed to load attractions. Please try again later.</p>`;
    });
}
