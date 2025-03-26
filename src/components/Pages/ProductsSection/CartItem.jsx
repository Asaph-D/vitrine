import React from 'react';
import { Minus, Plus, X } from 'lucide-react';

const CartItem = ({ item, cart, setCart }) => {
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <div key={item.id} className="flex justify-between items-center border-b pb-4">
      <div className="flex items-center gap-3">
        <img
          src={item.image || "/api/placeholder/60/60"}
          alt={item.nom}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-medium">{item.nom}</h3>
          <p className="text-gray-500 text-sm">{item.prix}€</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-3">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
