document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('programDetailsModal');
    const closeModal = document.getElementById('closeModal');

    function showProgramDetails(program) {
        // Fetch program details from JSON or predefined content
        // Update modal content
        modal.classList.remove('hidden');
    }

    closeModal?.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Attach event listeners to program detail buttons
    document.querySelectorAll('[data-program]').forEach(button => {
        button.addEventListener('click', () => {
            showProgramDetails(button.dataset.program);
        });
    });
});