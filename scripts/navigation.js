document.addEventListener('DOMContentLoaded', () => {
    const navList = document.querySelector('nav ul'); // Select the navigation list

    // Array of navigation links
    let navLinks = [
        { name: "Home", url: "#", active: true },
        { name: "Chamber", url: "#" },
        { name: "GitHub Profile", url: "https://github.com/yourprofile" },
        { name: "LinkedIn", url: "https://linkedin.com/in/yourprofile" }
    ];

    function generateNavLinks() {
        navList.innerHTML = ''; // Clear existing navigation links

        navLinks.forEach(link => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.textContent = link.name;
            anchor.href = link.url;
            if (link.active) anchor.classList.add('active'); // Highlight active link
            listItem.appendChild(anchor);
            navList.appendChild(listItem);
        });
    }

    // Function to update navigation dynamically
    function addNavLink(name, url, isActive = false) {
        navLinks.push({ name, url, active: isActive });
        generateNavLinks();
    }

    // Expose function to global scope for dynamic updates
    window.addNavLink = addNavLink;

    // Initial rendering of navigation links
    generateNavLinks();
});
