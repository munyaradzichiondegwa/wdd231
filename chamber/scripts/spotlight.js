document.getElementById('refresh-spotlights').addEventListener('click', displaySpotlights);

async function displaySpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const goldSilverMembers = data.members.filter(member => [2, 3].includes(member.membership));

        if (goldSilverMembers.length === 0) {
            console.log("No Gold or Silver members found.");
            return;
        }

        const spotlights = goldSilverMembers
            .sort(() => 0.5 - Math.random()) // Shuffle the array randomly
            .slice(0, 3); // Get up to 3 members

        // Update each spotlight div
        spotlights.forEach((member, index) => {
            const spotlightDiv = document.getElementById(`spotlight${index + 1}`);
            if (spotlightDiv) {
                const membershipClass = getMembershipClass(member.membership);
                const membershipLabel = getMembershipLabel(member.membership);

                spotlightDiv.innerHTML = `
                    <h3>${member.name}</h3>
                    <div class="member-header">
                        <img src="images/${member.logoPath}" 
                             alt="${member.name} Logo" 
                             srcset="images/${member.logoPath} 1x, images/${member.logoPath.replace('.webp', '@2x.webp')} 2x" 
                             width="200" height="100" 
                             onerror="this.onerror=null; this.src='images/placeholder-logo.webp';">
                        <span class="membership-level ${membershipClass}">
                            ${membershipLabel}
                        </span>
                    </div>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <p>Membership Level: ${membershipLabel}</p>
                `;
            }
        });

    } catch (error) {
        console.error("Could not load members:", error);
    }
}

function getMembershipClass(membership) {
    return membership === 3 ? 'gold' : 'silver';
}

function getMembershipLabel(membership) {
    return membership === 3 ? 'Gold Member' : 'Silver Member';
}

// Initial call to populate the spotlights
displaySpotlights();
