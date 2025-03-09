document.addEventListener('DOMContentLoaded', () => {
    // Current Year
    const currentYear = new Date().getFullYear();
    
    // Update footer with current year and last modified date
    const footerParagraphs = document.querySelectorAll('footer p');
    footerParagraphs[0].innerHTML = `©${currentYear} Rubia Magdelena Francesco | Madagascar`;
    footerParagraphs[1].textContent = `Last Update: ${document.lastModified}`;
});