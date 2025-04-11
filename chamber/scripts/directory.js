document.addEventListener("DOMContentLoaded", () => {
    fetch("data/members.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => displayCards(data.members)) // <-- Access the "members" array inside the JSON
        .catch(error => console.error("Error loading JSON data:", error));

    function displayCards(members) {
        const container = document.getElementById("directory");
        container.innerHTML = "";

        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("card");

            const websiteLink = member.website
                ? `<a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a>`
                : `<span>No website available</span>`;

            card.innerHTML = `
                <figure>
                    <img src="${member.logoPath}" alt="${member.name} logo" loading="lazy" width="200">
                </figure>
                <div class="card-content">
                    <h2>${member.name}</h2>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Website:</strong> ${websiteLink}</p>
                    <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
                </div>
            `;

            container.appendChild(card);
        });
    }

    // View toggle logic (optional)
    const gridViewBtn = document.getElementById("gridView");
    const listViewBtn = document.getElementById("listView");
    const directory = document.getElementById("directory");

    if (gridViewBtn && listViewBtn && directory) {
        gridViewBtn.addEventListener("click", () => {
            directory.classList.add("grid-view");
            directory.classList.remove("list-view");
        });

        listViewBtn.addEventListener("click", () => {
            directory.classList.add("list-view");
            directory.classList.remove("grid-view");
        });
    }
});
