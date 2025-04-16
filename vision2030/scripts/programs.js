// scripts/programs.js
import { fetchData } from './data-service.js';
import { saveToLocalStorage, getFromLocalStorage } from './storage.js';
import { renderPrograms, renderSectors, renderNews, renderProjects } from './item-renderer.js';
import { setupModal } from './modal.js';

async function initializePrograms() {
    try {
        let programs = getFromLocalStorage('programs') || [];
        let sectors = getFromLocalStorage('sectors') || [];
        let news = getFromLocalStorage('news') || [];
        let projects = getFromLocalStorage('projects') || [];

        if (!programs.length) {
            const data = await fetchData('data/programs.json');
            programs = data.programs;
            sectors = data.sectors;
            news = data.news;
            saveToLocalStorage('programs', programs);
            saveToLocalStorage('sectors', sectors);
            saveToLocalStorage('news', news);
        }

        renderPrograms(programs);
        renderSectors(sectors);
        renderNews(news);
        renderProjects(projects)

        setupModal({
            programs: programs,
            sectors: sectors,
            news: news,
            projects:projects
        }, {
            renderPrograms: renderPrograms,
            renderSectors: renderSectors,
            renderNews: renderNews,
            renderProjects: renderProjects
        });

        // Add event listeners for the "Add" buttons
        document.getElementById('add-program-button').addEventListener('click', () => openModal('program'));
        document.getElementById('add-sector-button').addEventListener('click', () => openModal('sector'));
        document.getElementById('add-news-button').addEventListener('click', () => openModal('news'));

        function openModal(contentType) {
            const modal = document.getElementById('contentModal');
            const modalTitle = document.getElementById('modal-title');
            const contentTypeSelect = document.getElementById('content-type');

            modalTitle.textContent = `Add New ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`;
            contentTypeSelect.value = contentType; // Set the correct content type in the form
            modal.style.display = 'block';
        }

    } catch (error) {
        console.error('Error initializing programs:', error);
        document.getElementById('program-container').innerHTML = `<p>Failed to load data. Please try again later.</p>`;
    }
}

initializePrograms();