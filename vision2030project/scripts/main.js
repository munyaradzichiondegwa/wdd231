document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Theme Toggle (if not already in theme.js)
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        
        // Save preference to localStorage
        localStorage.setItem('theme', 
            htmlElement.classList.contains('dark') ? 'dark' : 'light'
        );
    });

    // Check saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Quick Links Interaction
    const quickLinks = document.querySelectorAll('.quick-link');
    quickLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.classList.add('shadow-lg', 'scale-105');
        });
        link.addEventListener('mouseleave', () => {
            link.classList.remove('shadow-lg', 'scale-105');
        });
    });
});