import express from 'express';
import {
    createTask, deleteAllTasks, deleteTask, getAllTasks, getCurrentUserTasks, updateTask,
} from '../controllers/taskController.js';

const router = express.Router();


router.post('/', createTask);
router.get('/all', getAllTasks);
router.put('/:taskId', updateTask);
router.get('/myTasks', getCurrentUserTasks);
router.delete('/deleteAll', deleteAllTasks);
router.delete('/:taskId', deleteTask);

export default router;