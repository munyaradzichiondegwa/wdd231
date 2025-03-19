document.addEventListener('DOMContentLoaded', () => {
    // Current Year
    const currentYearElement = document.getElementById('current-year');
    currentYearElement.textContent = new Date().getFullYear();

    // Last Modified
    const lastModifiedElement = document.getElementById('last-modified');
    lastModifiedElement.textContent = document.lastModified;
});