// Coursework list
const coursework = [
    "About Me",
    "White Water Rafting Project",
    "Temples",
    "Places",
    "The Garden Community Hub Project"
];

document.getElementById('course-list').innerHTML = `
    <ul>${coursework.map(item => `<li>${item}</li>`).join('')}</ul>
`;

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if(!e.target.closest('#main-nav') && !e.target.closest('#hamburger-menu')) {
        navList.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});