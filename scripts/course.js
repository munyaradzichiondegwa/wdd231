const courses = [
    {
        code: "CSE 110",
        name: "Introduction to Programming",
        credits: 2,
        completed: true,
        category: "CSE"
    },
    {
        code: "WDD 130",
        name: "Web Fundamentals",
        credits: 2,
        completed: true,
        category: "WDD"
    },
    {
        code: "CSE 111",
        name: "Programming with Functions",
        credits: 2,
        completed: true,
        category: "CSE"
    },
    {
        code: "WDD 131",
        name: "Dynamic Web Pages",
        credits: 2,
        completed: true,
        category: "WDD"
    },
    {
        code: "CSE 210",
        name: "Programming with Classes",
        credits: 2,
        completed: true,
        category: "CSE"
    },
    {
        code: "WDD 231",
        name: "Responsive Web Design",
        credits: 2,
        completed: false,
        category: "WDD"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const coursesContainer = document.getElementById('courses-container');
    const totalCreditsSpan = document.getElementById('total-credits');
    const btnAll = document.getElementById('btn-all');
    const btnCSE = document.getElementById('btn-cse');
    const btnWDD = document.getElementById('btn-wdd');

    function displayCourses(courseList) {
        // Clear existing courses
        coursesContainer.innerHTML = '';

        // Create course buttons
        courseList.forEach(course => {
            const courseButton = document.createElement('div');
            courseButton.classList.add('course-button');
            
            // Add styling based on completion and category
            if (course.completed) {
                courseButton.classList.add('brown');
            } else {
                courseButton.classList.add('white');
            }

            // Set course button content
            courseButton.textContent = course.code;

            // Append to container
            coursesContainer.appendChild(courseButton);
        });

        // Calculate and display total credits
        const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsSpan.textContent = totalCredits;
    }

    // Initial display of all courses
    displayCourses(courses);

    // Filter event listeners
    btnAll.addEventListener('click', () => {
        displayCourses(courses);
        updateActiveButton(btnAll);
    });
    
    btnCSE.addEventListener('click', () => {
        const cseCourses = courses.filter(course => course.category === 'CSE');
        displayCourses(cseCourses);
        updateActiveButton(btnCSE);
    });
    
    btnWDD.addEventListener('click', () => {
        const wddCourses = courses.filter(course => course.category === 'WDD');
        displayCourses(wddCourses);
        updateActiveButton(btnWDD);
    });

    // Update active button styling
    function updateActiveButton(activeButton) {
        [btnAll, btnCSE, btnWDD].forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
});