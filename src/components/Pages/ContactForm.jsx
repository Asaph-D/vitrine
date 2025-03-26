import React, { useState } from "react";
import emailjs from "emailjs-com";
import { db } from "../../api/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { User, Mail, MessageSquare, Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      await addDoc(collection(db, "feedback"), formData);
  
      const emailData = {
        to_name: "Pro Dan",  // Le destinataire
        from_name: formData.name, // Le nom de l'expéditeur
        reply_to: formData.email, // Email pour la réponse
        message: formData.message,
      };
  
      // Log pour vérifier les données envoyées
      console.log("Données envoyées à EmailJS :", emailData);
  
      emailjs.send(
        "service_yw021kn", 
        "template_nq2bp49", 
        emailData,
        "BwPSfj8OwGvdo2j-w"
      ).then(
        (result) => {
          console.log("Email envoyé avec succès :", result);
          setSubmitSuccess(true);
          setTimeout(() => {
            setSubmitSuccess(false);
            setFormData({
              name: "",
              email: "",
              message: "",
            });
          }, 3000);
        },
        (error) => {
          console.error("Erreur d'envoi d'email:", error.text);
          alert("Échec de l'envoi du message. Veuillez réessayer plus tard.");
        }
      );
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      alert("Échec de l'envoi du message. Veuillez réessayer plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // const InputWrapper = ({ children }) => (
  //   <div className="relative w-full mb-6 group">
  //     {children}
  //   </div>
  // );

  return (
    <section className="w-full max-w-2xl mx-auto px-4 md:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 relative">
        <span className="relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-orange-500 after:bottom-0 after:left-0 after:rounded-full">
          Contactez-nous
        </span>
      </h2>
      
      {submitSuccess ? (
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl shadow-lg text-center py-16 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-700">Message envoyé !</h3>
          <p className="text-gray-600 mt-2">Nous vous répondrons dans les plus brefs délais.</p>
        </div>
      ) : (
        <form className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 md:p-8 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* <InputWrapper> */}
              <div className="flex border-b-2 border-gray-300 focus-within:border-orange-500 transition-colors py-2 px-1">
                <User className="text-orange-400 mr-2 flex-shrink-0" size={20} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent focus:outline-none text-gray-700"
                />
              </div>
            {/* </InputWrapper> */}
            
            {/* <InputWrapper> */}
              <div className="flex border-b-2 border-gray-300 focus-within:border-orange-500 transition-colors py-2 px-1">
                <Mail className="text-orange-400 mr-2 flex-shrink-0" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent focus:outline-none text-gray-700"
                />
              </div>
            {/* </InputWrapper> */}
            
            {/* <InputWrapper> */}
              <div className="flex border-2 border-gray-300 focus-within:border-orange-500 transition-colors rounded-lg p-3">
                <MessageSquare className="text-orange-400 mr-2 flex-shrink-0 self-start mt-1" size={20} />
                <textarea
                  id="message"
                  name="message"
                  placeholder="Votre message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-transparent focus:outline-none text-gray-700 resize-none"
                />
              </div>
            {/* </InputWrapper> */}
          </div>
          
          <div className="flex justify-center pt-6">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-medium transition-transform duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </span>
              ) : (
                <span className="inline-flex items-center">
                  <Send className="mr-2" size={18} />
                  Envoyer
                </span>
              )}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default ContactForm;