document.addEventListener('DOMContentLoaded', () => {
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function showSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }

    // Start slideshow
    if (heroSlides.length > 0) {
        showSlide(0);
        setInterval(nextSlide, 5000);
    }
});

    document.addEventListener("DOMContentLoaded", function() {
        const slides = document.querySelectorAll('.hero-slide');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active'); // Make active slide visible
                } else {
                    slide.classList.remove('active'); // Hide other slides
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length; // Cycle through slides
            showSlide(currentSlide);
        }

        showSlide(currentSlide); // Show first slide
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    });
