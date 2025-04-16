// scripts/item-renderer.js

// Render Projects
export function renderProjects(projects) {
    const container = document.getElementById('project-container');
    if (!container) {
        console.error('Project container not found!');  // Debugging line
        return;
    }

    container.innerHTML = '';

    if (!projects || !Array.isArray(projects)) {
        console.error('Invalid projects data:', projects);  // Debugging line
        container.innerHTML = '<p>No projects to display.</p>';
        return;
    }

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');

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

// Render Programs
export function renderPrograms(programs) {
    const container = document.getElementById('program-container');
    if (!container) return; // Check if container exists

    container.innerHTML = '';

    programs.forEach(program => {
        const programElement = document.createElement('div');
        programElement.classList.add('program-card');

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

// Render Sectors
export function renderSectors(sectors) {
    const container = document.getElementById('sector-container');
    if (!container) return;  // Check if container exists
    container.innerHTML = '';

    sectors.forEach(sector => {
        const sectorElement = document.createElement('div');
        sectorElement.classList.add('sector-card');

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

// Render News
export function renderNews(news) {
    const container = document.getElementById('news-container');
    if (!container) return; // Check if container exists

    container.innerHTML = '';

    news.forEach(newsItem => {
        const newsElement = document.createElement('article');
        newsElement.classList.add('news-item');

        newsElement.innerHTML = `
            <h3><a href="${newsItem.newsLink}">${newsItem.title}</a></h3>
            <p class="news-date">${newsItem.date}</p>
            <p>${newsItem.description}</p>
            <a href="${newsItem.newsLink}">Read More</a>
        `;

        container.appendChild(newsElement);
    });
}