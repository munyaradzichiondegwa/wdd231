// Toggle mobile menu
const hamburger = document.getElementById('hamburger-menu');
const navList = document.querySelector('#main-nav ul');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', navList.classList.contains('active'));
});

// Set active page
document.querySelectorAll('#main-nav a').forEach(link => {
    if(link.href === window.location.href) {
        link.classList.add('active-page');
        link.setAttribute('aria-current', 'page');
    }
});