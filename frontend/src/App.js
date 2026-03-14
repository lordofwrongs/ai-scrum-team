import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <p>Welcome to your task management application!</p>
      </header>
      <main>
        {/* Task list and form will go here */}
        <section>
          <h2>My Tasks</h2>
          <p>Task 1</p>
          <p>Task 2</p>
        </section>
      </main>
    </div>
  );
}

export default App;
