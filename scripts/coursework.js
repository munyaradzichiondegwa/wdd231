const coursework = [
    "About Me",
    "White Water Rafting Project",
    "Temples",
    "Places",
    "The Garden Community Hub Project"
];

function displayCoursework() {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '';
    const ul = document.createElement('ul');
    ul.classList.add('coursework-list');

    coursework.forEach(course => {
        const li = document.createElement('li');
        li.classList.add('coursework-item');
        li.textContent = course;
        ul.appendChild(li);
    });

    courseList.appendChild(ul);
}

document.addEventListener('DOMContentLoaded', displayCoursework);