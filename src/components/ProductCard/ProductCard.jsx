import React from 'react';
import { useProductViewer } from './ProductViewerProvider';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { openProduct } = useProductViewer();

  const handleCardClick = () => {
    openProduct(product);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.nom} />
      </div>
      <div className={styles.content}>
        <h3>{product.nom}</h3>
        {/* <p>{product.description}</p> */}
      </div>
    </div>
  );
};

export default ProductCard;
