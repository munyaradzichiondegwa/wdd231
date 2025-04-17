// scripts.js

document.addEventListener("DOMContentLoaded", function() {

  // Fade-in Hero Section (Already in your CSS, just needs a class toggle)
  const hero = document.querySelector('#hero');
  if (hero) {
    hero.classList.add('animate');
  }

  // Intersection Observer for Card Animations (Scroll-triggered)
  const cards = document.querySelectorAll('.card');
  const imgElements = document.querySelectorAll('img.animate-img');
  const headline = document.querySelector('.headline');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing after animating
      }
    });
  });

  cards.forEach(card => {
    observer.observe(card);
  });

  imgElements.forEach(img => {
    observer.observe(img);
  });

  if (headline) {
    observer.observe(headline);
    headline.classList.add('animate');
  }

  // Lazy Loading for Images
  const lazyImages = document.querySelectorAll('img[data-src]');

  lazyImages.forEach(img => {
    observer.observe(img);
    img.onload = () => {
      img.classList.add('visible'); // Add a class for a fade-in effect after loading
    };
  });

    // Mobile Menu Toggle (Existing functionality - keep it)
    const menuButton = document.getElementById('menu-button');
    const navList = document.getElementById('nav-list');

    if (menuButton && navList) {
        menuButton.addEventListener('click', () => {
            navList.classList.toggle('open');
        });
    }
});