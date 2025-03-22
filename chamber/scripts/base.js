document.addEventListener('DOMContentLoaded', () => {
    // Check if the browser supports service workers
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }

    const membersContainer = document.getElementById('members-container');
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const searchInput = document.getElementById('search-input');
    const industryFilter = document.getElementById('industry-filter');

    // Last modified and current year
    document.getElementById('last-modified').textContent = document.lastModified;
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Hamburger Menu Toggle
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fetch members
    async function fetchMembers() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            //console.log('Members fetched:', data.members);  // Log to check if data is fetched correctly
            return data.members;
        } catch (error) {
            console.error('Error fetching members:', error);
            displayErrorMessage('Failed to load member data. Please try again later.');  // Display error
            return [];
        }
    }

    // Render members
    function renderMembers(members, isGridView = true) {
        //console.log('Rendering members:', members);  // Log the members being rendered
        membersContainer.innerHTML = ''; // Clear previous content
        membersContainer.className = isGridView ? 'members-grid' : 'members-list';

        const fragment = document.createDocumentFragment(); // Use fragment to minimize reflows

        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');
            memberCard.dataset.industry = member.sector.toLowerCase();  // Changed from industry to sector to match the JSON data

            const memberHeader = document.createElement('div');
            memberHeader.classList.add('member-header');

            const img = document.createElement('img');
            img.src = `images/${member.logoPath}`;
            img.alt = `${member.name} Logo`;
            img.width = 200; // Added width and height for better CLS
            img.height = 100;
            img.onerror = () => { img.src = 'images/placeholder-logo.webp'; };  // Fallback image
            memberHeader.appendChild(img);

            const membershipSpan = document.createElement('span');
            membershipSpan.classList.add('membership-level', getMembershipClass(member.membership));
            membershipSpan.textContent = getMembershipLabel(member.membership);
            memberHeader.appendChild(membershipSpan);

            memberCard.appendChild(memberHeader);

            const memberBody = document.createElement('div');
            memberBody.classList.add('member-body');

            const h3 = document.createElement('h3');
            h3.textContent = member.name;
            memberBody.appendChild(h3);

            const descriptionP = document.createElement('p');
            descriptionP.classList.add('description');
            descriptionP.textContent = member.description || '';
            memberBody.appendChild(descriptionP);

            const contactDetails = document.createElement('div');
            contactDetails.classList.add('contact-details');

            contactDetails.innerHTML = `
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Email:</strong> ${member.email || ''}</p>
                <p><strong>Website:</strong> 
                    <a href="https://${member.website}" target="_blank">${member.website}</a>
                </p>
                <p><strong>Sector:</strong> ${member.sector}</p>
            `;

            memberBody.appendChild(contactDetails);
            memberCard.appendChild(memberBody);
            fragment.appendChild(memberCard); // Append to fragment instead of directly to DOM
        });

        membersContainer.appendChild(fragment); // Append all members at once
    }

    // Membership level helpers
    function getMembershipClass(level) {
        const levels = {1: 'member', 2: 'silver', 3: 'gold'};
        return levels[level] || 'member';
    }

    function getMembershipLabel(level) {
        const labels = {1: 'Standard', 2: 'Silver', 3: 'Gold'};
        return labels[level] || 'Standard';
    }

    // Filtering and searching
    async function initializeDirectory() {
        const members = await fetchMembers();
        let filteredMembers = members;

        // Initial render (grid view)
        renderMembers(filteredMembers);

        // View toggle
        gridViewBtn.addEventListener('click', () => renderMembers(filteredMembers, true));
        listViewBtn.addEventListener('click', () => renderMembers(filteredMembers, false));

        // Search and filter functionality
        function updateMembers() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedSector = industryFilter.value;  // Changed to sector to match the JSON data

            filteredMembers = members.filter(member => 
                (member.name.toLowerCase().includes(searchTerm) || 
                 member.description.toLowerCase().includes(searchTerm)) &&
                (selectedSector === '' || member.sector.toLowerCase() === selectedSector)
            );

            renderMembers(filteredMembers);
        }

        searchInput.addEventListener('input', updateMembers);
        industryFilter.addEventListener('change', updateMembers);
    }

    function displayErrorMessage(message) {
        const errorDiv = document.getElementById('members-error'); // Make sure you have an element with this ID
        if (errorDiv) {
            errorDiv.textContent = message;
        } else {
            alert(message);
        }
    }

    initializeDirectory();

    // Example of dynamic import (consider if truly needed - see notes below)
    const shouldLoadExtraFeatures = false; // Replace with your condition
    if (shouldLoadExtraFeatures) {
        import('./extra-features.js')
            .then(module => {
                module.initializeExtraFeatures(); // Call a function in the module
            })
            .catch(error => {
                console.error('Error loading extra features:', error);
                displayErrorMessage('Failed to load extra features.');
            });
    }
});