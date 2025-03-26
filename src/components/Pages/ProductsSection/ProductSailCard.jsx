import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from './CartContext'; // Importer le hook useCart

const ProductSailCard = ({ product }) => {
  const { addToCart } = useCart(); // Utiliser le hook useCart pour obtenir addToCart

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all bg-white"
    >
      <img
        src={product.image || "/api/placeholder/400/300"}
        alt={product.nom}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{product.nom}</h3>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-orange-500">{product.prix}€</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Ajouter
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductSailCard;
