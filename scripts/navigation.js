document.addEventListener('DOMContentLoaded', () => {
    const navList = document.querySelector('nav ul'); // Select the navigation list
    const menuButton = document.getElementById("menu-toggle"); // Hamburger menu button

    // Array of navigation links
    let navLinks = [
        { name: "Home", url: "#", active: true },
        { name: "Chamber", url: "#" },
        { name: "GitHub Profile", url: "https://github.com/munyaradzichiondegwa" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/bloodshed-munyaradzi-chiondegwa-84798a2b7/" }
    ];

    // Function to generate navigation links
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

    // Function to add a new navigation link dynamically
    function addNavLink(name, url, isActive = false) {
        navLinks.push({ name, url, active: isActive });
        generateNavLinks();
    }

    // Expose function to global scope for dynamic updates
    window.addNavLink = addNavLink;

    // Initial rendering of navigation links
    generateNavLinks();

    // Toggle the menu on small screens when the hamburger icon is clicked
    menuButton.addEventListener("click", () => {
        navList.classList.toggle("show");
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById("menu-toggle"); // Hamburger menu button
    const navList = document.getElementById("nav-list"); // Navigation list

    // Toggle the menu on small screens when the hamburger icon is clicked
    menuButton.addEventListener("click", () => {
        navList.classList.toggle("show");
    });
});
