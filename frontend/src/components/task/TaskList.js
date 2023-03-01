import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import TaskItem from './TaskItem';
import styles from './TaskList.module.scss';

// for rendering list of tasks..
function TaskList() {
    const [taskList, setTaskList] = useState([]);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newTask, setNewTask] = useState('');

    // getting a task
    const getTasks = async () => {
        try {
            const { data } = await axios.get('/api/tasks/mytasks');
            setTaskList(
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
            );
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    const addNewButtonClick = () => {
        setIsAddingNew(!isAddingNew);
    };


    // add a new task..
    const addNewTask = async (e) => {
        e.preventDefault();
        if (newTask.length <= 0) {
            toast.error('Task is empty');
            return;
        }
        try {
            const { data } = await axios.post('/api/tasks/', {
                title: newTask,
            });
            toast.success('New task added');
            setIsAddingNew(false);
            setNewTask('');
            setTaskList([{ ...data }, ...taskList]);
            } catch (err) {
                console.log(err);
        }
    };

    // for deleting task..
    const deleteTask = async (id) => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            toast.success('Task deleted successfuly !!');
            setTaskList(taskList.filter((task) => task._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className={styles.topBar}>
                <button
                type="button"
                className={styles.addNew}
                onClick={addNewButtonClick}
                >
                Add new task 
                </button>
            </div>
                {isAddingNew && (
                    <form className={styles.addNewForm} onSubmit={addNewTask}>
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Task name"
                    />
                    <button type="submit">Add</button>
                    </form>
                )}
            {taskList.length > 0 ? (
                <table className={styles.taskList_table}>
                <tbody>
                    {taskList.map((task) => (
                    <TaskItem key={task._id} task={task} deleteTask={deleteTask} />
                    ))}
                </tbody>
                </table>
            ) : (
                'No Task Found. Create a new task'
            )}
        </div>
    );
}

export default TaskList;