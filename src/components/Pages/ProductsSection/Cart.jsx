import React from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartItem from './CartItem';
import OrderForm from './OrderForm';

const Cart = ({ cart, setCart, isCartOpen, setIsCartOpen, orderPlaced, setOrderPlaced }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const prix = !isNaN(parseFloat(item.prix)) ? parseFloat(item.prix) : 0;
      return total + (prix * item.quantity);
    }, 0);
      };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    console.log("Commande soumise:", {
      items: cart,
      total: calculateTotal()
    });
    setOrderPlaced(true);
    setTimeout(() => {
      setCart([]);
      setIsCartOpen(false);
      setOrderPlaced(false);
    }, 3000);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md sm:max-w-2xl max-h-[90vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 bg-orange-500 text-white flex justify-between items-center">
                <h2 className="text-base sm:text-xl font-bold truncate">Votre Panier</h2>
                <button onClick={() => setIsCartOpen(false)}>
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              <div className="overflow-y-auto flex-grow p-2 sm:p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
                    Votre panier est vide
                  </div>
                ) : (
                  <div>
                    <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
                      {cart.map(item => (
                        <div
                          key={item.id}
                          className="bg-gray-50 rounded-lg p-2 sm:p-4 flex items-center space-x-2 sm:space-x-4"
                        >
                          <img
                            src={item.image}
                            alt={item.nom}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                          />
                          <div className="flex-grow min-w-0">
                            <p className="font-medium text-xs sm:text-sm text-gray-800 truncate">
                              {item.nom}
                            </p>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-xs text-gray-500">
                                {item.quantity} × {(!isNaN(parseFloat(item.prix)) ? parseFloat(item.prix).toFixed(2) : "0.00")}€
                              </p>
                              <p className="font-semibold text-xs sm:text-sm text-gray-700">
                                {(!isNaN(parseFloat(item.prix)) ? (item.quantity * parseFloat(item.prix)).toFixed(2) : "0.00")}€
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              const updatedCart = cart.filter(cartItem => cartItem.id !== item.id);
                              setCart(updatedCart);
                            }}
                            className="text-red-500 hover:text-red-700 text-xs sm:text-sm"
                          >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="text-right mb-4 sm:mb-6">
                      <div className="text-base sm:text-lg font-bold">
                        Total: {calculateTotal().toFixed(2)}€
                      </div>
                    </div>
                    <OrderForm handleSubmitOrder={handleSubmitOrder} cart={cart} />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {orderPlaced && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 sm:bottom-20 right-2 sm:right-6 bg-green-500 text-white p-2 sm:p-4 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">
              Votre commande a été envoyée avec succès!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
