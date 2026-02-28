'use client';

import React, { useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import { motion, AnimatePresence } from 'framer-motion';
import { isValidEmail } from './utils/validation';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { trackContactAttempt } from '../utils/analytics';

// Tipos
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormField = keyof FormData;

interface SocialLink {
  name: string;
  icon: React.ComponentProps<typeof IonIcon>['name'];
  url: string;
  hoverColor: string;
  ariaLabel: string;
}

// Configuración de redes sociales con tipado
const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/+584265940917',
  instagram: 'https://www.instagram.com/techno__monster/',
  github: 'https://github.com/Will855'
};

const SOCIAL_ITEMS: SocialLink[] = [
  { name: 'whatsapp', icon: 'logo-whatsapp', url: SOCIAL_LINKS.whatsapp, hoverColor: 'hover:text-green-400', ariaLabel: 'Contactar por WhatsApp' },
  { name: 'instagram', icon: 'logo-instagram', url: SOCIAL_LINKS.instagram, hoverColor: 'hover:text-pink-400', ariaLabel: 'Seguir en Instagram' },
  { name: 'github', icon: 'logo-github', url: SOCIAL_LINKS.github, hoverColor: 'hover:text-gray-400', ariaLabel: 'Ver perfil de GitHub' }
];

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.02, boxShadow: "0 10px 30px rgba(96, 165, 250, 0.3)" },
  tap: { scale: 0.98 }
};

const messageVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300 } },
  exit: { opacity: 0, y: 10, scale: 0.9, transition: { duration: 0.2 } }
};

/**
 * Componente de campo de entrada animado con validación visual
 */
const AnimatedInput: React.FC<{
  label: string;
  name: FormField;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}> = ({ label, name, type, placeholder, value, onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div variants={itemVariants} className="relative">
      <motion.label
        htmlFor={name}
        className={`block mb-2 font-medium transition-colors duration-300 ${
          isFocused ? 'text-blue-400' : 'text-slate-200'
        }`}
        animate={{ scale: isFocused ? 1.02 : 1 }}
      >
        {label}
      </motion.label>
      <motion.div
        className="relative"
        whileFocus={{ scale: 1.01 }}
      >
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3 text-white bg-white/5 border-2 rounded-xl backdrop-blur-sm focus:outline-none transition-all duration-300 ${
            error
              ? 'border-red-500/50 focus:border-red-400'
              : isFocused
              ? 'border-blue-400/50 focus:border-blue-400'
              : 'border-white/10 hover:border-white/20'
          }`}
          placeholder={placeholder}
        />
        <motion.div
          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400`}
          initial={{ width: 0 }}
          animate={{ width: isFocused ? '100%' : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

/**
 * Componente de textarea animado
 */
const AnimatedTextarea: React.FC<{
  label: string;
  name: FormField;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: boolean;
}> = ({ label, name, placeholder, value, onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div variants={itemVariants} className="relative">
      <motion.label
        htmlFor={name}
        className={`block mb-2 font-medium transition-colors duration-300 ${
          isFocused ? 'text-blue-400' : 'text-slate-200'
        }`}
        animate={{ scale: isFocused ? 1.02 : 1 }}
      >
        {label}
      </motion.label>
      <textarea
        id={name}
        name={name}
        rows={4}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 py-3 text-white bg-white/5 border-2 rounded-xl backdrop-blur-sm focus:outline-none transition-all duration-300 resize-none ${
          error
            ? 'border-red-500/50 focus:border-red-400'
            : isFocused
            ? 'border-blue-400/50 focus:border-blue-400'
            : 'border-white/10 hover:border-white/20'
        }`}
        placeholder={placeholder}
      />
    </motion.div>
  );
};

/**
 * Componente principal del formulario de contacto con animaciones avanzadas
 */
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FormField, boolean>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Limpiar error del campo al escribir
    if (fieldErrors[name as FormField]) {
      setFieldErrors({ ...fieldErrors, [name]: false });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setResponseMessage('');

    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setError('Por favor, completa todos los campos del formulario.');
        setFieldErrors({
          name: !formData.name.trim(),
          email: !formData.email.trim(),
          message: !formData.message.trim()
        });
        setIsSubmitting(false);
        return;
      }

      if (!isValidEmail(formData.email)) {
        setError('Por favor, ingresa un correo electrónico válido.');
        setFieldErrors({ email: true });
        setIsSubmitting(false);
        return;
      }

      if (formData.phone && !/^\d{11}$/.test(formData.phone)) {
        setError('Por favor, ingresa un número de teléfono válido (11 dígitos).');
        setFieldErrors({ phone: true });
        setIsSubmitting(false);
        return;
      }

      if (!isSupabaseConfigured) {
        setError('El formulario de contacto no está configurado.');
        setIsSubmitting(false);
        return;
      }
      const { error: submitError } = await supabase.from('contact_submissions').insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        message: formData.message.trim(),
      });
      if (submitError) throw submitError;

      setResponseMessage('¡Formulario enviado con éxito!');
      setError('');
      setFieldErrors({});
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      console.error('Error al enviar el mensaje:', err);
      setResponseMessage('');
      setError('Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 overflow-hidden mt-12">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-lg relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Contenedor con glassmorphism */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20">
          {/* Título animado */}
          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Contáctame
          </motion.h2>

          {/* Campos del formulario */}
          <div className="space-y-5">
            <AnimatedInput
              label="Nombre"
              name="name"
              type="text"
              placeholder="Tu nombre completo"
              value={formData.name}
              onChange={handleChange}
              error={fieldErrors.name}
            />
            <AnimatedInput
              label="Email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              error={fieldErrors.email}
            />
            <AnimatedInput
              label="Teléfono"
              name="phone"
              type="tel"
              placeholder="04XX XXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              error={fieldErrors.phone}
            />
            <AnimatedTextarea
              label="Mensaje"
              name="message"
              placeholder="Cuéntame sobre tu proyecto..."
              value={formData.message}
              onChange={handleChange}
              error={fieldErrors.message}
            />

            {/* Botón de envío animado */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              variants={buttonVariants}
              initial="idle"
              whileHover={!isSubmitting ? "hover" : "idle"}
              whileTap={!isSubmitting ? "tap" : "idle"}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Enviando...</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="submit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Enviar Mensaje
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mensajes de respuesta con animación */}
          <AnimatePresence>
            {responseMessage && (
              <motion.div
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center text-green-400"
              >
                {responseMessage}
              </motion.div>
            )}
            {error && (
              <motion.div
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-center text-red-400"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Iconos de redes sociales con animaciones */}
          <motion.div
            className="flex justify-center space-x-6 mt-8"
            variants={itemVariants}
          >
            {SOCIAL_ITEMS.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactAttempt(social.name)}
                className={`text-white transition-colors duration-300 ${social.hoverColor}`}
                aria-label={social.ariaLabel}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <IonIcon name={social.icon} className="text-3xl cursor-pointer" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.form>
    </div>
  );
};

export default ContactForm;
