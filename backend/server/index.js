const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React frontend's build folder
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')));

// API routes (stub endpoints)
app.get('/api/tasks', (req, res) => {
  res.json([{ id: 1, description: 'Learn Full Stack Development', completed: false }]);
});

app.post('/api/tasks', (req, res) => {
  res.status(201).json({ message: 'Task created' });
});

// For any other routes, serve the frontend's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
