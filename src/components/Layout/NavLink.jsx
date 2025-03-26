import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NavLink.module.css';

const NavLink = ({ icon, text, to }) => (
  <Link to={to} className={styles.navLink}>
    <i className={`lucide-${icon}`}></i>
    <span>{text}</span>
  </Link>
);

export default NavLink;
