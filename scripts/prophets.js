const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Full Prophet Data:', data.prophets); // Detailed logging
        displayProphets(data.prophets);
    } catch (error) {
        console.error('Error fetching prophet data:', error);
    }
}

const displayProphets = (prophets) => {
    cards.innerHTML = ''; // Clear previous cards
    prophets.forEach((prophet, index) => {
        // Create ordinal number (1st, 2nd, 3rd, 4th, etc.)
        const prophetNumber = getOrdinalNumber(index + 1);
        
        let card = document.createElement('section');
        card.classList.add('card');
        
        // Ensure full name and details are captured
        const fullName = prophet.name;
        const birthDate = prophet.birthdate;
        const birthPlace = prophet.birthplace;
        
        // Create card content with comprehensive details
        card.innerHTML = `
            <h2>${fullName} - ${prophetNumber} Prophet</h2>
            <div class="prophet-details">
                <p><strong>Order of Presidency:</strong> ${prophetNumber}</p>
                <p><strong>Date of Birth:</strong> ${birthDate}</p>
                <p><strong>Place of Birth:</strong> ${birthPlace}</p>
                <p><strong>Years of Presidency:</strong> ${prophet.length || 'N/A'}</p>
                <p><strong>Number of Children:</strong> ${prophet.numofchildren || prophet.children || 'N/A'}</p>
                <p><strong>Death:</strong> ${prophet.death || 'Still Living'}</p>
            </div>
            <img src="${prophet.imageurl}" 
                 alt="Portrait of ${fullName} – ${prophetNumber} Latter-day President" 
                 loading="lazy" 
                 width="340" 
                 height="440">
        `;
        
        // Add data attributes for advanced filtering
        card.dataset.fullName = fullName;
        card.dataset.birthplace = birthPlace.toLowerCase();
        card.dataset.prophetNumber = index + 1;
        card.dataset.presidencyLength = prophet.length || 0;
        card.dataset.children = prophet.numofchildren || prophet.children || 0;
        card.dataset.lifespan = calculateLifespan(prophet);
        
        cards.appendChild(card);
    });
}

// Function to create ordinal numbers (1st, 2nd, 3rd, 4th, etc.)
function getOrdinalNumber(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Calculate lifespan
function calculateLifespan(prophet) {
    if (!prophet.birthdate || !prophet.death) return 0;
    const birthYear = new Date(prophet.birthdate).getFullYear();
    const deathYear = new Date(prophet.death).getFullYear();
    return deathYear - birthYear;
}

// Advanced Filtering Functions
function setupFilterButtons() {
    document.getElementById('utah-btn').addEventListener('click', () => filterProphets('birthplace', 'utah'));
    document.getElementById('outside-us-btn').addEventListener('click', () => filterOutsideUS());
    document.getElementById('longevity-btn').addEventListener('click', () => filterByNumber('lifespan', 95, '>'));
    document.getElementById('large-family-btn').addEventListener('click', () => filterByNumber('children', 10, '>='));
    document.getElementById('long-service-btn').addEventListener('click', () => filterByNumber('presidencyLength', 15, '>='));
    document.getElementById('reset-btn').addEventListener('click', resetFilters);
}

// More robust outside US filtering
function filterOutsideUS() {
    const cards = document.querySelectorAll('.card');
    const outsideUSPlaces = ['england', 'scotland', 'denmark', 'canada'];
    
    cards.forEach(card => {
        const birthplace = card.dataset.birthplace.toLowerCase();
        const isOutsideUS = outsideUSPlaces.some(place => 
            birthplace.includes(place)
        );
        
        card.style.display = isOutsideUS ? 'block' : 'none';
    });
}

function filterProphets(attribute, value) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const match = card.dataset[attribute].toLowerCase().includes(value.toLowerCase());
        card.style.display = match ? 'block' : 'none';
    });
}

function filterByNumber(attribute, threshold, condition) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const value = parseFloat(card.dataset[attribute]);
        let visible = false;
        
        switch(condition) {
            case '>':
                visible = value > threshold;
                break;
            case '>=':
                visible = value >= threshold;
                break;
        }
        
        card.style.display = visible ? 'block' : 'none';
    });
}

function resetFilters() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.display = 'block';
    });
}

// Initialize
getProphetData();
setupFilterButtons();