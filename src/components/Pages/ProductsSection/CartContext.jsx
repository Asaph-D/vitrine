import React, { createContext, useContext, useState } from 'react';

// Créer un contexte pour le panier
const CartContext = createContext();

// Fournisseur de contexte pour le panier
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Valeurs fournies par le contexte
  const value = {
    cart,
    setCart,
    isCartOpen,
    setIsCartOpen,
    orderPlaced,
    setOrderPlaced,
    addToCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte du panier
export const useCart = () => {
  return useContext(CartContext);
};
