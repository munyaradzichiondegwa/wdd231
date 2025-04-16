// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            // Optional: Change button icon (e.g., bars to times)
            const icon = menuButton.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // --- Theme Toggle ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const sunIcon = themeToggleButton?.querySelector('.fa-sun'); // Assuming you add these classes/icons
    const moonIcon = themeToggleButton?.querySelector('.fa-moon');

    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
            localStorage.setItem('theme', 'light');
        }
    };

    // Initial theme application
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (userPrefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light'); // Default to light
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // --- Optional: Update Theme on System Preference Change ---
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        // Only change if no explicit user preference is saved
        if (!localStorage.getItem('theme')) {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });

    // --- Optional: Smooth Scroll for Nav Links ---
    document.querySelectorAll('header nav a[href^="#"], footer a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Check if it's a link to a section on the *current* page
            if (targetId.startsWith('#') && document.getElementById(targetId.substring(1))) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open after clicking a link
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                     mobileMenu.classList.remove('open');
                     menuButton.querySelector('i')?.classList.add('fa-bars');
                     menuButton.querySelector('i')?.classList.remove('fa-times');
                }
            }
        });
    });

});