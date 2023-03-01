import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AuthForm.module.scss';
import { toast } from 'react-hot-toast';

function Login() {
    
    const navigate = useNavigate();
      
    const login = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            await axios.post('/api/auth/login', {
                email,
                password,
            });
            navigate('/');
            toast.success('Successfuly login !!')
        } catch (err) {
            console.log(err);
            toast.error('Login failed !!')
        }
    };
    return (
        <div className={styles.register}>
            <h1 className={styles.title} >
                Login
            </h1>
            <form className={styles.authForm} onSubmit={login}>
                <label htmlFor="email">
                    Email
                    <input type="email" name='email' placeholder='email' required />
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" name='password' placeholder='password' required />
                </label>
                <button type="submit" >Login</button>
            </form>
        </div>
    )
}

export default Login; 