import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import styles from './TaskItem.module.scss';

function TaskItem({ task, deleteTask }) {
    const [isCompleted, setIsCompleted] = useState(task.completed);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckboxClick = async () => {
        try {
            setIsLoading(true);
            await axios.put(`/api/tasks/${task._id}`, {
                completed: !isCompleted,
            });
            setIsCompleted(!isCompleted);
            toast.success(`Task updated successfuly !!`);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <tr className={styles.task_item}>
            <td className={styles.task_name}>
                <div className={styles.checkbox} onChange={handleCheckboxClick} role="checkbox" aria-checked>
                    <input type="checkbox" checked={isCompleted} disabled={isLoading} readOnly tabIndex={-1} />
                </div>
                <p>{task.title}</p>
            </td>
            <td>{isCompleted ? 'Complete' : 'Incomplete'}</td>
            <td>{moment(task.createdAt).format('Do MMM YYYY')}</td>
            <td>
                <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => deleteTask(task._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default TaskItem;