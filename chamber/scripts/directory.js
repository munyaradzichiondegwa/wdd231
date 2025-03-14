document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('members-container');
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const currentYearSpan = document.getElementById('current-year');
    const lastModifiedSpan = document.getElementById('last-modified');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    // Hamburger Menu Toggle
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Set current year and last modified date
    currentYearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = document.lastModified;

    // Fetch Members Function
    async function fetchMembers() {
        try {
            // Use relative path from your project structure
            const response = await fetch('members.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Fetched members:', data.members); // Debugging log
            return data.members;
        } catch (error) {
            console.error('Error fetching members:', error);
            return [];
        }
    }

    // Render Members Function
    function renderMembers(members, isGridView = true) {
        // Clear previous content
        membersContainer.innerHTML = '';
        
        // Set view class
        membersContainer.className = isGridView ? 'members-grid' : 'members-list';

        // Create member cards
        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');
            
            memberCard.innerHTML = `
                <img src="images/${member.logoPath}" alt="${member.name} Logo" class="member-logo">
                <h3>${member.name}</h3>
                <p>${member.description}</p>
                <div class="member-details">
                    <p>Address: ${member.address}</p>
                    <p>Phone: ${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <span class="membership-level">
                        Membership: ${getMembershipLevel(member.membershipLevel)}
                    </span>
                </div>
            `;

            membersContainer.appendChild(memberCard);
        });
    }

    // Membership Level Translator
    function getMembershipLevel(level) {
        switch(level) {
            case 1: return 'Basic Member';
            case 2: return 'Silver Member';
            case 3: return 'Gold Member';
            default: return 'Member';
        }
    }

    // Initial Load
    async function initializeDirectory() {
        try {
            const members = await fetchMembers();
            
            if (members.length === 0) {
                membersContainer.innerHTML = '<p>No members found.</p>';
                return;
            }
            
            renderMembers(members);

            // View Toggle Event Listeners
            gridViewBtn.addEventListener('click', () => renderMembers(members, true));
            listViewBtn.addEventListener('click', () => renderMembers(members, false));
        } catch (error) {
            console.error('Initialization failed:', error);
            membersContainer.innerHTML = '<p>Failed to load members. Please try again later.</p>';
        }
    }

    // Call initialization
    initializeDirectory();
});