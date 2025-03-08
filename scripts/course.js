const certCourses = [
    { name: 'CSE 110', credits: 2, completed: true },
    { name: 'WDD 130', credits: 2, completed: true },
    { name: 'CSE 111', credits: 2, completed: true },
    { name: 'WDD 131', credits: 2, completed: true },
    { name: 'CSE 220', credits: 2, completed: true },
    { name: 'WDD 231', credits: 2, completed: false },
];

function renderCourses(filter = 'all') {
    const container = document.getElementById('cert-course-list');
    const filteredCourses = certCourses.filter(course => 
        filter === 'all' ? true : course.name.startsWith(filter)
    );

    container.innerHTML = filteredCourses.map(course => `
        <div class="course-card ${course.completed ? 'completed' : ''}">
            <h3>${course.name}</h3>
            <p>Credits: ${course.credits}</p>
            <p>${course.completed ? '✅ Completed' : '⏳ In Progress'}</p>
        </div>
    `).join('');

    // Update credit total
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.querySelector('.credits-summary').textContent = `Total Credits: ${totalCredits}`;
}

// Filter buttons
document.querySelectorAll('#course-filters button').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('#course-filters button').forEach(btn => 
            btn.classList.remove('active'));
        e.target.classList.add('active');
        renderCourses(e.target.dataset.filter);
    });
});

// Initial render
renderCourses();