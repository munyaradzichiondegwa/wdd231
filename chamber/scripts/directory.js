document.addEventListener("DOMContentLoaded", async function () {
  const directory = document.getElementById("directory");

  // Fetch JSON data
  async function getMembers() {
    const response = await fetch("data/members.json");
    const members = await response.json();
    return members;
  }

  // Function to display members in grid or list view
  async function displayMembers(viewType = "grid") {
    const members = await getMembers();
    directory.innerHTML = ""; // Clear previous content

    // Update directory class based on view type
    if (viewType === "list") {
      directory.classList.add("list-view");
      directory.classList.remove("grid-view");
    } else {
      directory.classList.add("grid-view");
      directory.classList.remove("list-view");
    }

    members.forEach((member) => {
      const card = document.createElement("div");
      card.classList.add("business-card");

      if (viewType === "list") {
        card.classList.add("list-card");
      }

      card.innerHTML = `
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p class="membership-level">Membership Level: ${getMembershipLevel(
                  member.membership
                )}</p>
            `;

      directory.appendChild(card);
    });
  }

  // Helper function to get membership level text
  function getMembershipLevel(level) {
    switch (level) {
      case 1:
        return "Member";
      case 2:
        return "Silver Member";
      case 3:
        return "Gold Member";
      default:
        return "Member";
    }
  }

  // Initial Display
  displayMembers("grid");

  // Toggle View Event Listeners
  document
    .getElementById("gridView")
    .addEventListener("click", () => displayMembers("grid"));
  document
    .getElementById("listView")
    .addEventListener("click", () => displayMembers("list"));
});
