// js/scripts.js
document.addEventListener('DOMContentLoaded', () => {
    // DOM Interaction (Navigation Menu)
    const menuButton = document.getElementById('menu-button');
    const navList = document.getElementById('nav-list');

    menuButton.addEventListener('click', () => {
        navList.classList.toggle('open');
    });

    // Function to fetch JSON data and dynamically build items
    async function fetchData(dataUrl, containerSelector, itemTemplate) {
        try {
            const response = await fetch(dataUrl);
            const data = await response.json();

            const itemsHtml = data.items.map(itemTemplate).join('');

            const container = document.querySelector(containerSelector);
            container.innerHTML = itemsHtml;

        } catch (error) {
            console.error('Error fetching data:', error);
            const container = document.querySelector(containerSelector);
            container.innerHTML = '<p>Failed to load data. Please try again later.</p>';
        }
    }

    // Homepage - Slideshow (Basic Example)
    if (document.querySelector('#hero-banner')) {
        let slideIndex = 0;
        const slides = document.querySelectorAll('.slide');

        function showSlides() {
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1 }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 5000); // Change image every 5 seconds
        }
        showSlides();
    }

    // Vision Page - Example of fetching data (replace with actual data/template)
    if (document.querySelector('#vision-mission')) {
        const visionDataUrl = 'data/vision_data.json'; // Corrected Path
        const visionContainer = '#vision-mission';

        const visionItemTemplate = (item) => `
            <div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;

        // fetchData(visionDataUrl, visionContainer, visionItemTemplate);

        // Initialize Leaflet map
        var map = L.map('map').setView([-17.825165, 31.047373], 6); // Zimbabwe coordinates and zoom level

        // Add a tile layer (you can use different tile providers)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add markers for development projects (example)
        L.marker([-17.825165, 31.047373]).addTo(map)
            .bindPopup('Harare: Infrastructure Project');

        L.marker([-20.2940, 29.3415]).addTo(map)
            .bindPopup('Bulawayo: Industrial Development');
    }

    // Economic Sectors - Example of fetching project data and using modal
    if (document.querySelector('#agriculture')) {
        const projectDataUrl = 'data/project_data.json'; // Corrected Path
        const projectContainer = '#agriculture';

        const projectItemTemplate = (item) => `
            <div class="project" data-id="${item.id}">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <button class="view-details">View Details</button>
            </div>
        `;

        fetchData(projectDataUrl, projectContainer, projectItemTemplate);

        // Modal Functionality (moved outside fetchData for reusability)
        function openModal(event) {
            const itemId = event.target.parentNode.dataset.id;
            // Fetch the project data (you might need to refetch or store it globally)
            fetch('data/project_data.json') // Corrected Path
                .then(response => response.json())
                .then(data => {
                    const item = data.items.find(item => item.id === itemId);

                    // Create modal HTML
                    const modalHtml = `
                        <div id="myModal" class="modal">
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <h2>${item.name}</h2>
                                <p>${item.fullDescription}</p>
                                <p>Funding: ${item.funding}</p>
                            </div>
                        </div>
                    `;

                    document.body.innerHTML += modalHtml; // Append modal to the body

                    // Add event listener to close button
                    const closeButton = document.querySelector('.close');
                    closeButton.addEventListener('click', closeModal);

                    // Show the modal
                    const modal = document.getElementById('myModal');
                    modal.style.display = "block";

                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function(event) {
                        if (event.target == modal) {
                            closeModal();
                        }
                    }
                });
        }

        function closeModal() {
            const modal = document.getElementById('myModal');
            modal.style.display = "none";
            modal.remove(); // Remove the modal from the DOM
        }

        // Add event listeners to "View Details" buttons (after data is loaded)
        setTimeout(() => { // Wait for the data to load
            const detailButtons = document.querySelectorAll('.view-details');
            detailButtons.forEach(button => {
                button.addEventListener('click', openModal);
            });
        }, 500); // Adjust the timeout as needed
    }

    // 7. LocalStorage Example (Saving a theme preference)
    const themeKey = 'themePreference';
    const defaultTheme = 'light';
    let currentTheme = localStorage.getItem(themeKey) || defaultTheme;

    function setTheme(themeName) {
        localStorage.setItem(themeKey, themeName);
        currentTheme = themeName;
        document.documentElement.className = themeName; // Add theme as class to HTML element
    }

    // Example usage:  You could have a button to toggle the theme
    // setTheme('dark');  // To set the theme to dark

    // Initial theme setup
    setTheme(currentTheme);
});

import { fetchData } from './data-service.js';
import { renderProjects } from './item-renderer.js';
import { setupModal } from './modal.js';
import { saveToLocalStorage, getFromLocalStorage } from './storage.js';

async function initializeApp() {
    try {
        let projects = getFromLocalStorage('projects') || [];

        if (!projects.length) {
            projects = await fetchData('data/projects.json');
            saveToLocalStorage('projects', projects);
        }

        renderProjects(projects);

        setupModal({ projects: projects }, { renderProjects: renderProjects });

        // Add project button event listener
        const addProjectButton = document.getElementById('add-project-button');
        addProjectButton.addEventListener('click', () => {
            const modal = document.getElementById('contentModal');
            const contentTypeSelect = document.getElementById('content-type');
            contentTypeSelect.value = 'project'; // Set the content type to 'project'
            modal.style.display = 'block';
        });

    } catch (error) {
        console.error('Error initializing app:', error);
        document.getElementById('project-container').innerHTML = `<p>Failed to load data. Please try again later.</p>`;
    }
}

initializeApp();

// scripts/index.js
import { fetchData } from './data-service.js';
import { renderProjects } from './item-renderer.js';
import { setupModal } from './modal.js';
import { saveToLocalStorage, getFromLocalStorage } from './storage.js';

async function initializeApp() {
    try {
        let projects = getFromLocalStorage('projects') || [];

        if (!projects.length) {
            console.log('Fetching projects from data/projects.json...');  // Debugging line
            projects = await fetchData('data/projects.json');
            console.log('Projects fetched:', projects);  // Debugging line
            saveToLocalStorage('projects', projects);
        } else {
            console.log('Projects loaded from local storage:', projects); // Debugging line
        }

        renderProjects(projects);

        setupModal({ projects: projects }, { renderProjects: renderProjects });

        // Add project button event listener
        const addProjectButton = document.getElementById('add-project-button');
        addProjectButton.addEventListener('click', () => {
            const modal = document.getElementById('contentModal');
            const contentTypeSelect = document.getElementById('content-type');
            contentTypeSelect.value = 'project'; // Set the content type to 'project'
            modal.style.display = 'block';
        });

    } catch (error) {
        console.error('Error initializing app:', error);
        document.getElementById('project-container').innerHTML = `<p>Failed to load data. Please try again later.</p>`;
    }
}

initializeApp();