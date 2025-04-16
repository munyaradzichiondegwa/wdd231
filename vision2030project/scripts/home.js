// js/home.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Hero Slideshow ---
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    if (slides.length > 1) {
        showSlide(currentSlide); // Show the first slide initially
        setInterval(nextSlide, slideInterval);
    } else if (slides.length === 1) {
         showSlide(0); // Ensure the single slide is active
    }

    // --- Progress Bars (Static Example) ---
    // If data was dynamic, you'd fetch it here and update widths
    // Example: Set widths based on existing inline styles or data attributes
    document.querySelectorAll('.progress-bar-fill').forEach(bar => {
        const width = bar.style.width; // Get width from inline style added in HTML
        if (width) {
            // Optional: Animate on load or scroll into view
            // For simplicity, we rely on the CSS transition
            bar.style.width = width;
        }
    });
});