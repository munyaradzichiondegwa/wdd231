document.addEventListener('DOMContentLoaded', () => {
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = themeToggle.querySelector('.fa-moon');
    const sunIcon = themeToggle.querySelector('.fa-sun');

    function setTheme(theme) {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        } else {
            htmlElement.classList.remove('dark');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
        localStorage.setItem('theme', theme);
    }

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
        setTheme(currentTheme);
    });
});