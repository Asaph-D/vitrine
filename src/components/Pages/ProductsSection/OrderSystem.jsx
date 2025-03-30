import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import Cart from './Cart';
import ProductSailCard from './ProductSailCard';
import ProductSkeleton from '../ProductSkeleton'; // Importer ProductSkeleton
import { useCart } from './CartContext'; // Importer le hook useCart

const OrderSystem = ({ products }) => {
  const { cart, isCartOpen, setIsCartOpen, orderPlaced, setOrderPlaced, setCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un délai de chargement pour démonstration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="fixed bottom-6 right-6 z-40 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-all"
      >
        <ShoppingCart className="w-6 h-6" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>
      <div className="grid grid-cols-0 md:grid-cols-3 gap-8">
        {loading ? (
          // Afficher les squelettes pendant le chargement
          Array(6).fill().map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          // Afficher les produits si disponibles
          products.map((product) => (
            <ProductSailCard key={product.id} product={product} />
          ))
        )}
      </div>
      <Cart
        cart={cart}
        setCart={setCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        orderPlaced={orderPlaced}
        setOrderPlaced={setOrderPlaced}
      />
    </div>
  );
};

export default OrderSystem;
