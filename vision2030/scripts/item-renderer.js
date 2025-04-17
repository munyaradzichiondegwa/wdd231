// ==============================
// item-renderer.js
// Handles rendering of different types of content
// ==============================

// Renders the list of projects dynamically
export function renderProjects(projects) {
    const container = document.getElementById('project-container');
    
    // Ensure the container exists in the DOM
    if (!container) {
        console.error('Project container not found!'); // Debug log
        return;
    }

    container.innerHTML = ''; // Clear any previous content

    // Validate that projects is a proper array
    if (!projects || !Array.isArray(projects)) {
        console.error('Invalid projects data:', projects);
        container.innerHTML = '<p>No projects to display.</p>';
        return;
    }

    // Loop through each project and render a card
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');

        // Set up project HTML structure
        projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <img src="${project.image}" alt="${project.title}" loading="lazy" width="${project.width}" height="${project.height}">
            <p>Category: ${project.category}</p>
            <p>Status: ${project.status}</p>
        `;

        container.appendChild(projectElement);
    });
}

// Renders development programs section
export function renderPrograms(programs) {
    const container = document.getElementById('program-container');
    if (!container) return; // Prevent error if element not found

    container.innerHTML = ''; // Clear previous programs

    programs.forEach(program => {
        const programElement = document.createElement('div');
        programElement.classList.add('program-card');

        // Create the program card layout
        programElement.innerHTML = `
            <h3>${program.title}</h3>
            <h4>${program.period}</h4>
            <p>${program.description}</p>
            <p><strong>Key Achievements:</strong> ${program.achievements}</p>
            <p><strong>Focus Areas:</strong> ${program.focusAreas}</p>
            <a href="${program.detailsLink}">View Details</a>
        `;

        container.appendChild(programElement);
    });
}

// Renders economic or development sectors
export function renderSectors(sectors) {
    const container = document.getElementById('sector-container');
    if (!container) return;

    container.innerHTML = ''; // Clear any previous sector info

    sectors.forEach(sector => {
        const sectorElement = document.createElement('div');
        sectorElement.classList.add('sector-card');

        // Structure for sector card with list
        sectorElement.innerHTML = `
            <h3>${sector.title}</h3>
            <p>${sector.description}</p>
            <ul>
                <li>${sector.listItem1}</li>
                <li>${sector.listItem2}</li>
                <li>${sector.listItem3}</li>
            </ul>
            <a href="${sector.detailsLink}">Learn More</a>
        `;

        container.appendChild(sectorElement);
    });
}

// Renders the latest news articles
export function renderNews(news) {
    const container = document.getElementById('news-container');
    if (!container) return;

    container.innerHTML = ''; // Reset existing content

    news.forEach(newsItem => {
        const newsElement = document.createElement('article');
        newsElement.classList.add('news-item');

        // Each article includes title, date, and description
        newsElement.innerHTML = `
            <h3><a href="${newsItem.newsLink}">${newsItem.title}</a></h3>
            <p class="news-date">${newsItem.date}</p>
            <p>${newsItem.description}</p>
            <a href="${newsItem.newsLink}">Read More</a>
        `;

        container.appendChild(newsElement);
    });
}
