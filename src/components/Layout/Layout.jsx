// Layout.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, ShoppingBag, Instagram, Facebook } from 'lucide-react';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/cakes', label: 'Gâteaux' },
    { path: '/beverages', label: 'Boissons' },
    { path: '/gifts', label: 'Cadeaux' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.contactBar}>
        <div className={styles.contactInfo}>
          <Phone size={16} />
              <span>(+237) 690 282 207 /  695 153 141</span>
        </div>
        <div className={styles.location}>
          <MapPin size={16} />
          <span>Ouest | Littorale</span>
        </div>
      </div>
      
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContent}>
          <Link to="/" className={styles.logoContainer}>
            <h1 className={styles.title}>Pro Dan Cakes</h1>
          </Link>
          
          <button 
            className={styles.hamburger} 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
            {navLinks.map(({ path, label }) => (
              <Link 
                key={path} 
                to={path} 
                className={`${styles.navLink} ${location.pathname === path ? styles.active : ''}`}
              >
                {label}
              </Link>
            ))}
            <Link to="/products" className={styles.orderButton}>
              <ShoppingBag size={16} />
              <span>Commander</span>
            </Link>
          </div>
        </div>
      </nav>
      
      <main className={styles.main}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerInfo}>
            <h2 className={styles.footerTitle}>Pro Dan Cakes</h2>
            <p>Votre pâtisserie artisanale de confiance</p>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div className={styles.footerContact}>
            <h3>Contact</h3>
            <div className={styles.contactItem}>
              <Phone size={16} />
              <span>+237 690 282 207</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} />
              <span>+237 695 153 141</span>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={16} />
              <span>Ouest | Littorale</span>
            </div>
          </div>
          
          <div className={styles.footerNav}>
            <h3>Navigation</h3>
            <div className={styles.footerLinks}>
              {navLinks.map(({ path, label }) => (
                <Link key={path} to={path}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* <Link to="/upload" className={styles.orderButton}>
        upload image
        </Link> */}
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Pro Dan Cakes. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;