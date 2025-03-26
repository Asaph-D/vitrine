import React from 'react';
import ProductCard from './ProductCard';

export const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((product, index) => (
      <ProductCard
        key={product.id || index}
        title={product.nom || product.title}
        description={product.description}
        imageSrc={product.image || product.imageSrc}
      />
    ))}
  </div>
);

export default ProductGrid;
