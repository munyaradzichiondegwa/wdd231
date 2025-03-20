document.addEventListener('DOMContentLoaded', () => {
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
            const data = await response.json();
            console.log('Members fetched:', data.members);  // Log to check if data is fetched correctly
            return data.members;
        } catch (error) {
            console.error('Error fetching members:', error);
            return [];
        }
    }

    // Render members
    function renderMembers(members, isGridView = true) {
        console.log('Rendering members:', members);  // Log the members being rendered
        membersContainer.innerHTML = ''; // Clear previous content
        membersContainer.className = isGridView ? 'members-grid' : 'members-list';

        const fragment = document.createDocumentFragment(); // Use fragment to minimize reflows

        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');
            memberCard.dataset.industry = member.sector.toLowerCase();

            // Log the image path
            console.log(`Image path for ${member.name}: images/${member.logoPath}`);

            memberCard.innerHTML = `
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
                <div class="member-body">
                    <h3>${member.name}</h3>
                    <p class="description">${member.description || ''}</p>
                    <div class="contact-details">
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><strong>Email:</strong> ${member.email || ''}</p>
                        <p><strong>Website:</strong> 
                            <a href="https://${member.website}" target="_blank">${member.website}</a>
                        </p>
                        <p><strong>Sector:</strong> ${member.sector}</p>
                    </div>
                </div>
            `;
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
            const selectedSector = industryFilter.value;

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

    initializeDirectory();
});
