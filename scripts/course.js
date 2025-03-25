document.addEventListener("DOMContentLoaded", () => { 
    // List of courses
    const courses = [
        { code: "CSE 110", category: "CSE", completed: true },
        { code: "WDD 130", category: "WDD", completed: true },
        { code: "CSE 111", category: "CSE", completed: true },
        { code: "CSE 210", category: "CSE", completed: true },
        { code: "WDD 131", category: "WDD", completed: true },
        { code: "WDD 231", category: "WDD", completed: false }
    ];

    const courseContainer = document.getElementById("courses-container");
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    const totalCreditsSpan = document.getElementById("total-credits");

    // Function to calculate and update total credits
    function calculateTotalCredits(filteredCourses) {
        const completedCourses = filteredCourses.filter(course => course.completed);
        const totalCredits = completedCourses.length * 2; // Each completed course is 2 credits
        totalCreditsSpan.textContent = totalCredits;
    }

    // Function to display courses based on the filter
    function displayCourses(filter) {
        courseContainer.innerHTML = "";
        const filteredCourses = filter === "All" ? courses : courses.filter(course => course.category === filter);

        // Update total credits
        calculateTotalCredits(filteredCourses);

        filteredCourses.forEach(course => {
            const courseDiv = document.createElement("div");
            courseDiv.classList.add("course-card", course.completed ? "completed" : "not-completed");

            const courseTitle = document.createElement("h3");
            courseTitle.textContent = course.code;

            const courseStatus = document.createElement("p");
            courseStatus.textContent = course.completed ? "Completed" : "In Progress";

            courseDiv.appendChild(courseTitle);
            courseDiv.appendChild(courseStatus);
            courseContainer.appendChild(courseDiv);
        });
    }

    // Event listeners for the filter buttons
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector(".filter-buttons .active")?.classList.remove("active");
            button.classList.add("active");
            displayCourses(button.textContent);
        });
    });

    // Initialize with all courses
    displayCourses("All");

    // Array of items to add to the course list
    const items = [
        "About Me",
        "White Water Rafting Project",
        "Temples Album",
        "Places",
        "The Community Garden Hub project"
    ];

    // Function to add an item dynamically to the list
    function addItemToList(item) {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        document.getElementById("course-list").appendChild(listItem);
    }

    // Function to load predefined items when the page loads
    function loadItems() {
        items.forEach(item => addItemToList(item));
    }

    // Event listener for the "Add New Item" button
    document.getElementById("add-item-btn").addEventListener("click", function() {
        const newItem = prompt("Enter a new item:");
        if (newItem) {
            addItemToList(newItem);
        }
    });

    // Initialize the page by loading the predefined items
    loadItems();
});

function displayCourseDetails(course) {
  courseDetails.innerHTML = '';
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
  courseDetails.showModal();
  
  closeModal.addEventListener("click", () => {
    courseDetails.close();
  });
}

courseDiv.addEventListener('click', () => {
      displayCourseDetails(course);
    });
