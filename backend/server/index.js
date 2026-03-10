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
  console.log('Received task:', req.body);
  res.status(201).json({ message: 'Task created', ...req.body });
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// For any other route, serve the index.html file from the React build
// This ensures that all client-side routes are handled by React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
