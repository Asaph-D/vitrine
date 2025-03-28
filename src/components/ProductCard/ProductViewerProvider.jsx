import React, { useState, useEffect, useContext, createContext } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Pages/ProductsSection/CartContext'; // Importer le hook useCart

// Création d'un contexte pour gérer l'état global du viewer
const ProductViewerContext = createContext();

// Provider qui gère l'état global du viewer
export const ProductViewerProvider = ({ children }) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // État pour la notification
  const { addToCart } = useCart(); // Utiliser le hook useCart pour obtenir addToCart

  useEffect(() => {
    if (selectedProduct) {
      // Délai pour permettre l'animation d'entrée
      setTimeout(() => setIsVisible(true), 50);
    }
  }, [selectedProduct]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const openProduct = (product) => {
    if (selectedProduct && selectedProduct.id !== product.id) {
      handleClose();
      setTimeout(() => setSelectedProduct(product), 300);
    } else {
      setSelectedProduct(product);
    }
  };

  const handleAddToCart = () => {
    if (addToCart && selectedProduct) {
      addToCart(selectedProduct); // Appel de la fonction addToCart fournie par le contexte
      setShowNotification(true); // Afficher la notification
      setTimeout(() => setShowNotification(false), 3000); // Masquer la notification après 3 secondes
    }
  };
  const handleViewDetails = () => {
    if (selectedProduct) {
      navigate(`/products`); // Rediriger vers la page de détails du produit
    }
  };

  return (
    <ProductViewerContext.Provider value={{ selectedProduct, isVisible, openProduct, handleClose }}>
      {children}

      {/* Visualiseur global qui sera affiché où que soit le provider */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay avec flou */}
          <div
            className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
          ></div>

          {/* Contenu du produit */}
          <div
            className={`relative bg-white max-w-2xl w-full mx-4 rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}
          >
            {/* Bouton de fermeture */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-gray-800 rounded-full p-1 hover:bg-white/50 transition-colors duration-200"
            >
              <X size={24} />
            </button>

            {/* Image et infos produit */}
            <div className="flex flex-col md:flex-row">
              {/* Image du produit */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.nom}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
              </div>

              {/* Informations du produit */}
              <div className="w-full md:w-1/2 p-6 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.nom}</h2>

                <div className="prose prose-sm text-gray-600 mb-4">
                  <p>{selectedProduct.description}</p>
                </div>

                <div className="mt-auto">
                  <div className="bg-gray-100 h-px w-full my-4"></div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <button onClick={handleAddToCart} className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors duration-200">
                      Ajouter au panier
                    </button>
                    <button onClick={handleViewDetails} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200">
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification d'ajout au panier */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-6 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            Produit ajouté !
          </motion.div>
        )}
      </AnimatePresence>
    </ProductViewerContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte
export const useProductViewer = () => {
  const context = useContext(ProductViewerContext);
  if (!context) {
    throw new Error('useProductViewer doit être utilisé avec ProductViewerProvider');
  }
  return context;
};
