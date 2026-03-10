const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (replace with actual database)
let tasks = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build Backend API', completed: false },
  { id: 3, text: 'Deploy to Render', completed: false },
];
let nextId = 4;

// API Routes

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST create a new task
app.post('/api/tasks', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Task text is required' });
  }
  const newTask = {
    id: nextId++,
    text,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update a task (text)
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { text } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  if (!text) {
    return res.status(400).json({ message: 'Task text is required' });
  }

  tasks[taskIndex].text = text;
  res.json(tasks[taskIndex]);
});

// PUT mark a task as complete/incomplete
app.put('/api/tasks/:id/complete', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  res.json(tasks[taskIndex]);
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== taskId);

  if (tasks.length === initialLength) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.status(204).send(); // No content
});

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')));

// For any other request, serve the index.html file (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
