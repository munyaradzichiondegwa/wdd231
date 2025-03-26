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
            // Additional form validation can be added here
            console.log('Form submitted');
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

// Optimize JavaScript Execution
class MembershipForm {
    constructor() {
        this.form = document.getElementById('membershipForm');
        this.init();
    }

    init() {
        // Use requestAnimationFrame for non-critical rendering
        requestAnimationFrame(() => {
            this.addEventListeners();
            this.setTimestamp();
        });
    }

    addEventListeners() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this), { passive: true });
        }
    }

    setTimestamp() {
        const timestampField = document.getElementById('timestamp');
        if (timestampField) {
            timestampField.value = new Date().toISOString();
        }
    }

    handleSubmit(event) {
        // Validate form before submission
        if (this.validateForm()) {
            // Allow submission
            return true;
        }
        event.preventDefault();
    }

    validateForm() {
        // Basic client-side validation
        const requiredFields = this.form.querySelectorAll('[required]');
        return Array.from(requiredFields).every(field => field.value.trim() !== '');
    }
}

// Lazy initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    new MembershipForm();
});