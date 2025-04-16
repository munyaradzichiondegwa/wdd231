// scripts/resources.js
import { fetchData } from './data-service.js';
import { saveToLocalStorage, getFromLocalStorage } from './storage.js';

async function initializeResources() {
    try {
        let resources = getFromLocalStorage('resources');

        if (!resources) {
            resources = await fetchData('data/resources.json');
            saveToLocalStorage('resources', resources);
        }

        renderResources(resources);
    } catch (error) {
        console.error('Error initializing resources:', error);
        document.getElementById('resource-container').innerHTML = `<p>Failed to load resources. Please try again later.</p>`;
    }
}

function renderResources(resources) {
    const container = document.getElementById('resource-container');
    container.innerHTML = '';

    resources.forEach(resource => {
        const resourceElement = document.createElement('div');
        resourceElement.classList.add('resource-item');

        resourceElement.innerHTML = `
            <h3>${resource.title}</h3>
            <p>${resource.period}</p>
            <p>${resource.description}</p>
            <p>${resource.fileType} • ${resource.fileSize}</p>
            <a href="${resource.downloadLink}" loading="lazy">Download</a>
            <img src="${resource.image}" alt="${resource.title}" loading="lazy" width="${resource.width}" height="${resource.height}">
        `;

        container.appendChild(resourceElement);
    });
}

initializeResources();