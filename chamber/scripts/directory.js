document.addEventListener("DOMContentLoaded", async function () {
    const membersContainer = document.getElementById("members-container");
    const gridViewBtn = document.getElementById("grid-view-btn");
    const listViewBtn = document.getElementById("list-view-btn");
    const searchInput = document.getElementById("search-input");
    const industryFilter = document.getElementById("industry-filter");

    // Fetch data from members.json
    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            const data = await response.json();
            return data.members;
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    // Render members dynamically
    function renderMembers(members, view = "grid") {
        membersContainer.innerHTML = "";
        membersContainer.className = view === "grid" ? "members-grid" : "members-list";

        members.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card");

            // Ensure the image path points to the correct location in the "images" folder
            const logoPath = `images/${member.logoPath}`; // Assuming "logoPath" is the correct key

            memberCard.innerHTML = `
                <img src="${logoPath}" alt="${member.name} Logo" class="member-logo">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p class="membership-level">${getMembershipLevel(member.level)}</p>
            `;

            membersContainer.appendChild(memberCard);
        });
    }

    // Helper function to convert membership level
    function getMembershipLevel(level) {
        switch (level) {
            case 1: return "Member";
            case 2: return "Silver Member";
            case 3: return "Gold Member";
            default: return "Member";
        }
    }

    // Toggle between grid and list views
    gridViewBtn.addEventListener("click", () => renderMembers(currentMembers, "grid"));
    listViewBtn.addEventListener("click", () => renderMembers(currentMembers, "list"));

    // Filter members by search input and industry dropdown
    function filterMembers() {
        let filteredMembers = currentMembers.filter(member =>
            member.name.toLowerCase().includes(searchInput.value.toLowerCase()) &&
            (industryFilter.value === "" || member.industry === industryFilter.value)
        );
        renderMembers(filteredMembers);
    }

    searchInput.addEventListener("input", filterMembers);
    industryFilter.addEventListener("change", filterMembers);

    // Load members on page load
    let currentMembers = await fetchMembers();
    renderMembers(currentMembers);

    // Update footer with current year and last modified date
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("last-modified").textContent = document.lastModified;

    // Additional logic from the second event listener
    fetch('members.json')
        .then(response => response.json())
        .then(data => {
            data.members.forEach(member => {
                const memberCard = document.createElement("div");
                memberCard.classList.add("member-card");

                // Same adjustment to use the correct image path for logo
                const logoPath = `images/logos/${member.logoPath}`;

                memberCard.innerHTML = `
                    <img src="${logoPath}" alt="${member.name} Logo" class="member-logo">
                    <h3>${member.name}</h3>
                    <p>${member.description}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                `;

                membersContainer.appendChild(memberCard);
            });
        })
        .catch(error => console.error("Error loading members:", error));
});
