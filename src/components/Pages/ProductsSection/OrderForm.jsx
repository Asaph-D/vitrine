import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Receipt from './Receipt';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '../../../components/ui/alert-dialog';

const OrderForm = ({ handleSubmitOrder, cart }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Utilisation de AlertDialog
  const receiptRef = useRef(null);
  const orderNumber = Math.floor(Math.random() * 1000);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const captureAndDownloadReceipt = async () => {
    if (!receiptRef.current) return;

    receiptRef.current.style.visibility = 'visible';
    receiptRef.current.style.position = 'static';

    await new Promise(resolve => setTimeout(resolve, 500)); // Attente pour le rendu correct

    const canvas = await html2canvas(receiptRef.current, { useCORS: true, scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    receiptRef.current.style.visibility = 'hidden';
    receiptRef.current.style.position = 'absolute';
    receiptRef.current.style.left = '-9999px';

    const link = document.createElement('a');
    link.href = imgData;
    link.download = `ProDanCakes-N°${orderNumber}.png`;
    link.click();
  };

  const sendWhatsAppMessage = async () => {
    const bakeryPhoneNumber = '+237658989324';
    const items = cart.map(item => `${item.nom} - ${item.quantity} x ${item.prix}€`).join('\n');
    const message = `Nouvelle commande de ${customerInfo.name} !\nEmail: ${customerInfo.email}\nTéléphone: ${customerInfo.phone}\nAdresse: ${customerInfo.address}\nArticles:\n${items}`;

    const whatsappURL = `https://wa.me/${bakeryPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+]{8,15}$/;

    if (!emailRegex.test(customerInfo.email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }
    if (!phoneRegex.test(customerInfo.phone)) {
      alert("Veuillez entrer un numéro de téléphone valide.");
      return;
    }

    setIsConfirmModalOpen(true); // Ouvre AlertDialog
  };

  const confirmOrder = async () => {
    setIsConfirmModalOpen(false);
    await captureAndDownloadReceipt();
    await sendWhatsAppMessage();
    handleSubmitOrder(new Event('submit'));
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <input
              type="text"
              name="address"
              value={customerInfo.address}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition-colors"
          >
            Commander
          </button>
        </div>
      </form>

      <div ref={receiptRef} style={{ visibility: 'hidden', position: 'absolute', left: '-9999px' }}>
        <Receipt customerInfo={customerInfo} cart={cart} />
      </div>

      {/* AlertDialog pour la confirmation */}
      <AlertDialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la commande</AlertDialogTitle>
            <AlertDialogDescription>
              Un fichier va se télécharger. Vous pourrez l'envoyer à la pâtisserie. Êtes-vous d'accord ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmOrder}>Confirmer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrderForm;
