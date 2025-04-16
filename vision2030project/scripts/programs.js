// js/programs.js

// --- Example Program Data (Could be fetched from programs.json) ---
const programData = {
    tsp: {
        title: 'Transitional Stabilisation Programme (2018-2020)',
        content: `
            <div class="space-y-4">
                <div>
                    <h4>Introduction</h4>
                    <p>The Transitional Stabilisation Programme (TSP) was Zimbabwe's short-term economic recovery plan, implemented from October 2018 to December 2020. The TSP aimed to stabilize the economy, restore confidence, and lay the foundation for sustainable growth.</p>
                </div>
                <div>
                    <h4>Strategic Objectives</h4>
                    <ul>
                        <li>Macroeconomic Stability: Restore fiscal and monetary stability.</li>
                        <li>Fiscal Consolidation: Reduce fiscal deficits and improve public financial management.</li>
                        <li>Structural Reforms: Improve the business environment and attract investment.</li>
                        <li>Social Protection: Protect vulnerable groups.</li>
                        <li>Productivity and Growth: Stimulate key sectors.</li>
                    </ul>
                </div>
                <div>
                    <h4>Key Focus Areas</h4>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="info-box"><h5>Fiscal Consolidation</h5><p>Reducing government expenditure.</p></div>
                        <div class="info-box"><h5>Monetary Reforms</h5><p>Introducing a new currency.</p></div>
                        <div class="info-box"><h5>Structural Reforms</h5><p>Simplifying business registration.</p></div>
                        <div class="info-box"><h5>Social Protection</h5><p>Expanding safety nets.</p></div>
                    </div>
                </div>
                <div>
                    <h4>Key Achievements</h4>
                     <ul>
                        <li>Reduced inflation significantly.</li>
                        <li>Reduced fiscal deficit.</li>
                        <li>Introduced the Zimbabwe Dollar.</li>
                        <li>Expanded social safety nets.</li>
                    </ul>
                </div>
                 <div>
                    <h4>Challenges & Lessons</h4>
                     <p>Implementation delays, public resistance, and COVID-19 disruptions were key challenges. Lessons included the need for better communication and stakeholder buy-in.</p>
                </div>
            </div>
        `
    },
    nds1: {
        title: 'National Development Strategy 1 (2021-2025)',
        content: `
             <div class="space-y-4">
                <div>
                    <h4>Introduction</h4>
                    <p>NDS1 is a medium-term plan focused on accelerating economic growth and creating a foundation for sustainable development, building on the successes of the TSP.</p>
                </div>
                <div>
                    <h4>Strategic Objectives</h4>
                    <ul>
                        <li>Achieve average annual economic growth of 5%.</li>
                        <li>Create over 760,000 formal jobs.</li>
                        <li>Reduce poverty levels.</li>
                        <li>Improve infrastructure and social services.</li>
                    </ul>
                </div>
                 <div>
                    <h4>Key Focus Areas (14 National Priorities)</h4>
                     <p>Includes Economic Growth & Stability, Food Security, Infrastructure, Governance, Human Capital Development, Health, Environmental Protection, Digital Economy, etc.</p>
                     <div class="info-box"><p>Focus on value addition and beneficiation across sectors like agriculture and mining.</p></div>
                </div>
                 <div>
                    <h4>Key Achievements (Mid-Term)</h4>
                     <ul>
                        <li>Positive GDP growth recorded.</li>
                        <li>Significant infrastructure projects underway (roads, dams).</li>
                        <li>Improved agricultural output through targeted programs.</li>
                    </ul>
                </div>
            </div>
        `
    },
    nds2: {
        title: 'National Development Strategy 2 (2026-2030)',
        content: `
             <div class="space-y-4">
                <div>
                    <h4>Introduction</h4>
                    <p>NDS2 will be the final phase towards achieving Vision 2030. It will focus on consolidating the gains of NDS1 and accelerating Zimbabwe's transformation into an upper middle-income economy.</p>
                </div>
                <div>
                    <h4>Expected Objectives</h4>
                    <ul>
                        <li>Sustain high economic growth (potentially targeting 7%+ annually).</li>
                        <li>Achieve upper middle-income status (GNI per capita targets).</li>
                        <li>Further reduce poverty and inequality.</li>
                        <li>Deepen structural transformation and industrialization.</li>
                        <li>Strengthen democratic institutions and governance.</li>
                    </ul>
                </div>
                 <div>
                    <h4>Anticipated Focus Areas</h4>
                     <p>Likely to build on NDS1 priorities with increased emphasis on innovation, technology, green economy principles, and global competitiveness.</p>
                     <div class="info-box"><p>Details will be formulated closer to the implementation period based on NDS1 outcomes.</p></div>
                </div>
            </div>
        `
    }
};


document.addEventListener('DOMContentLoaded', () => {
    // --- Program Details Modal ---
    const modal = document.getElementById('programDetailsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalContent'); // Changed ID to match HTML
    const closeModalButton = document.getElementById('closeModal');
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn'); // Add this class to your buttons

    const openModal = (programId) => {
        const data = programData[programId];
        if (data && modal && modalTitle && modalBody) {
            modalTitle.textContent = data.title;
            modalBody.innerHTML = data.content; // Use innerHTML as content includes HTML tags
            modal.classList.add('open');
        } else {
            console.error('Modal elements or program data not found for:', programId);
            // Optionally show a default error message in the modal
            modalTitle.textContent = 'Error';
            modalBody.innerHTML = '<p>Details for this program could not be loaded.</p>';
            modal.classList.add('open');
        }
    };

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('open');
        }
    };

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Get program ID from a data attribute (e.g., data-program="tsp")
            const programId = button.getAttribute('data-program');
            if (programId) {
                openModal(programId);
            }
        });
    });

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Close modal if clicking outside the content area
    if (modal) {
        modal.addEventListener('click', (e) => {
            // Check if the click is directly on the modal backdrop
            if (e.target === modal) {
                closeModal();
            }
        });
    }

     // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
            closeModal();
        }
    });

});