const Task = require("../models/Task.js");

const getTasks = async (req, res) => {
    const tasks = await Task.find({user: req.user.id});
    res.json(tasks);
};

const createTask = async (req, res) => {
    const {title, description} = req.body;

    const task = new Task({
        title,
        description,
        user: req.user.id
    });

    const createdTask = await task.save();
    res.json(201).json(createdTask);
};

const updateTask = async (req, res) => {
    const {id} = req.params;
    const task = await Task.findById(id);
    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }
    if (task.user.toString() !== req.user.id) {
        return res.status(401).json({
            message: "Not authorized"
        });
    }
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.completed = req.body.completed ?? task.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
};

const deletetask = async (req, res) => {
    const {id} = req.params;

    const task = await Task.findById(id);
    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }
    if (task.user.toString() !== req.user.id) {
        return
    }
}