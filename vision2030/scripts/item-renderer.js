// scripts/item-renderer.js
export function renderPrograms(programs) {
    const container = document.getElementById('program-container');
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

export function renderSectors(sectors) {
    const container = document.getElementById('sector-container');
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

export function renderNews(news) {
    const container = document.getElementById('news-container');
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