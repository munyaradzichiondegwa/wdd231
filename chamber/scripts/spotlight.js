let cachedMembers = null; // Cache the members data

document.getElementById('refresh-spotlights').addEventListener('click', displaySpotlights);

async function displaySpotlights() {
    try {
        if (!cachedMembers) {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            cachedMembers = data.members.filter(member => [2, 3].includes(member.membership));
            if (cachedMembers.length === 0) {
                console.log("No Gold or Silver members found.");
                displayErrorMessage("No Gold or Silver members found."); // Display error message
                return;
            }
        }

        const spotlights = cachedMembers
            .sort(() => 0.5 - Math.random()) // Shuffle the array randomly
            .slice(0, 3); // Get up to 3 members

        // Update each spotlight div
        spotlights.forEach((member, index) => {
            const spotlightDiv = document.getElementById(`spotlight${index + 1}`);
            if (spotlightDiv) {
                // Clear existing content
                spotlightDiv.innerHTML = '';

                // Create elements
                const h3 = document.createElement('h3');
                h3.textContent = member.name;
                spotlightDiv.appendChild(h3);

                const memberHeaderDiv = document.createElement('div');
                memberHeaderDiv.classList.add('member-header');
                spotlightDiv.appendChild(memberHeaderDiv);

                const img = document.createElement('img');
                img.src = `images/${member.logoPath}`;
                img.alt = `${member.name} Logo`;
                img.width = 200;
                img.height = 100;
                img.classList.add('spotlight-logo'); // Add class for error handling
                memberHeaderDiv.appendChild(img);

                const membershipClass = member.membership === 3 ? 'gold' : 'silver';
                const membershipLabel = member.membership === 3 ? 'Gold Member' : 'Silver Member';

                const membershipSpan = document.createElement('span');
                membershipSpan.classList.add('membership-level', membershipClass);
                membershipSpan.textContent = membershipLabel;
                memberHeaderDiv.appendChild(membershipSpan);

                const addressP = document.createElement('p');
                addressP.textContent = member.address;
                spotlightDiv.appendChild(addressP);

                const phoneP = document.createElement('p');
                phoneP.textContent = member.phone;
                spotlightDiv.appendChild(phoneP);

                const websiteA = document.createElement('a');
                websiteA.href = member.website;
                websiteA.target = '_blank';
                websiteA.textContent = 'Visit Website';
                spotlightDiv.appendChild(websiteA);

                const membershipP = document.createElement('p');
                membershipP.textContent = `Membership Level: ${membershipLabel}`;
                spotlightDiv.appendChild(membershipP);
            }
        });

    } catch (error) {
        console.error("Could not load members:", error);
        displayErrorMessage("Could not load members. Please try again later."); // Display error message
    }
}

function displayErrorMessage(message) {
    // Display the error message in the UI (e.g., in a designated error div)
    const errorDiv = document.getElementById('spotlight-error'); // Assuming you have an element with id="spotlight-error"
    if (errorDiv) {
        errorDiv.textContent = message;
    } else {
        alert(message); // Fallback if error div is not available
    }
}

// Initial call to populate the spotlights
displaySpotlights();