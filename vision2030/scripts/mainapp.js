// scripts/mainapp.js
import { fetchData } from './data-service.js';
import { renderProjects } from './item-renderer.js';
import { setupModal } from './modal.js';
import { saveToLocalStorage, getFromLocalStorage } from './storage.js';

async function initializeApp() {
    try {
        let projects = getFromLocalStorage('projects');

        if (!projects) {
            projects = await fetchData('data/projects.json');
            saveToLocalStorage('projects', projects);
        }

        renderProjects(projects);
        setupModal(projects, renderProjects); // Pass renderProjects to setupModal

        // Add project button event listener
        const addProjectButton = document.getElementById('add-project-button');
        addProjectButton.addEventListener('click', () => {
            const modal = document.getElementById('projectModal');
            modal.style.display = 'block';
        });

    } catch (error) {
        console.error('Error initializing app:', error);
        document.getElementById('project-container').innerHTML = `<p>Failed to load data. Please try again later.</p>`;
    }
}

initializeApp();

const hero = document.querySelector('.hero');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      hero.classList.add('animate');
    }
  });
}, { threshold: 0.5 });

observer.observe(hero);


const cards = document.querySelectorAll('.card');

const cardObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 150); // Stagger
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => cardObserver.observe(card));

const images = document.querySelectorAll('img.animate-img');

const imgObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

images.forEach(img => imgObserver.observe(img));

const headline = document.querySelector('.headline');
const text = headline.dataset.text;
headline.innerHTML = text
  .split('')
  .map((char, i) =>
    `<span style="transition-delay:${i * 50}ms">${char}</span>`
  ).join('');

const headObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      headline.classList.add('animate');
    }
  });
}, { threshold: 0.6 });

headObserver.observe(headline);

