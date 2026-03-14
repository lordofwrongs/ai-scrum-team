const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// API Routes (stub endpoints)
app.get('/api/tasks', (req, res) => {
  // In a real app, this would fetch tasks from a database
  res.json([
    { id: 1, title: 'Learn React', completed: false },
    { id: 2, title: 'Build Task Manager', completed: false }
  ]);
});

app.post('/api/tasks', (req, res) => {
  const newTask = { id: Date.now(), ...req.body };
  res.status(201).json(newTask);
});

// Serve frontend build files
const buildPath = path.join(__dirname, '..', 'frontend', 'build');
app.use(express.static(buildPath));

// For any other route, serve the frontend index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
