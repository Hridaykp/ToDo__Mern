import React from 'react'
import styles from './AuthForm.module.scss';
import axios from 'axios';
import toast from 'react-hot-toast';

function Register() {
    // eslint-disable-next-line no-unused-vars
    const register = async (e) => {
        e.preventDefault();
        const user = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };
        try {
            await axios.post('/api/auth/register', user);
            toast.success('Successfuly registered !!');
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong !!');
        }
    };
    return (
        <div className={styles.register} >
            <h1 className={styles.title}> Register</h1>
            <form className={styles.authForm} onSubmit={register}>
                <label htmlFor='name'>
                    Name
                    <input type="name" name="name" placeholder="Full Name" required />
                </label>
                <label htmlFor='email'>
                    Email
                    <input type="email" name="email" placeholder="email" required />
                </label>
                <label htmlFor='name'>
                    Password
                    <input type="password" name="password" placeholder="password" required />
                </label>
                <br/>
                <button type="submit" >Register</button>
            </form>
        </div>
    )
}

export default Register