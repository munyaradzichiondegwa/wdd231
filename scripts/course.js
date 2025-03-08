// course.js
const courses = [
    { title: "CSE 110", completed: true, credits: 3 },
    { title: "WDD 130", completed: true, credits: 3 },
    { title: "CSE 111", completed: true, credits: 4 },
    { title: "WDD 131", completed: true, credits: 3 },
    { title: "CSE 210", completed: true, credits: 3 },
    { title: "WDD 231", completed: false, credits: 3 },
];

// Dynamically display courses
function displayCourses(filter) {
    const courseList = document.getElementById('cert-course-list');
    courseList.innerHTML = '';
    const filteredCourses = filter === 'all' ? courses : courses.filter(course => course.title.includes(filter));
    
    filteredCourses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'course-card';
        courseDiv.style.borderLeftColor = course.completed ? 'green' : 'red';
        courseDiv.textContent = `${course.title} - ${course.completed ? 'Completed' : 'Not Completed'}`;
        courseList.appendChild(courseDiv);
    });
    
    // Calculate total credits
    const totalCredits = filteredCourses.reduce((acc, course) => acc + course.credits, 0);
    document.querySelector('.credits-summary').textContent = `Total Credits: ${totalCredits}`;
}

// Course filter button event listeners
document.querySelectorAll('#course-filters button').forEach(button => {
    button.addEventListener('click', () => {
        displayCourses(button.dataset.filter);
    });
});

// Initial load
displayCourses('all');