import React from "react";
import StudentProfile from "./StudentProfile";
import StudentCard from "./StudentCard";
import Counter from "./Counter";

function App() {
  return (
    <div>
      <h1>React Lab Exercises</h1>

      {/* Exercise 1 */}
      <StudentProfile />

      <hr />

      {/* Exercise 2 */}
      <h2>Student Cards</h2>
      <StudentCard name="Arun" department="CSE" marks="85" />
      <StudentCard name="Priya" department="ECE" marks="90" />
      <StudentCard name="Rahul" department="IT" marks="88" />

      <hr />

      {/* Exercise 3 */}
      <Counter />
    </div>
  );
}

export default App;