document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('home');
    const heroContent = heroSection.querySelector('.container');

    const heroBackgrounds = [
        'zimbabwe-landscape.jpg',
        'economic-development.jpg',
        'infrastructure-project.jpg'
    ];

    let currentBackground = 0;

    function changeBackground() {
        heroSection.style.backgroundImage = `
            linear-gradient(135deg, rgba(0, 166, 77, 0.1), rgba(252, 221, 9, 0.1)), 
            url('../images/${heroBackgrounds[currentBackground]}')
        `;
        
        // Subtle content animations
        heroContent.classList.add('animate__animated', 'animate__fadeIn');
        
        setTimeout(() => {
            heroContent.classList.remove('animate__animated', 'animate__fadeIn');
        }, 1000);

        currentBackground = (currentBackground + 1) % heroBackgrounds.length;
    }

    // Change background every 5 seconds
    setInterval(changeBackground, 5000);
});
