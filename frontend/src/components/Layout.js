import React from 'react';
import styles from './Layout.module.scss';

function Layout({ children }) {
    return (
        <main className={styles.container}> {children} </main>
    );
}

export default Layout;