// js/news.js

// --- Example function to create news item HTML ---
function createNewsItemHTML(item) {
    // Basic template - match your news item structure in news.html
    return `
        <div class="card news-item">
            <div class="news-meta">
                <span class="news-category bg-${item.categoryColor || 'primary'}">${item.category}</span>
                <span class="news-date">${item.date}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.excerpt}</p>
            <div class="news-footer">
                <a href="${item.link || '#'}" class="text-primary font-medium">Read More <i class="fas fa-arrow-right"></i></a>
                <div class="share-buttons">
                    <button type="button" title="Share on Twitter"><i class="fab fa-twitter"></i></button>
                    <button type="button" title="Share on Facebook"><i class="fab fa-facebook"></i></button>
                    <button type="button" title="Share on LinkedIn"><i class="fab fa-linkedin"></i></button>
                </div>
            </div>
        </div>
    `;
}


document.addEventListener('DOMContentLoaded', () => {
    // --- Load More News ---
    const loadMoreButton = document.getElementById('load-more-news');
    const newsContainer = document.getElementById('news-grid'); // Add this ID to your grid container
    let currentPage = 1; // Or offset, depending on backend
    const itemsPerPage = 3; // How many to load each time

    if (loadMoreButton && newsContainer) {
        loadMoreButton.addEventListener('click', async () => {
            loadMoreButton.textContent = 'Loading...';
            loadMoreButton.disabled = true;

            try {
                // Fetch data from JSON file (replace with actual API endpoint)
                const response = await fetch('data/news.json'); // Fetch the JSON data
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const allNews = await response.json();

                // --- Simple Pagination Simulation ---
                // Calculate start and end index for the *next* set of items
                const startIndex = newsContainer.children.length; // Assumes initial items are already in HTML
                const endIndex = startIndex + itemsPerPage;

                const newItems = allNews.slice(startIndex, endIndex);

                if (newItems.length > 0) {
                    newItems.forEach(item => {
                        const newsHTML = createNewsItemHTML(item);
                        newsContainer.insertAdjacentHTML('beforeend', newsHTML);
                    });

                    // Check if there are more items left after this load
                    if (endIndex >= allNews.length) {
                        loadMoreButton.classList.add('hidden'); // Hide button if no more items
                    } else {
                         loadMoreButton.textContent = 'Load More News';
                         loadMoreButton.disabled = false;
                    }
                } else {
                    // No more items found in the JSON data beyond the current ones
                    loadMoreButton.classList.add('hidden');
                }
                 currentPage++; // Increment page for potential future API calls

            } catch (error) {
                console.error("Could not load more news:", error);
                loadMoreButton.textContent = 'Error Loading';
                // Optionally show an error message to the user
            }
        });
    }
});