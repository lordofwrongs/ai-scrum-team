const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// --- In-memory data store for tasks (replace with a database for production) ---
let tasks = [
  { id: 1, title: 'Learn React' },
  { id: 2, title: 'Build Full Stack App' },
];
let nextTaskId = 3;

// --- API Routes ---

// GET /api/tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST /api/tasks
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'Task title is required' });
  }
  const newTask = {
    id: nextTaskId++,
    title: title.trim(),
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// GET /health
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// --- Serve React Frontend ---

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')));

// Handle all other routes by serving the React index.html file
// This is crucial for React Router to work on the client side
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
