import Task from '../models/Task.js';
import createError from '../utils/error.js';

// for creating task
export const createTask = async (req, res, next) => {
    const newTask = new Task({
        title: req.body.title,
        user: req.user.id,
        completed: req.body.completed,
    });
    try {
        const savedTask = await newTask.save();
        return res.status(200).json(savedTask);
    } catch (err) {
        return next(err);
    }
};

// for updating task
export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.taskId).exec();
        if (!task) return next(createError({ status: 404, message: 'Task not found' }));
        if (task.user.toString() !== req.user.id) {
            return next(createError({ status: 401, message: "It's not your todo..." }));
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, {
            title: req.body.title,
            completed: req.body.completed,
        }, { 
            new: true 
        });
        return res.status(200).json({updatedTask, message:"Task updated suceesfully !!"});
    } catch (err) {
         return next(err);
    }
};

// getting all tasks...
export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json(tasks);
    } catch (err) {
        return next(err);
    }
};

// getting current user's task...
export const getCurrentUserTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        return res.status(200).json(tasks);
    } catch (err) {
        return next(err);
    }
};
  

// for deleting any task...
export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (task.user === req.user.id) {
            return next(createError({ status: 401, message: "It's not your todo." }));
        }
        await Task.findByIdAndDelete(req.params.taskId);
        return res.json('Task Deleted Successfully');
    } catch (err) {
        return next(err);
    }
};


// for deleting all the tasks
export const deleteAllTasks = async (req, res, next) => {
    try {
        await Task.deleteMany({ user: req.user.id });
        return res.json('All Todos Deleted Successfully');
    } catch (err) {
        return next(err);
    }
};