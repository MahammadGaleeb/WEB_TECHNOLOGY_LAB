// ============================================
// Exercise 3: Course Enrollment System
// ES6 Classes & Promises
// ============================================

// Course Class Definition
class Course {
    constructor(courseName, instructor) {
        this.courseName = courseName;
        this.instructor = instructor;
        this.seatsAvailable = Math.floor(Math.random() * 5) + 1; // Random seats 1-5
        this.maxSeats = 10;
    }

    // Method to display course details
    displayCourse() {
        const details = `
            <strong>Course:</strong> ${this.courseName}<br>
            <strong>Instructor:</strong> ${this.instructor}<br>
            <strong>Seats Available:</strong> ${this.seatsAvailable}/${this.maxSeats}
        `;
        return details;
    }

    // Method to check if course is full
    isFull() {
        return this.seatsAvailable <= 0;
    }

    // Method to enroll a student
    enrollStudent() {
        if (this.seatsAvailable > 0) {
            this.seatsAvailable--;
            return true;
        }
        return false;
    }
}

// ============================================
// Promise Function for Enrollment
// ============================================

function checkEnrollment(course) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            if (course.seatsAvailable > 0) {
                resolve(`✅ Enrollment Successful for ${course.courseName}`);
            } else {
                reject(`❌ Course Full: ${course.courseName}`);
            }
        }, 1000);
    });
}

// ============================================
// Initialize Courses
// ============================================

const courses = [
    new Course("Web Technologies", "Dr. Kumar"),
    new Course("Data Structures", "Prof. Sharma"),
    new Course("Machine Learning", "Dr. Patel"),
    new Course("Cloud Computing", "Prof. Singh")
];

// ============================================
// Display Course Details
// ============================================

function displayCourseDetails(course) {
    const detailsHTML = `
        <p>${course.displayCourse()}</p>
    `;
    document.getElementById('course-details').innerHTML = detailsHTML;
}

// ============================================
// Display All Courses
// ============================================

function displayAllCourses() {
    const container = document.getElementById('courses-container');
    container.innerHTML = '';

    courses.forEach((course, index) => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        
        const statusClass = course.seatsAvailable > 0 ? 'available' : 'full';
        const statusText = course.seatsAvailable > 0 ? 
            `${course.seatsAvailable} Seats Left` : 'Course Full';

        courseCard.innerHTML = `
            <h3>${course.courseName}</h3>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
            <p><strong>Seats:</strong> ${course.seatsAvailable}/${course.maxSeats}</p>
            <span class="status ${statusClass}">${statusText}</span>
        `;

        container.appendChild(courseCard);
    });
}

// ============================================
// Handle Enrollment Button Click
// ============================================

document.getElementById('enroll-btn').addEventListener('click', async () => {
    const resultCard = document.getElementById('enrollment-result');
    const enrollBtn = document.getElementById('enroll-btn');
    
    // Show loading state
    resultCard.className = 'result-card loading';
    resultCard.innerHTML = '<p>⏳ Checking availability...</p>';
    enrollBtn.disabled = true;

    try {
        // Use the first course for demonstration
        const course = courses[0];
        const message = await checkEnrollment(course);
        
        // Update course seats
        if (course.seatsAvailable > 0) {
            course.enrollStudent();
        }

        resultCard.className = 'result-card success';
        resultCard.innerHTML = `<p>${message}</p>`;
        
        // Update course display
        displayCourseDetails(course);
        displayAllCourses();
    } catch (error) {
        resultCard.className = 'result-card error';
        resultCard.innerHTML = `<p>${error}</p>`;
    }

    enrollBtn.disabled = false;
});

// ============================================
// Handle Check Seats Button Click
// ============================================

document.getElementById('check-seats-btn').addEventListener('click', () => {
    const resultCard = document.getElementById('enrollment-result');
    
    resultCard.className = 'result-card';
    resultCard.innerHTML = '<p>🔍 Checking seat availability...</p>';

    setTimeout(() => {
        const course = courses[0];
        if (course.seatsAvailable > 0) {
            resultCard.className = 'result-card success';
            resultCard.innerHTML = `<p>✅ ${course.seatsAvailable} seats available for ${course.courseName}</p>`;
        } else {
            resultCard.className = 'result-card error';
            resultCard.innerHTML = `<p>❌ No seats available for ${course.courseName}</p>`;
        }
    }, 800);
});

// ============================================
// Initialize Page
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Display initial course details
    displayCourseDetails(courses[0]);
    
    // Display all courses
    displayAllCourses();
    
    console.log("Course Enrollment System Initialized");
    console.log("ES6 Classes & Promises Demo");
});