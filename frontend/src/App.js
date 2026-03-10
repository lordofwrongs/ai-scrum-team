import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (e) {
      console.error("Failed to fetch tasks:", e);
      setError("Could not load tasks.");
      setTasks([]);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTask }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNewTask('');
      fetchTasks();
      setError(null);
    } catch (e) {
      console.error("Failed to add task:", e);
      setError("Could not add task.");
    }
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <div className="add-task">
          <input
            type="text"
            value={newTask}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task"
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <ul className="task-list">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <li key={task.id} className="task-item">
                {task.title}
              </li>
            ))
          ) : (
            !error && <li>No tasks yet.</li>
          )}
        </ul>
      </header>
    </div>
  );
}

export default App;
