'use client';

import React, { useRef, useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import Input from './inpput';
import useGsapAnimation from './../hook/useGsapAnimation';
import { isValidEmail } from './utils/validation';
import { collection, addDoc } from "firebase/firestore"; // Importa Firestore
import { db } from "../config/firebase"; // Importa la instancia de Firestore

const ContactForm = () => {
  const formRef = useRef(null);
  useGsapAnimation(formRef);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      await addDoc(collection(db, "contactFormSubmissions"), formData); // Guarda los datos en la colección "contactFormSubmissions"

      // Si el envío es exitoso
      setResponseMessage('¡Formulario enviado con éxito!');
      setError('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error al enviar los datos a Firestore:', error);
      setResponseMessage('');
      setError('Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 overflow-hidden mt-12">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/5 p-8 rounded-lg shadow-xl relative z-10 backdrop-filter backdrop-blur-sm bg-opacity-80"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent min-w-12">
          Contáctame
        </h2>
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
        {responseMessage && <p className="text-center text-[#f0f8ff] mt-4">{responseMessage}</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
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