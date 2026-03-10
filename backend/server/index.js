const express = require('express');
const cors = require('cors');
const app = express();

// For local development, allow requests from frontend's dev server
// For production, configure specific origins or use a proxy
const corsOptions = {
  origin: '*', // WARNING: In production, restrict this to your frontend's domain
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// In-memory database for demonstration purposes
// In a real application, this would be a PostgreSQL database
let tasks = [
  { id: 1, title: 'Learn React', completed: false },
  { id: 2, title: 'Build Backend API', completed: false },
  { id: 3, title: 'Deploy Application', completed: false }
];
let nextId = 4;

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST a new task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Task title is required' });
  }
  const newTask = {
    id: nextId++,
    title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update a task (toggle completion)
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const { completed } = req.body;

  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks[taskIndex].completed = completed !== undefined ? completed : tasks[taskIndex].completed;
  res.json(tasks[taskIndex]);
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== taskId);

  if (tasks.length === initialLength) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.status(204).send(); // No content to send back
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
