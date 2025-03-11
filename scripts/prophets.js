const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cardsContainer = document.querySelector('#cards');
let prophets = [];

// List of US state names for improved birthplace filtering
const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
  'Wisconsin', 'Wyoming'
];

// Fetch prophet data from the JSON source
async function getProphetData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // Uncomment the following line to inspect data in the console:
    // console.table(data.prophets);
    prophets = data.prophets;
    displayProphets(prophets);
    createFilterButtons();
  } catch (error) {
    console.error('Error fetching prophet data:', error);
    cardsContainer.innerHTML = `<p>Error loading prophets: ${error.message}</p>`;
  }
}

// Display the prophets in the DOM
function displayProphets(prophetsArray) {
  cardsContainer.innerHTML = '';
  prophetsArray.forEach((prophet) => {
    // Create a card section for each prophet
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');
    let birthInfo = document.createElement('p');

    // Build full name with prophet number and ordinal suffix
    fullName.textContent = `${prophet.name} – ${prophet.order}${getOrdinalSuffix(prophet.order)} Latter-day President`;

    // Set portrait attributes with refined alternative text
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} – ${prophet.order}${getOrdinalSuffix(prophet.order)} Latter-day President`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Display additional information (birth date and birthplace)
    birthInfo.innerHTML = `<strong>Born:</strong> ${prophet.birthdate} in ${prophet.birthplace}`;

    // Append elements to the card and then to the cards container
    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(birthInfo);
    cardsContainer.appendChild(card);
  });
}

// Utility: Return ordinal suffix for a given number
function getOrdinalSuffix(num) {
  let j = num % 10,
      k = num % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}

// Create filter buttons to allow users to filter the prophet data
function createFilterButtons() {
  const filterContainer = document.createElement('div');
  filterContainer.classList.add('filter-buttons');

  // Define filter criteria
  const filters = [
    {
      label: 'Born in Utah',
      filterFn: prophet => prophet.birthplace.includes('Utah')
    },
    {
      label: 'Born outside US',
      filterFn: prophet => {
        const birthplace = prophet.birthplace;
        // Check if the birthplace contains any US state name
        const isUSBirth = usStates.some(state => birthplace.includes(state));
        return !isUSBirth;
      }
    },
    {
      label: 'Lived 95+ years',
      filterFn: prophet => {
        if (!prophet.death) return false;
        const birthYear = new Date(prophet.birthdate).getFullYear();
        const deathYear = new Date(prophet.death).getFullYear();
        return (deathYear - birthYear) >= 95;
      }
    },
    {
      label: '10+ children',
      filterFn: prophet => prophet.numOfChildren >= 10
    },
    {
      label: '15+ years as President',
      filterFn: prophet => prophet.yearsAsPresident >= 15
    }
  ];

  // Create buttons for each filter criterion
  filters.forEach(filterObj => {
    const btn = document.createElement('button');
    btn.textContent = filterObj.label;
    btn.addEventListener('click', () => {
      const filteredProphets = prophets.filter(filterObj.filterFn);
      displayProphets(filteredProphets);
    });
    filterContainer.appendChild(btn);
  });

  // Add a reset filter button to display all data
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset Filters';
  resetBtn.addEventListener('click', () => {
    displayProphets(prophets);
  });
  filterContainer.appendChild(resetBtn);

  // Insert the filter buttons container before the cards container
  const main = document.querySelector('main');
  main.insertBefore(filterContainer, cardsContainer);
}

// Initialize the app by fetching the prophet data
getProphetData();
