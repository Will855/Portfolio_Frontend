'use client'; // Indica que este archivo debe ejecutarse en el lado del cliente (Next.js).

// Importaciones necesarias
import React, { useRef, useState } from 'react'; // Hooks de React
import IonIcon from '@reacticons/ionicons'; // Iconos de Ionicons
import Input from './inpput'; // Componente de entrada personalizado
import useGsapAnimation from './../hook/useGsapAnimation'; // Hook para animaciones con GSAP
import { isValidEmail } from './utils/validation'; // Función para validar correos electrónicos
import { collection, addDoc } from "firebase/firestore"; // Métodos de Firestore
import { db } from "../config/firebase"; // Configuración de Firestore

// Componente principal del formulario de contacto
const ContactForm = () => {
  // Referencia al formulario para animaciones
  const formRef = useRef(null);
  useGsapAnimation(formRef); // Aplica animaciones al formulario

  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Estado para manejar mensajes de respuesta y errores
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y valor del campo
    setFormData({
      ...formData, // Mantiene los valores actuales
      [name]: value // Actualiza el campo correspondiente
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    try {
      // Validaciones del formulario
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setError('Por favor, completa todos los campos del formulario.');
        return;
      }

      if (!isValidEmail(formData.email)) {
        setError('Por favor, ingresa un correo electrónico válido.');
        return;
      }

      if (formData.phone && !/^\d{11}$/.test(formData.phone)) {
        setError('Por favor, ingresa un número de teléfono válido (11 dígitos).');
        return;
      }

      // Enviar datos a Firestore
      await addDoc(collection(db, "contactFormSubmissions"), formData); // Guarda los datos en Firestore

      // Si el envío es exitoso
      setResponseMessage('¡Formulario enviado con éxito!');
      setError(''); // Limpia los errores
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      }); // Resetea el formulario
    } catch (error) {
      console.error('Error al enviar los datos a Firestore:', error);
      setResponseMessage('');
      setError('Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 overflow-hidden mt-12">
      {/* Formulario de contacto */}
      <form
        ref={formRef} // Referencia para animaciones
        onSubmit={handleSubmit} // Maneja el envío del formulario
        className="w-full max-w-lg bg-white/5 p-8 rounded-lg shadow-xl relative z-10 backdrop-filter backdrop-blur-sm bg-opacity-80"
      >
        {/* Título del formulario */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent min-w-12">
          Contáctame
        </h2>

        {/* Campos del formulario */}
        <div className="space-y-4">
          <Input label="Nombre" name="name" type="text" placeholder="Your name" onChange={handleChange} />
          <Input label="Email" name="email" type="email" placeholder="your@email.com" onChange={handleChange} />
          <Input label="Telefono" name="phone" type="tel" placeholder="Your phone number" onChange={handleChange} />
          <div className="relative">
            <label htmlFor="message" className="text-[#f0f8ff] block mb-2">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              onChange={handleChange}
              className="w-full px-3 py-2 text-[#f0f8ff] bg-[#3a3a3a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0f8ff] transition-all duration-300 ease-in-out"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#4a4a4a] to-[#3a3a3a] text-[#f0f8ff] py-2 px-4 rounded-md hover:from-[#5a5a5a] hover:to-[#4a4a4a] transition-all duration-300 ease-in-out"
          >
            Enviar
          </button>
        </div>

        {/* Mensajes de respuesta */}
        {responseMessage && <p className="text-center text-[#f0f8ff] mt-4">{responseMessage}</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {/* Iconos de redes sociales */}
        <div className="flex justify-center space-x-4 mt-6 text-white text-2xl">
          <IonIcon className='cursor-pointer' name="logo-whatsapp"></IonIcon>
          <IonIcon className='cursor-pointer' name="logo-instagram"></IonIcon>
          <IonIcon className='cursor-pointer' name="logo-github"></IonIcon>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;