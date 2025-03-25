document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        
        // Optional: Animate hamburger to X
        hamburgerMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = hamburgerMenu.contains(event.target) || navLinks.contains(event.target);
        if (!isClickInsideMenu) {
            navLinks.classList.remove('show');
            hamburgerMenu.classList.remove('active');
        }
    });
});