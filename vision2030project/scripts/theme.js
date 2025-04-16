// Theme Detection and Toggle
function initTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        document.documentElement.classList.toggle('dark', event.matches);
    });

    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
    });
}

document.addEventListener('DOMContentLoaded', initTheme);