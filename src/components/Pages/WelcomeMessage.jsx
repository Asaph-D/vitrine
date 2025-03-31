import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const WelcomeMessage = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);
  
  const messages = [
    "Une pâtisserie artisanale où la passion et le savoir-faire se marient délicieusement.",
    "Dans notre atelier, chaque création est une ode à la gourmandise, alliant tradition Africaine et créativité contemporaine."
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    const handleResize = () => setIsSmallScreen(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      const intervalId = setInterval(() => {
        // Disparition
        setIsVisible(false);
        
        // Changement de texte après la disparition
        setTimeout(() => {
          setTextIndex((prev) => (prev === 0 ? 1 : 0));
          
          // Réapparition du nouveau texte
          setTimeout(() => {
            setIsVisible(true);
          }, 300);
        }, 1500); // Attendre que l'animation de disparition soit terminée
        
      }, 10000); // Changer toutes les 10 secondes
      
      return () => clearInterval(intervalId);
    }
  }, [isSmallScreen]);

  const textStyle = {
    fontSize: '1.5rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    width: '100%',
    margin: 0,
    textAlign: 'center'
  };

  // Affichage pour les petits écrans avec animation
  if (isSmallScreen) {
    return (
      <div style={{ 
        position: 'relative', 
        height: '10rem', 
        top: 3,
        bottom: 1,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <p 
          className={styles.heroText}
          style={{
            ...textStyle,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out'
          }}
        >
          {messages[textIndex]}
        </p>
      </div>
    );
  }
  
  // Affichage pour les grands écrans (comportement d'origine inchangé)
  return (
    <div style={{ position: 'relative' }}>
      <p 
        className={styles.heroText}
        style={textStyle}
      >
        {messages[0]}
      </p>
      <p 
        className={styles.heroText}
        style={textStyle}
      >
        {messages[1]}
      </p>
    </div>
  );
};

export default WelcomeMessage;