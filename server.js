const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/taskPlanner', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Task Schema and Model
const taskSchema = new mongoose.Schema({
    taskName: String,
    taskDescription: String,
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'low' },
    reminderDate: String,
    reminderTime: String,
    customColor: String,
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new task
app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body); // Create a new task document
        const savedTask = await task.save(); // Save to MongoDB
        res.status(201).json(savedTask); // Respond with saved task
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Fetch all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find(); // Retrieve all tasks
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    taskList.innerHTML = localStorage.getItem("tasks") || '';
}

window.onload = loadTasks;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const multer = require('multer');
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from the 'uploads' directory

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    }
});

const upload = multer({ storage: storage });

// Update Task Schema to include profilePicture field
taskSchema.add({
    profilePicture: String // Add profilePicture field
});

// Update Routes
app.post('/tasks', upload.single('profilePicture'), async (req, res) => {
    const task = new Task({
        taskName: req.body.taskName,
        taskDescription: req.body.taskDescription,
        priority: req.body.priority,
        reminderDate: req.body.reminderDate,
        reminderTime: req.body.reminderTime,
        customColor: req.body.customColor,
        profilePicture: req.file ? `/uploads/${req.file.filename}` : null // Save the file path
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch'); // Define a storage directory
