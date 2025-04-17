// Import utility functions and components
import { fetchData } from './data-service.js';
import { saveToLocalStorage, getFromLocalStorage } from './storage.js';
import { renderPrograms, renderSectors, renderNews } from './item-renderer.js';
import { setupModal } from './modal.js';

// Main function to initialize program data and setup the page
async function initializePrograms() {
    try {
        // Load existing data from localStorage or initialize empty arrays
        let programs = getFromLocalStorage('programs') || [];
        let sectors = getFromLocalStorage('sectors') || [];
        let news = getFromLocalStorage('news') || [];

        // If there's no data in localStorage, fetch it from the JSON file
        if (!programs.length) {
            const data = await fetchData('data/programs.json');
            programs = data.programs;
            sectors = data.sectors;
            news = data.news;

            // Save fetched data to localStorage for persistence
            saveToLocalStorage('programs', programs);
            saveToLocalStorage('sectors', sectors);
            saveToLocalStorage('news', news);
        }

        // Render items on the page using the retrieved data
        renderPrograms(programs);
        renderSectors(sectors);
        renderNews(news);

        // Setup modal logic for adding new content
        setupModal(
            {
                programs: programs,
                sectors: sectors,
                news: news
            },
            {
                renderPrograms: renderPrograms,
                renderSectors: renderSectors,
                renderNews: renderNews
            }
        );

        // Add event listeners to open the modal when "Add" buttons are clicked
        document.getElementById('add-program-button').addEventListener('click', () => openModal('program'));
        document.getElementById('add-sector-button').addEventListener('click', () => openModal('sector'));
        document.getElementById('add-news-button').addEventListener('click', () => openModal('news'));

        // Function to display the modal and pre-select the content type
        function openModal(contentType) {
            const modal = document.getElementById('contentModal');
            const modalTitle = document.getElementById('modal-title');
            const contentTypeSelect = document.getElementById('content-type');

            modalTitle.textContent = `Add New ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`;
            contentTypeSelect.value = contentType;
            modal.style.display = 'block';
        }

    } catch (error) {
        // Show error message if data fetching or rendering fails
        console.error('Error initializing programs:', error);
        document.getElementById('program-container').innerHTML = `<p>Failed to load data. Please try again later.</p>`;
    }
}

// Execute initialization
initializePrograms();
