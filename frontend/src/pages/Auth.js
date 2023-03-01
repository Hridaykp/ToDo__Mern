import React from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Layout from '../components/Layout';
import styles from './Auth.module.scss';
// import useAuth from '../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';


export default function Auth() {
    // const { auth } = useAuth();
    // const navigate = useNavigate();
    // useEffect(()=>{
    //     if(auth){ navigate('/')}
    // }, [auth, navigate]);

    return (
        <Layout>
            <div className={styles.form_container}>
                <Login/>
                <Register/>
            </div>
        </Layout>
    )
}
