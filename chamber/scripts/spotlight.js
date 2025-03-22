async function displaySpotlights() {
    try {
        const response = await fetch('data/members.json');
        console.log("Response status:", response.status);  // Check status code
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);  // Log the entire fetched data

        // Modify the filter to check for membership levels 2 (Silver) and 3 (Gold)
        const goldSilverMembers = data.members.filter(member => member.membership === 2 || member.membership === 3);
        console.log("Gold/Silver members:", goldSilverMembers);  // Log filtered members

        if (goldSilverMembers.length === 0) {
            console.log("No Gold or Silver members found.");
            return;
        }

        let spotlights = [];
        if (goldSilverMembers.length <= 3) {
            spotlights = [...goldSilverMembers]; // Use all members if 3 or fewer
        } else {
            // Randomly select 3 members without replacement
            while (spotlights.length < 3 && goldSilverMembers.length > 0) {
                const randomIndex = Math.floor(Math.random() * goldSilverMembers.length);
                spotlights.push(goldSilverMembers.splice(randomIndex, 1)[0]);
            }
        }

        // Display the selected spotlights
        spotlights.forEach((member, index) => {
            const spotlightDiv = document.getElementById(`spotlight${index + 1}`);
            console.log(`Spotlight ${index + 1} div:`, spotlightDiv);  // Check if the div is found
            if (spotlightDiv) {
                spotlightDiv.innerHTML = `
                    <h3>${member.name}</h3>
                    <div class="member-header">
                        <img src="images/${member.logoPath}" 
                             alt="${member.name} Logo" 
                             srcset="images/${member.logoPath} 1x, images/${member.logoPath.replace('.webp', '@2x.webp')} 2x" 
                             width="200" height="100" 
                             onerror="this.onerror=null; this.src='images/placeholder-logo.webp';">
                        <span class="membership-level ${getMembershipClass(member.membership)}">
                            ${getMembershipLabel(member.membership)}
                        </span>
                    </div>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <p>Membership Level: ${member.membership === 3 ? 'Gold' : 'Silver'}</p>
                `;
            }
        });

    } catch (error) {
        console.error("Could not load members:", error);
    }
}

function getMembershipClass(membership) {
    // Return a class based on membership level
    return membership === 3 ? 'gold' : 'silver';
}

function getMembershipLabel(membership) {
    // Return a label based on membership level
    return membership === 3 ? 'Gold Member' : 'Silver Member';
}

displaySpotlights();
