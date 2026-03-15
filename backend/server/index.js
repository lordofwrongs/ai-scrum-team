const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// --- API Routes (Stubbed) ---
app.get('/api/todos', (req, res) => {
  // In a real app, fetch todos from the database
  res.json([{ id: 1, task: 'Learn React', completed: false }]);
});

app.post('/api/todos', (req, res) => {
  // In a real app, save the new todo to the database
  console.log('Received new todo:', req.body);
  res.status(201).json({ message: 'Todo created successfully', ...req.body });
});

// --- Serve Frontend Build --- 
// This assumes your frontend build will be in a 'build' directory at the root of your project.
// If not, adjust the path accordingly. On Render, this path is typically relative to your backend.
const buildPath = path.join(__dirname, '..', 'frontend', 'build');

// Serve static files from the frontend build directory
app.use(express.static(buildPath));

// Handle all other routes by serving the index.html file
// This is crucial for single-page applications (SPAs) like React apps
// to handle client-side routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});