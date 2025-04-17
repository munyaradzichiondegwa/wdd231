// scripts/mainapp.js
// Importing required functions from other modules using ES Modules
import { fetchData } from './data-service.js'; // Fetches project data from JSON
import { renderProjects } from './item-renderer.js'; // Renders project cards on the page
import { setupModal } from './modal.js'; // Handles modal functionality
import { saveToLocalStorage, getFromLocalStorage } from './storage.js'; // Handles localStorage operations

// Main function to initialize the app
async function initializeApp() {
    try {
        // Try to get existing project data from localStorage
        let projects = getFromLocalStorage('projects');

        // If no data found in localStorage, fetch from JSON file
        if (!projects) {
            projects = await fetchData('data/projects.json'); // Async fetch
            saveToLocalStorage('projects', projects); // Store fetched data in localStorage
        }

        // Render the project cards onto the page
        renderProjects(projects);

        // Initialize modal functionality and pass in the current project data
        setupModal(projects, renderProjects); // Allows modal to add new projects and re-render the list

        // Add event listener to the "Add Project" button
        const addProjectButton = document.getElementById('add-project-button');
        addProjectButton.addEventListener('click', () => {
            // Show the modal dialog when button is clicked
            const modal = document.getElementById('projectModal');
            modal.style.display = 'block';
        });

    } catch (error) {
        // Catch and log any errors during initialization
        console.error('Error initializing app:', error);

        // Display error message on the page if data fails to load
        document.getElementById('project-container').innerHTML = `<p>Failed to load data. Please try again later.</p>`;
    }
}

// Call the main function to start the app
initializeApp();
