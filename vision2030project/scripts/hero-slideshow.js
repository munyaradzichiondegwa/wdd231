document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const slideTracker = document.createElement('div');
    slideTracker.classList.add('slide-tracker');
    
    let currentSlide = 0;
    let slideInterval;

    // Add slide tracker to the hero section
    const heroSection = document.getElementById('home');
    heroSection.appendChild(slideTracker);

    // Create tracking bars
    slides.forEach((slide, index) => {
        const bar = document.createElement('div');
        bar.classList.add('slide-bar');
        if (index === 0) bar.classList.add('active');
        slideTracker.appendChild(bar);
    });

    const slideBars = document.querySelectorAll('.slide-bar');

    function showSlide(index) {
        // Remove active classes from all slides and bars
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        slideBars.forEach(bar => {
            bar.classList.remove('active');
        });

        // Add active classes to current slide and bar
        slides[index].classList.add('active');
        slideBars[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        // Clear any existing interval
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        // Start new interval
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Initial setup
    slides.forEach((slide, index) => {
        slide.style.backgroundSize = 'cover';
        slide.style.backgroundPosition = 'center';
    });

    // Initial slide setup
    showSlide(0);
    startSlideshow();

    // Optional: Click on tracking bars to navigate
    slideBars.forEach((bar, index) => {
        bar.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            // Reset the interval when manually changing slides
            startSlideshow();
        });
    });

    // Pause slideshow on hover (optional)
    slideTracker.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    slideTracker.addEventListener('mouseleave', () => {
        startSlideshow();
    });
});