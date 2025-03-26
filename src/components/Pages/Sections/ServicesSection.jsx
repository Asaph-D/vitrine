// ServicesSection.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cake, Coffee, Gift } from 'lucide-react';
import styles from '../../styles/ServicesSection.module.css';

const ServicesSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const services = [
    {
      icon: Cake,
      title: "Gâteaux Artisanaux",
      desc: "Des créations uniques pour vos moments spéciaux",
      path: "/cakes"
    },
    {
      icon: Coffee,
      title: "Boissons",
      desc: "Une sélection raffinée de boissons chaudes et froides",
      path: "/beverages"
    },
    {
      icon: Gift,
      title: "Cadeaux",
      desc: "Des surprises gourmandes à offrir à vos proches",
      path: "/gifts"
    }
  ];

  return (
    <section className={styles.servicesSection}>
      <h2 className={styles.sectionTitle}>Nos Spécialités</h2>
      <div className={styles.servicesGrid}>
        {services.map((service, idx) => (
          <div
            key={idx}
            className={`${styles.serviceCard} ${hoveredCard === idx ? styles.cardHovered : ''}`}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate(service.path)}
          >
            <div className={styles.serviceIconWrapper}>
              <service.icon className={`${styles.serviceIcon} ${hoveredCard === idx ? styles.iconHovered : ''}`} />
            </div>
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <p className={styles.serviceDescription}>{service.desc}</p>
            <div className={styles.serviceLinkWrapper}>
              <span className={styles.serviceLink}>Découvrir</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
