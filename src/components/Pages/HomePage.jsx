import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductViewerProvider } from '../ProductCard/ProductViewerProvider';
import ProductCard from '../ProductCard/ProductCard';
import ProductSkeleton from './ProductSkeleton';
import styles from '../styles/Home.module.css';
// import TestimonialsSection from './Sections/TestimonialsSection';
// import useTestimonials from '../../api/useTestimonials';
import FormModals from '../Forms/FormModals';
import ServicesSection from './Sections/ServicesSection';
import { fetchProducts } from './ProductsSection/productsData';
import WelcomeMessage from './WelcomeMessage';

const getRandomProducts = (products, count = 3) => {
  const shuffledProducts = products.sort(() => 0.5 - Math.random());
  return shuffledProducts.slice(0, count);
};

const HomePage = () => {
  const navigate = useNavigate();
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { error } = useTestimonials();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await fetchProducts();
        setRandomProducts(getRandomProducts(fetchedProducts));
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // if (error) return (
  //   <div className={styles.errorContainer}>
  //     <p>Nous n'avons pas pu charger les avis: {error.message}</p>
  //     <button
  //       className={styles.retryButton}
  //       onClick={() => window.location.reload()}
  //     >
  //       Réessayer
  //     </button>
  //   </div>
  // );

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Pro-Dan-Cakes</h1>
          <WelcomeMessage></WelcomeMessage>
          <button
            className={styles.heroButton}
            onClick={() => navigate('/products')}
          >
            Découvrir nos créations
          </button>
        </div>
        <div className={styles.heroOverlay}></div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Popular Products Section */}
      <ProductViewerProvider className={styles.productViewer}>
        <section className={styles.productsSection}>
          <h2 className={styles.sectionTitle}>Nos Produits Populaires</h2>
          <div className={styles.productsGrid}>
            {loading ? (
              // Afficher les squelettes pendant le chargement
              Array(3).fill().map((_, index) => (
                <ProductSkeleton key={`skeleton-${index}`} />
              ))
            ) : (
              // Afficher les produits si disponibles
              randomProducts.map((product) => (
                <div key={product.id} className={styles.productCardWrapper}>
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
          <div className={styles.viewMoreContainer}>
            <button
              className={styles.viewMoreButton}
              onClick={() => navigate('/products')}
            >
              Voir tous nos produits
            </button>
          </div>
        </section>
      </ProductViewerProvider>

      {/* <TestimonialsSection /> */}

      {/* Call to Action Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Envie de découvrir nos créations ?</h2>
          <p className={styles.ctaText}>
            Venez nous rendre visite ou passez votre commande en ligne
          </p>
          <button
            className={styles.ctaButton}
            onClick={() => navigate('/products')}
          >
            Commander maintenant
          </button>
        </div>
      </section>

      {/* Intégration du composant FormModals - remplace les anciennes sections de formulaire */}
      <FormModals />
    </div>
  );
};

export default HomePage;
