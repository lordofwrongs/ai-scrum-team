const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// API Routes (stub endpoints)
app.get('/api/tasks', (req, res) => {
  res.json([{ id: 1, title: 'Sample Task', completed: false }]);
});

app.post('/api/tasks', (req, res) => {
  const newTask = { ...req.body, id: Date.now() };
  res.status(201).json(newTask);
});

// Serve the frontend build
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Handle all other routes by serving the index.html from the frontend build
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
