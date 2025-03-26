import React, { useState } from 'react';
import { X } from 'lucide-react';
import ContactForm from '../Pages/ContactForm';
import TestimonialForm from '../../api/TestimonialForm';
import styles from '../styles/FormModals.module.css';

const FormModals = () => {
  const [activeModal, setActiveModal] = useState(null);

  // Gestion des modaux
  const openModal = (modalType) => {
    setActiveModal(modalType);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'auto';
  };

  // Gestionnaire pour cliquer en dehors du modal pour le fermer
  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {/* Section de boutons pour les formulaires */}
      <section className={styles.formButtonsSection}>
        <div className={styles.formButtonsContainer}>
          <h2 className={styles.sectionTitle}>Nous contacter</h2>
          <p className={styles.sectionDescription}>
            Vous avez une question ou souhaitez partager votre expérience avec nous ?
          </p>
          <div className={styles.formButtonsWrapper}>
            <button 
              className={`${styles.formButton} ${styles.contactButton}`}
              onClick={() => openModal('contact')}
            >
              Nous contacter
            </button>
            <button 
              className={`${styles.formButton} ${styles.testimonialButton}`}
              onClick={() => openModal('testimonial')}
            >
              Laisser un avis
            </button>
          </div>
        </div>
      </section>

      {/* Modaux des formulaires */}
      {activeModal && (
        <div className={styles.modalOverlay} onClick={handleModalBackdropClick}>
          <div className={styles.modalContent}>
            <button className={styles.modalCloseButton} onClick={closeModal}>
              <X size={24} />
            </button>
            
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {activeModal === 'contact' ? 'Contactez-nous' : 'Partagez votre avis'}
              </h2>
            </div>
            
            <div className={styles.modalBody}>
              {activeModal === 'contact' ? (
                <ContactForm onSuccess={closeModal} />
              ) : (
                <TestimonialForm onSuccess={closeModal} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModals;