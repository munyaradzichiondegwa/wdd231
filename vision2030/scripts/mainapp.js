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
        document.getElementById('project-container').innerHTML = <p>Failed to load data. Please try again later.</p>;
    }
}

initializeApp();