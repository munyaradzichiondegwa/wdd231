// scripts/modal.js
import { saveToLocalStorage } from './storage.js';

export function setupModal(data, renderFunctions) {
    const modal = document.getElementById('contentModal');
    const closeButton = document.querySelector('.close-button');
    const form = document.getElementById('content-form');
    const contentTypeSelect = document.getElementById('content-type');
    const newsLinkField = document.getElementById('news-link-field');

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

        const contentType = document.getElementById('content-type').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const imageFile = document.getElementById('image').files[0];
        const newsLink = document.getElementById('news-link').value;

        let imageURL = 'images/default.png'; // Default image
        if (imageFile) {
            imageURL = URL.createObjectURL(imageFile);
        }

        let newItem;

        switch (contentType) {
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