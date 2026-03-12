// ============================================
// Exercise 1: Student Marks Calculator
// ES6 Features: let, const, Arrow Functions, Template Literals
// ============================================

// Declare variables using 'let' and 'const'
let studentName = "Arun";
let mark1 = 85;
let mark2 = 90;
let mark3 = 88;

// Arrow function to compute the average
const calculateAverage = (m1, m2, m3) => {
    return (m1 + m2 + m3) / 3;
}

// Calculate Total and Average
const calculateTotal = (m1, m2, m3) => {
    return m1 + m2 + m3;
}

// Display results using Template Literals
function displayResults(name, total, average) {
    const resultHTML = `
        <p><strong>Student Name:</strong> ${name}</p>
        <p><strong>Total Marks:</strong> ${total}</p>
        <p><strong>Average Marks:</strong> ${average.toFixed(2)}</p>
        <p><strong>Grade:</strong> ${getGrade(average)}</p>
    `;
    return resultHTML;
}

// Get grade based on average
function getGrade(average) {
    if (average >= 90) return 'A+';
    if (average >= 80) return 'A';
    if (average >= 70) return 'B';
    if (average >= 60) return 'C';
    if (average >= 50) return 'D';
    return 'F';
}

// Event Listener for Calculate Button
document.getElementById('calculateBtn').addEventListener('click', () => {
    // Get values from input fields
    const name = document.getElementById('studentName').value || "Student";
    const m1 = parseFloat(document.getElementById('mark1').value) || 0;
    const m2 = parseFloat(document.getElementById('mark2').value) || 0;
    const m3 = parseFloat(document.getElementById('mark3').value) || 0;

    // Calculate
    const total = calculateTotal(m1, m2, m3);
    const average = calculateAverage(m1, m2, m3);

    // Display results
    const resultCard = document.getElementById('result-display');
    resultCard.className = 'result-card success';
    resultCard.innerHTML = displayResults(name, total, average);

    // Update console
    console.log(`Student Name: ${name}`);
    console.log(`Total Marks: ${total}`);
    console.log(`Average Marks: ${average.toFixed(2)}`);
});

// Initialize with default values
document.addEventListener('DOMContentLoaded', () => {
    const resultCard = document.getElementById('result-display');
    const total = calculateTotal(mark1, mark2, mark3);
    const average = calculateAverage(mark1, mark2, mark3);
    resultCard.className = 'result-card success';
    resultCard.innerHTML = displayResults(studentName, total, average);
});