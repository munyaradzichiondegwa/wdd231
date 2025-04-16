// scripts/modal.js
import { saveToLocalStorage } from './storage.js';
import { renderProjects } from './item-renderer.js'; // Import renderProjects

export function setupModal(data, renderFunctions) {
    const modal = document.getElementById('contentModal');
    if (!modal) return; // Exit if modal doesn't exist
    const closeButton = modal.querySelector('.close-button');
    const form = modal.querySelector('form');
    const contentTypeSelect = modal.querySelector('#content-type');
    const newsLinkField = modal.querySelector('#news-link-field');

    if (!closeButton || !form || !contentTypeSelect || !newsLinkField) {
        console.warn("Modal elements not found.  Check your HTML.");
        return;
    }

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    contentTypeSelect.addEventListener('change', () => {
        if (contentTypeSelect.value === 'news') {
            newsLinkField.style.display = 'block';
        } else {
            newsLinkField.style.display = 'none';
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const contentType = contentTypeSelect.value;
        const title = form.querySelector('#title').value;
        const description = form.querySelector('#description').value;
        const imageFile = form.querySelector('#image').files[0];
        const newsLink = form.querySelector('#news-link')?.value || ''; // Optional chaining

        let imageURL = 'images/default.png';
        if (imageFile) {
            imageURL = URL.createObjectURL(imageFile);
        }

        let newItem;

        switch (contentType) {
            case 'project':  // Handle project submission
                newItem = {
                    title: title,
                    description: description,
                    category: 'To be added', // You might want to add a category field to the modal
                    status: 'To be added',  // You might want to add a status field to the modal
                    image: imageURL,
                    width: 400,  // Or get these from user input
                    height: 300
                };
                data.projects = data.projects || [];  // Initialize if it doesn't exist
                data.projects.push(newItem);
                saveToLocalStorage('projects', data.projects);
                if (renderFunctions.renderProjects) {
                    renderFunctions.renderProjects(data.projects);
                }
                break;

            case 'program':
                newItem = {
                    title: title,
                    description: description,
                    achievements: 'To be added',
                    focusAreas: 'To be added',
                    detailsLink: '#',
                    image: imageURL
                };
                data.programs.push(newItem);
                saveToLocalStorage('programs', data.programs);
                renderFunctions.renderPrograms(data.programs);
                break;

            case 'sector':
                newItem = {
                    title: title,
                    description: description,
                    listItem1: 'To be added',
                    listItem2: 'To be added',
                    listItem3: 'To be added',
                    detailsLink: '#',
                    image: imageURL
                };
                data.sectors.push(newItem);
                saveToLocalStorage('sectors', data.sectors);
                renderFunctions.renderSectors(data.sectors);
                break;

            case 'news':
                newItem = {
                    title: title,
                    description: description,
                    date: new Date().toLocaleDateString(),
                    newsLink: newsLink,
                    image: imageURL
                };
                data.news.push(newItem);
                saveToLocalStorage('news', data.news);
                renderFunctions.renderNews(data.news);
                break;
        }

        modal.style.display = 'none';
    });
}