// Import utility functions for fetching data and localStorage management
import { fetchData } from './data-service.js';
import { saveToLocalStorage, getFromLocalStorage } from './storage.js';

// Main function to initialize resources section
async function initializeResources() {
    try {
        // Attempt to retrieve resources from localStorage
        let resources = getFromLocalStorage('resources');

        // If not found, fetch from JSON file and save to localStorage
        if (!resources) {
            resources = await fetchData('data/resources.json');
            saveToLocalStorage('resources', resources);
        }

        // Render the resource items to the page
        renderResources(resources);
    } catch (error) {
        // Show error message in case of failure
        console.error('Error initializing resources:', error);
        document.getElementById('resource-container').innerHTML = `<p>Failed to load resources. Please try again later.</p>`;
    }
}

// Function to render each resource item to the DOM
function renderResources(resources) {
    const container = document.getElementById('resource-container');
    container.innerHTML = ''; // Clear previous content if any

    resources.forEach(resource => {
        const resourceElement = document.createElement('div');
        resourceElement.classList.add('resource-item');

        // Build HTML structure for each resource
        resourceElement.innerHTML = `
            <h3>${resource.title}</h3>
            <p>${resource.period}</p>
            <p>${resource.description}</p>
            <p>${resource.fileType} • ${resource.fileSize}</p>
            <a href="${resource.downloadLink}" loading="lazy">Download</a>
            <img src="${resource.image}" alt="${resource.title}" loading="lazy" width="${resource.width}" height="${resource.height}">
        `;

        // Append the resource item to the container
        container.appendChild(resourceElement);
    });
}

// Call the initializer when the script loads
initializeResources();
