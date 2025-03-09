document.addEventListener("DOMContentLoaded", () => {
    // Get current year dynamically
    const currentYearSpan = document.getElementById("currentYear");
    const currentYear = new Date().getFullYear();
    if (currentYearSpan) {
        currentYearSpan.textContent = currentYear;
    }

    // Get last modified date dynamically
    const lastModifiedSpan = document.getElementById("lastModified");
    const lastModifiedDate = document.lastModified; // Returns last modified date of the document

    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = `Last updated: ${lastModifiedDate}`;
    }
});
