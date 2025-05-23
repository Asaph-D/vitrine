import React, { useRef } from 'react';
import { Printer, User, MapPin, Mail, Phone } from 'lucide-react';

const Receipt = ({ customerInfo, cart }) => {
  const receiptRef = useRef(null);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.prix * item.quantity), 0);
  };

  return (
    <div 
      ref={receiptRef} 
      className="bg-white border-2 border-gray-200 rounded-lg shadow-2xl p-4 sm:p-6 w-full max-w-md mx-auto relative"
    >
      {/* Header Section - Fixed alignment */}
      <header className="flex flex-row justify-between items-center border-b-2 border-dashed pb-4 mb-4">
        <div className="text-left">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800">REÇU</h2>
          <p className="text-xs sm:text-sm text-gray-500">N° {Math.floor(Math.random() * 1000)}</p>
        </div>
        <div className="text-right">
          <p className="text-red-500 font-bold text-base sm:text-lg animate-pulse">NON PAYÉ</p>
          <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
        </div>
      </header>

      {/* Customer Information Section */}
      <section className="mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <User className="mr-2 text-blue-500" size={20} />
          Informations du Client
        </h3>
        <div className="space-y-2 text-xs sm:text-sm text-gray-600">
          <p className="flex items-center">
            <User className="mr-2 text-gray-400" size={16} />
            {customerInfo.name}
          </p>
          <p className="flex items-center">
            <Mail className="mr-2 text-gray-400" size={16} />
            {customerInfo.email}
          </p>
          <p className="flex items-center">
            <Phone className="mr-2 text-gray-400" size={16} />
            {customerInfo.phone}
          </p>
          <p className="flex items-center">
            <MapPin className="mr-2 text-gray-400" size={16} />
            {customerInfo.address}
          </p>
        </div>
      </section>

      {/* Order Items Section - Fixed image and info alignment */}
      <section className="mb-6 border-t-2 border-dashed pt-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
          Détails de la Commande
        </h3>
        <div className="space-y-3">
          {cart.map(item => (
            <div 
              key={item.id} 
              className="flex flex-row items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-row items-center space-x-3 w-full">
                <img 
                  src={item.image} 
                  alt={item.nom} 
                  className="w-16 h-16 object-cover rounded-md shadow-sm flex-shrink-0" 
                />
                <div className="text-left">
                  <p className="font-medium text-gray-800 text-sm sm:text-base">{item.nom}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × {isNaN(parseFloat(item.prix)) ? "0.00" : parseFloat(item.prix).toFixed(2)} fcfa
                  </p>
                </div>
              </div>
              <p className="font-semibold text-gray-700 text-sm sm:text-base ml-2 flex-shrink-0">
                {isNaN(parseFloat(item.prix * item.quantity)) ? "0.00" : (item.quantity * parseFloat(item.prix)).toFixed(2)} fcfa
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Total Section */}
      <section className="border-t-2 border-dashed pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-base sm:text-lg font-bold text-gray-800">Total</span>
          <span className="text-xl sm:text-2xl font-extrabold text-blue-600">
            {calculateTotal().toFixed(2)} fcfa
          </span>
        </div>
      </section>

      {/* Footer/Platform Information */}
      <footer className="text-center border-t-2 border-dashed pt-4">
        <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Pro Dan Cakes</h4>
        <p className="text-xs sm:text-sm text-gray-600 italic">
          Une pâtisserie artisanale où la passion et le savoir-faire se marient délicieusement
        </p>
        <div className="mt-2 text-xs text-gray-500">
          Merci pour votre commande !
        </div>
      </footer>

      {/* Optional Printer Icon */}
      <button 
        onClick={() => window.print()} 
        className="absolute top-4 right-4 text-gray-500 hover:text-blue-500 transition-colors"
      >
        <Printer size={20} />
      </button>
    </div>
  );
};

export default Receipt;