import React from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartItem from './CartItem';
import OrderForm from './OrderForm';

const Cart = ({ cart, setCart, isCartOpen, setIsCartOpen, orderPlaced, setOrderPlaced }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.prix * item.quantity), 0);
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
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-2xl max-h-[90vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 bg-orange-500 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold">Votre Panier</h2>
                <button onClick={() => setIsCartOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="overflow-y-auto flex-grow p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Votre panier est vide
                  </div>
                ) : (
                  <div>
                    <div className="space-y-4 mb-6">
                      {cart.map(item => (
                        <CartItem key={item.id} item={item} cart={cart} setCart={setCart} />
                      ))}
                    </div>
                    <div className="text-right mb-6">
                      <div className="text-lg font-bold">
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
            className="fixed bottom-20 right-6 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            Votre commande a été envoyée avec succès!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
