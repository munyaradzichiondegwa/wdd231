// Toggle mobile menu
document.getElementById("mobile-menu-button").addEventListener("click", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("hidden");
});

// Close the modal when the close button is clicked
document.getElementById("closeModal").addEventListener("click", function () {
    const modal = document.getElementById("programDetailsModal");
    modal.classList.add("hidden");
});

// Close the modal when the close button in the footer is clicked
document.getElementById("modalCloseButton").addEventListener("click", function () {
    const modal = document.getElementById("programDetailsModal");
    modal.classList.add("hidden");
});

// Open the modal (example function)
function openModal(programId) {
    const modal = document.getElementById("programDetailsModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalContent = document.getElementById("modalProgramContent");

    // Dummy content - replace with actual data as needed
    const programDetails = {
        1: { title: "Program Title 1", description: "Details about program 1." },
        2: { title: "Program Title 2", description: "Details about program 2." },
        3: { title: "Program Title 3", description: "Details about program 3." },
    };

    // Fetch modal content based on programId
    if (programDetails[programId]) {
        modalTitle.innerText = programDetails[programId].title;
        modalContent.innerHTML = `<p>${programDetails[programId].description}</p>`;
    } else {
        modalTitle.innerText = "Program Not Found";
        modalContent.innerHTML = "<p>No details available for this program.</p>";
    }

    modal.classList.remove("hidden");
}

// Example: Open the modal when an item is clicked (add event listeners to actual elements)
document.querySelectorAll('.link-item').forEach(item => {
    item.addEventListener('click', function () {
        const programId = this.getAttribute('data-program-id'); // Assume each link-item has a data attribute
        openModal(programId);
    });
});

// Hero slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = (i === index) ? 'flex' : 'none';
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Automatically change slides every 5 seconds
setInterval(nextSlide, 5000);

// Initialize the slideshow by showing the first slide
showSlide(currentSlide);