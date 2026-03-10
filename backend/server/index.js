const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')));

// API Routes (stub endpoints)
app.get('/api/tasks', (req, res) => {
  res.json({ message: 'GET /api/tasks' });
});

app.post('/api/tasks', (req, res) => {
  res.json({ message: 'POST /api/tasks' });
});

// Handle all other routes by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
