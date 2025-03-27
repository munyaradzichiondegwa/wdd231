const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menuLinks');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    if (navElement.classList.contains('open')) {
        hamburgerElement.innerHTML = "✖"; // Show close icon when open
    } else {
        hamburgerElement.innerHTML = "&#9776;"; // Show hamburger icon when closed
    }
});