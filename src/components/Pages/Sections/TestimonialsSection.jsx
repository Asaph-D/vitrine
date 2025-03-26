import React, { useState, useEffect, useRef, useMemo } from 'react';
import useTestimonials from '../../../api/useTestimonials';
import { ChevronDown } from 'lucide-react';
import styles from '../../styles/TestimonialsSection.module.css';

const TestimonialsSection = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [visibleCards, setVisibleCards] = useState({});
  const testimonialRefs = useRef({});
  const sectionRef = useRef(null);
  const loadMoreRef = useRef(null);
  const { testimonials, loading, error } = useTestimonials();

  const displayTestimonials = useMemo(() =>
    testimonials?.length > 0 ? testimonials : [],
    [testimonials]
  );

  const BATCH_SIZE = 3;
  const hasMoreTestimonials = visibleCount < displayTestimonials.length;
  const visibleTestimonials = useMemo(() =>
    displayTestimonials.slice(0, visibleCount),
    [displayTestimonials, visibleCount]
  );
  const remainingTestimonials = displayTestimonials.length - visibleCount;

  useEffect(() => {
    console.log('Total testimonials:', displayTestimonials.length);
    console.log('Visible count:', visibleCount);
    console.log('Remaining:', remainingTestimonials);
    console.log('Has more:', hasMoreTestimonials);
  }, [displayTestimonials, visibleCount, remainingTestimonials, hasMoreTestimonials]);

  const loadMoreTestimonials = () => {
    console.log('Loading more testimonials...');
    if (displayTestimonials.length - visibleCount <= BATCH_SIZE) {
      setVisibleCount(displayTestimonials.length);
    } else {
      setVisibleCount(prev => prev + BATCH_SIZE);
    }

    setTimeout(() => {
      if (loadMoreRef.current) {
        loadMoreRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
  };

  const showLessTestimonials = () => {
    console.log('Showing less testimonials...');
    setVisibleCount(3);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newVisibleCards = {};
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (entry.isIntersecting) {
            newVisibleCards[id] = true;
          }
        });
        if (Object.keys(newVisibleCards).length > 0) {
          setVisibleCards(prev => ({
            ...prev,
            ...newVisibleCards
          }));
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px 50px 0px' }
    );

    setTimeout(() => {
      Object.keys(testimonialRefs.current).forEach((id) => {
        const element = testimonialRefs.current[id];
        if (element && !visibleCards[id]) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, [visibleTestimonials, visibleCards]);

  if (loading) {
    console.log('Loading testimonials...');
    return (
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            Chargement des témoignages...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Erreur lors du chargement des témoignages:", error);
    return null;
  }

  if (!displayTestimonials.length) {
    console.log('No testimonials to display.');
    return null;
  }

  return (
    <section className={styles.testimonialsSection} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Ce que nos clients disent</h2>
        <div className={styles.testimonialsGrid}>
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={`testimonial-${index}`}
              className={`${styles.testimonialCard} ${visibleCards[index] ? styles.testimonialCardVisible : ''} ${styles.testimonialCardAnimated}`}
              ref={el => testimonialRefs.current[index] = el}
              data-id={index}
              style={{ animationDelay: `${Math.min(index, 10) * 0.05}s` }}
            >
              <div className={styles.stars} aria-label={`Note: ${testimonial.rating} sur 5`}>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.star} ${i < testimonial.rating ? styles.activeStar : ''}`}
                    aria-hidden="true"
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className={styles.testimonialText}>"{testimonial.message}"</p>
              <p className={styles.testimonialName}>- {testimonial.name}</p>
            </div>
          ))}
        </div>
        <div ref={loadMoreRef} style={{ height: '1px', width: '100%' }}></div>
        <div className={styles.viewMoreContainer}>
          {hasMoreTestimonials && (
            <button
              className={styles.viewMoreButtonFloat}
              onClick={loadMoreTestimonials}
              aria-label={`Charger ${remainingTestimonials} témoignages supplémentaires`}
            >
              Voir plus ({remainingTestimonials > BATCH_SIZE ? BATCH_SIZE : remainingTestimonials})
              <ChevronDown
                className={styles.viewMoreButtonIcon}
                size={16}
                aria-hidden="true"
              />
            </button>
          )}
          {visibleCount > 3 && (
            <button
              className={`${styles.viewMoreButtonFloat} ${styles.viewLessButton}`}
              onClick={showLessTestimonials}
              aria-label="Réduire et n'afficher que les 3 premiers témoignages"
            >
              Voir moins
              <ChevronDown
                className={`${styles.viewMoreButtonIcon} ${styles.viewMoreButtonIconRotated}`}
                size={16}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
