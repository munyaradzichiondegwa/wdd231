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

function handleImageError(event) {
    const img = event.target;
    
    // Fallback to a default placeholder image
    img.src = 'path/to/default-placeholder.webp';
    
    // Optional: Add a class to indicate fallback image
    img.classList.add('image-fallback');
}

// Apply error handling to all images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', handleImageError);
    });
});