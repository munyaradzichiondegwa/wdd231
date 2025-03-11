const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
let allProphets = []; // Store all prophets globally

// Function to create the entire page structure dynamically
function createPageStructure() {
    // Create header
    const header = document.createElement('header');
    header.innerHTML = `<h1>Latter-day Prophets</h1>`;
    document.body.insertBefore(header, document.body.firstChild);

    // Create main with cards
    const main = document.createElement('main');
    const cardsDiv = document.createElement('div');
    cardsDiv.id = 'cards';
    main.appendChild(cardsDiv);
    document.body.insertBefore(main, header.nextSibling);

    // Create footer
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <p>&copy; 2020 - <span id="currentYear"></span> Munyaradzi Chiondegwa | Latter-day Prophets</p>
        <p id="lastModified"></p>
    `;
    document.body.appendChild(footer);

    return cardsDiv;
}

async function getProphetData() {
    try {
        // Create page structure if not already present
        const cards = document.getElementById('cards') || createPageStructure();
        
        const response = await fetch(url);
        const data = await response.json();
        allProphets = data.prophets; // Store all prophets
        displayProphets(allProphets);
        createFilterButtons();
        searchProphets();
    } catch (error) {
        console.error('Error fetching prophet data:', error);
    }
}

const displayProphets = (prophets) => {
    // Clear existing cards
    cards.innerHTML = '';

    prophets.forEach((prophet) => {
        // Create elements
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let birthInfo = document.createElement('p');
        let additionalInfo = document.createElement('p');

        // Refactored alt text with prophet number
        fullName.textContent = `${prophet.name} - ${prophet.order}`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} – ${prophet.order}th Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Additional information
        birthInfo.textContent = `Born: ${prophet.birthdate} in ${prophet.birthplace}`;
        
        // Calculate age and additional details
        const birthYear = new Date(prophet.birthdate).getFullYear();
        const deathYear = prophet.death ? new Date(prophet.death).getFullYear() : new Date().getFullYear();
        const age = deathYear - birthYear;

        additionalInfo.innerHTML = `
            Age: ${age} years<br>
            Children: ${prophet.numOfChildren || 'Unknown'}<br>
            Years as President: ${prophet.yearsAsPresident || 'Unknown'}
        `;

        // Append elements
        card.appendChild(fullName);
        card.appendChild(portrait);
        card.appendChild(birthInfo);
        card.appendChild(additionalInfo);

        cards.appendChild(card);
    });
}

// The rest of the functions (createFilterButtons, searchProphets) remain the same as in the previous implementation

// Initialize the application
getProphetData();

// Date functionality
document.addEventListener('DOMContentLoaded', () => {
    // Current Year
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Last Modified with formatted date
    const lastModifiedPara = document.getElementById('lastModified');
    if (lastModifiedPara) {
        const lastModDate = new Date(document.lastModified);
        lastModifiedPara.textContent = `Last Updated: ${lastModDate.toLocaleDateString()} ${lastModDate.toLocaleTimeString()}`;
    }
});