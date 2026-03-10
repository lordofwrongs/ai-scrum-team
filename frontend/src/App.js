import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newTask }),
        });
        const addedTask = await response.json();
        setTasks([...tasks, addedTask]);
        setNewTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const completeTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}/complete`, {
        method: 'PUT',
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditedText(task.text);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditedText('');
  };

  const updateTask = async (id) => {
    if (editedText.trim()) {
      try {
        const response = await fetch(`/api/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: editedText }),
        });
        const updatedTask = await response.json();
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
        setEditingTask(null);
        setEditedText('');
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Task Management</h1>
      <div className="input-area">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            {editingTask === task.id ? (
              <div className="edit-area">
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={() => updateTask(task.id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <div className="task-content">
                <span>{task.text}</span>
                <div className="task-actions">
                  <button onClick={() => completeTask(task.id)}>{task.completed ? 'Undo' : 'Complete'}</button>
                  <button onClick={() => startEditing(task)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
