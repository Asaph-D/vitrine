import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404 - Page non trouvée</h1>
            <p className={styles.message}>Désolé, la page que vous recherchez n'existe pas.</p>
            <Link to="/" className={styles.link}>
                Retourner à l'accueil
            </Link>
        </div>
    );
};

export default NotFoundPage;
