// js/resources.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Feedback Form Handling ---
    const feedbackForm = document.getElementById('feedbackForm');
    const formMessage = document.createElement('p'); // Create element for messages
    formMessage.id = 'form-message';
    feedbackForm?.parentNode.insertBefore(formMessage, feedbackForm.nextSibling); // Insert after form

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default browser submission
            formMessage.textContent = ''; // Clear previous messages
            formMessage.className = ''; // Clear previous classes

            // --- Basic Validation ---
            const name = feedbackForm.elements['name'].value.trim();
            const email = feedbackForm.elements['email'].value.trim();
            const subject = feedbackForm.elements['subject'].value.trim();
            const message = feedbackForm.elements['message'].value.trim();
            let isValid = true;

            if (!name) {
                isValid = false;
                // Add error indication (e.g., border color)
                 feedbackForm.elements['name'].style.borderColor = 'red';
            } else {
                 feedbackForm.elements['name'].style.borderColor = ''; // Reset
            }
            if (!email || !/^\S+@\S+\.\S+$/.test(email)) { // Simple email regex
                isValid = false;
                 feedbackForm.elements['email'].style.borderColor = 'red';
            } else {
                 feedbackForm.elements['email'].style.borderColor = '';
            }
             if (!subject) {
                isValid = false;
                 feedbackForm.elements['subject'].style.borderColor = 'red';
            } else {
                 feedbackForm.elements['subject'].style.borderColor = '';
            }
            if (!message) {
                isValid = false;
                 feedbackForm.elements['message'].style.borderColor = 'red';
            } else {
                 feedbackForm.elements['message'].style.borderColor = '';
            }

            if (!isValid) {
                 formMessage.textContent = 'Please fill in all required fields correctly.';
                 formMessage.classList.add('error');
                 return; // Stop submission
            }

            // --- Simulate Submission ---
            const submitButton = feedbackForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            const formData = {
                name: name,
                email: email,
                subject: subject,
                message: message,
                subscribe: feedbackForm.elements['subscribe'].checked
            };

            console.log('Form Data Submitted (Simulation):', formData);

            // Simulate network delay
            setTimeout(() => {
                // Simulate success
                formMessage.textContent = 'Thank you for your feedback!';
                formMessage.classList.add('success');
                feedbackForm.reset(); // Clear the form
                // Reset border colors
                feedbackForm.querySelectorAll('input, textarea').forEach(el => el.style.borderColor = '');

                submitButton.textContent = 'Submit Feedback';
                submitButton.disabled = false;

                // Hide success message after a few seconds
                setTimeout(() => {
                     formMessage.textContent = '';
                     formMessage.className = '';
                }, 5000);

            }, 1500); // 1.5 second delay

            // In a real scenario, you would use fetch() here to send `formData`
            // to your backend endpoint.
            /*
            fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                formMessage.textContent = 'Thank you for your feedback!';
                formMessage.classList.add('success');
                feedbackForm.reset();
                // Reset styles and button state
            })
            .catch((error) => {
                console.error('Error:', error);
                formMessage.textContent = 'Submission failed. Please try again.';
                formMessage.classList.add('error');
                // Reset button state
            });
            */
        });
    }

     // --- Download Buttons (If they need JS, e.g., tracking) ---
     // Currently, they are simple buttons/links. If you needed to track downloads:
     /*
     document.querySelectorAll('.resource-footer button').forEach(button => {
         button.addEventListener('click', () => {
             const resourceName = button.closest('.resource-item').querySelector('h3').textContent;
             console.log(`Download initiated for: ${resourceName}`);
             // Add analytics tracking here if needed
             // The actual download should be handled by an <a> tag wrapping the button or a direct link
         });
     });
     */
});