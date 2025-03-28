document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('programDetailsModal');
    const closeModal = document.getElementById('closeModal');

    function showProgramDetails(program) {
        // Fetch program details from JSON or predefined content
        // Update modal content dynamically
        modal.classList.remove('hidden');
        modal.classList.add('visible');
    }

    function hideModal() {
        modal.classList.remove('visible');
        modal.classList.add('hidden');
    }

    closeModal?.addEventListener('click', hideModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Optional: Add escape key to close modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideModal();
        }
    });

    // Attach event listeners to program detail buttons
    document.querySelectorAll('[data-program]').forEach(button => {
        button.addEventListener('click', () => {
            showProgramDetails(button.dataset.program);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('programDetailsModal');
    const closeModal = document.getElementById('closeModal');
    const modalCloseButton = document.getElementById('modalCloseButton');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalProgramContent');

    // Predefined program details (you can expand this or fetch from an API)
    const programDetails = {
        'economic-transformation': {
            title: 'Economic Transformation',
            description: `
                <p>Our economic transformation strategy focuses on:</p>
                <ul>
                    <li>Macroeconomic stability and policy reforms</li>
                    <li>Attracting foreign and domestic investments</li>
                    <li>Diversifying economic sectors</li>
                    <li>Enhancing productivity and competitiveness</li>
                </ul>
            `
        },
        'sector-development': {
            title: 'Sector Development',
            description: `
                <p>Key sectors targeted for development include:</p>
                <ul>
                    <li>Agriculture and agro-processing</li>
                    <li>Mining and beneficiation</li>
                    <li>Manufacturing</li>
                    <li>Tourism and hospitality</li>
                    <li>Digital economy</li>
                </ul>
            `
        },
        'global-positioning': {
            title: 'Global Positioning',
            description: `
                <p>Strategies for enhancing Zimbabwe's global economic standing:</p>
                <ul>
                    <li>Improving international trade relationships</li>
                    <li>Attracting foreign direct investment</li>
                    <li>Participating in regional economic integration</li>
                    <li>Promoting Zimbabwe's unique economic potential</li>
                </ul>
            `
        }
    };

    function showProgramDetails(programKey) {
        const program = programDetails[programKey];
        
        if (program) {
            modalTitle.textContent = program.title;
            modalContent.innerHTML = program.description;
            
            modal.classList.remove('hidden');
            modal.classList.add('visible');
        }
    }

    function hideModal() {
        modal.classList.remove('visible');
        modal.classList.add('hidden');
    }

    // Close modal buttons
    closeModal?.addEventListener('click', hideModal);
    modalCloseButton?.addEventListener('click', hideModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Close modal with Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideModal();
        }
    });

    // Attach event listeners to program detail buttons in Quick Links section
    document.querySelectorAll('[data-program]').forEach(button => {
        button.addEventListener('click', () => {
            showProgramDetails(button.dataset.program);
        });
    });

    // Add data-program attributes to Quick Links section
    const quickLinks = document.querySelectorAll('.bg-gray-100');
    quickLinks[0].setAttribute('data-program', 'economic-transformation');
    quickLinks[1].setAttribute('data-program', 'sector-development');
    quickLinks[2].setAttribute('data-program', 'global-positioning');
});