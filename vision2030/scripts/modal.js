// scripts/modal.js

// Import save function to store data in localStorage
import { saveToLocalStorage } from './storage.js';

// Main function to initialize and handle modal logic
export function setupModal(data, renderFunctions) {
    const modal = document.getElementById('contentModal'); // Modal container
    const closeButton = document.querySelector('.close-button'); // Close button (×)
    const form = document.getElementById('content-form'); // The form inside the modal
    const contentTypeSelect = document.getElementById('content-type'); // Dropdown for selecting content type
    const newsLinkField = document.getElementById('news-link-field'); // Input field for news link (conditionally shown)

    // Close modal when close button is clicked
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when user clicks outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Toggle visibility of news link field based on selected content type
    contentTypeSelect.addEventListener('change', () => {
        if (contentTypeSelect.value === 'news') {
            newsLinkField.style.display = 'block';
        } else {
            newsLinkField.style.display = 'none';
        }
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form behavior (page reload)

        // Get form values
        const contentType = document.getElementById('content-type').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const imageFile = document.getElementById('image').files[0];
        const newsLink = document.getElementById('news-link').value;

        // Use default image if no image is selected
        let imageURL = 'images/default.png';
        if (imageFile) {
            imageURL = URL.createObjectURL(imageFile); // Create temporary image URL
        }

        let newItem; // Variable to hold the new content object

        // Handle each content type
        switch (contentType) {
            case 'program':
                // Create program object with placeholder data
                newItem = {
                    title: title,
                    description: description,
                    achievements: 'To be added',
                    focusAreas: 'To be added',
                    detailsLink: '#',
                    image: imageURL
                };
                data.programs.push(newItem); // Add to programs array
                saveToLocalStorage('programs', data.programs); // Persist to localStorage
                renderFunctions.renderPrograms(data.programs); // Re-render the UI
                break;

            case 'sector':
                // Create sector object with placeholder data
                newItem = {
                    title: title,
                    description: description,
                    listItem1: 'To be added',
                    listItem2: 'To be added',
                    listItem3: 'To be added',
                    detailsLink: '#',
                    image: imageURL
                };
                data.sectors.push(newItem); // Add to sectors array
                saveToLocalStorage('sectors', data.sectors); // Persist to localStorage
                renderFunctions.renderSectors(data.sectors); // Re-render the UI
                break;

            case 'news':
                // Create news object with current date
                newItem = {
                    title: title,
                    description: description,
                    date: new Date().toLocaleDateString(), // Format date as string
                    newsLink: newsLink,
                    image: imageURL
                };
                data.news.push(newItem); // Add to news array
                saveToLocalStorage('news', data.news); // Persist to localStorage
                renderFunctions.renderNews(data.news); // Re-render the UI
                break;
        }

        modal.style.display = 'none'; // Close the modal after submission
    });
}
