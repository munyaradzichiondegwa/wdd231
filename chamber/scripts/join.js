// Set timestamp on page load
document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Optional: Form validation
    const form = document.getElementById('membershipForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            if (!validateForm()) {
                e.preventDefault(); // Prevent submission if validation fails
            }
        });
    }
});

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// Basic client-side validation
function validateForm() {
    const form = document.getElementById('membershipForm');
    const requiredFields = form.querySelectorAll('[required]');
    return Array.from(requiredFields).every(field => field.value.trim() !== '');
}