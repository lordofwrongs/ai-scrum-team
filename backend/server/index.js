const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')));

// API Routes (stubbed)
app.get('/api/tasks', (req, res) => {
  res.json([{ id: 1, title: 'Sample Task' }]);
});

app.post('/api/tasks', (req, res) => {
  res.status(201).json({ message: 'Task created' });
});

// Handle all other routes by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
