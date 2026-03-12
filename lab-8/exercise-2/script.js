// ============================================
// Exercise 2: Student Object with Destructuring
// ES6 Features: Object Destructuring & Spread Operator
// ============================================

// Original Student Object
const student = {
    id: 101,
    name: "Priya",
    department: "CSE",
    marks: 92
};

// Store all students
let allStudents = [student];

// Object Destructuring to extract values
const { id, name, department, marks } = student;

// Determine Grade based on marks
function calculateGrade(marks) {
    if (marks >= 90) return 'A';
    if (marks >= 80) return 'B';
    if (marks >= 70) return 'C';
    if (marks >= 60) return 'D';
    return 'F';
}

// Create new object using Spread Operator
const updatedStudent = {
    ...student,
    grade: calculateGrade(marks)
};

// Display Original Object
function displayOriginalObject() {
    const objectHTML = `
{
    id: ${student.id},
    name: "${student.name}",
    department: "${student.department}",
    marks: ${student.marks}
}
    `;
    document.getElementById('original-object').innerHTML = objectHTML;
}

// Display Extracted Values
function displayExtractedValues() {
    const extractedHTML = `
        <p><strong>ID:</strong> ${id}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Marks:</strong> ${marks}</p>
    `;
    document.getElementById('extracted-values').innerHTML = extractedHTML;
}

// Display Updated Object
function displayUpdatedObject() {
    const objectHTML = `
{
    id: ${updatedStudent.id},
    name: "${updatedStudent.name}",
    department: "${updatedStudent.department}",
    marks: ${updatedStudent.marks},
    grade: "${updatedStudent.grade}"
}
    `;
    document.getElementById('updated-object').innerHTML = objectHTML;
}

// Display All Students
function displayAllStudents() {
    const container = document.getElementById('students-container');
    container.innerHTML = '';

    allStudents.forEach((student, index) => {
        const studentCard = document.createElement('div');
        studentCard.className = 'student-card';
        
        studentCard.innerHTML = `
            <h3>${student.name}</h3>
            <p><strong>ID:</strong> ${student.id}</p>
            <p><strong>Department:</strong> ${student.department}</p>
            <p><strong>Marks:</strong> ${student.marks}</p>
            <span class="grade">Grade: ${student.grade}</span>
        `;

        container.appendChild(studentCard);
    });
}

// Add New Student
document.getElementById('addStudentBtn').addEventListener('click', () => {
    const newId = parseInt(document.getElementById('newId').value);
    const newName = document.getElementById('newName').value;
    const newDept = document.getElementById('newDept').value;
    const newMarks = parseInt(document.getElementById('newMarks').value);

    // Create new student object
    const newStudent = {
        id: newId,
        name: newName,
        department: newDept,
        marks: newMarks,
        grade: calculateGrade(newMarks)
    };

    // Add to all students
    allStudents.push(newStudent);

    // Display all students
    displayAllStudents();

    // Clear form
    document.getElementById('newId').value = '';
    document.getElementById('newName').value = '';
    document.getElementById('newDept').value = '';
    document.getElementById('newMarks').value = '';

    // Show success message
    const resultCard = document.getElementById('extracted-values');
    resultCard.innerHTML = `<p>✅ Student "${newName}" added successfully!</p>`;
});

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    displayOriginalObject();
    displayExtractedValues();
    displayUpdatedObject();
    displayAllStudents();

    console.log("Original Object:", student);
    console.log("Extracted Values:", id, name, department, marks);
    console.log("Updated Object:", updatedStudent);
});