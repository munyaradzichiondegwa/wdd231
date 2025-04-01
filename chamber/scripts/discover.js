// Visit tracking functionality
function getVisitMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();
    let message = '';

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastVisit < 1) {
            message = "Back so soon! Awesome!";
        } else {
            message = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? 'day' : 'days'} ago.`;
        }
    }

    localStorage.setItem('lastVisit', currentDate);
    return message;
}

// When the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Display visit message
    const visitMessageElement = document.getElementById('visitMessage');
    if (visitMessageElement) {
        visitMessageElement.textContent = getVisitMessage();
    }
});