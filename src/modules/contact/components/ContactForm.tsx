'use client';

import React, { useState, useRef, useEffect } from 'react';
import IonIcon from '@reacticons/ionicons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { isValidEmail } from './utils/validation';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { trackContactAttempt } from '../utils/analytics';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isFocused) {
      gsap.to(labelRef.current, { scale: 1.02, duration: 0.3 });
      gsap.to(inputRef.current, { scale: 1.01, duration: 0.3 });
      gsap.to(underlineRef.current, { width: '100%', duration: 0.3 });
    } else {
      gsap.to(labelRef.current, { scale: 1, duration: 0.3 });
      gsap.to(inputRef.current, { scale: 1, duration: 0.3 });
      gsap.to(underlineRef.current, { width: 0, duration: 0.3 });
    }
  }, [isFocused]);

  return (
    <div ref={containerRef} className="form-item opacity-0 translate-y-5 relative">
      <label
        ref={labelRef}
        htmlFor={name}
        className={`block mb-2 font-medium transition-colors duration-300 origin-left ${
          isFocused ? 'text-blue-400' : 'text-slate-200'
        }`}
      >
        {label}
      </label>
      <div ref={inputRef} className="relative transform-gpu">
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
        <div
          ref={underlineRef}
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 w-0"
        />
      </div>
    </div>
  );
};

const AnimatedTextarea: React.FC<{
  label: string;
  name: FormField;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: boolean;
}> = ({ label, name, placeholder, value, onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  useGSAP(() => {
    if (isFocused) {
      gsap.to(labelRef.current, { scale: 1.02, duration: 0.3 });
    } else {
      gsap.to(labelRef.current, { scale: 1, duration: 0.3 });
    }
  }, [isFocused]);

  return (
    <div ref={containerRef} className="form-item opacity-0 translate-y-5 relative">
      <label
        ref={labelRef}
        htmlFor={name}
        className={`block mb-2 font-medium transition-colors duration-300 origin-left ${
          isFocused ? 'text-blue-400' : 'text-slate-200'
        }`}
      >
        {label}
      </label>
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
    </div>
  );
};

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

  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(formRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 })
      .fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 })
      .fromTo(".form-item", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.2")
      .fromTo(buttonRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
      .fromTo(socialRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");
  }, []);

  useGSAP(() => {
    if (responseMessage && responseRef.current) {
      gsap.fromTo(responseRef.current, { opacity: 0, y: -10, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" });
    }
  }, [responseMessage]);

  useGSAP(() => {
    if (error && errorRef.current) {
      gsap.fromTo(errorRef.current, { opacity: 0, y: -10, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" });
    }
  }, [error]);

  useGSAP(() => {
    if (isSubmitting && spinnerRef.current) {
      gsap.to(spinnerRef.current, { rotation: 360, repeat: -1, duration: 1, ease: "linear" });
    }
  }, [isSubmitting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-lg relative z-10 opacity-0"
      >
        <div className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent opacity-0"
          >
            Contáctame
          </h2>

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

            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden opacity-0 transform-gpu"
              onMouseEnter={(e) => {
                if (!isSubmitting) gsap.to(e.currentTarget, { scale: 1.02, boxShadow: "0 10px 30px rgba(96, 165, 250, 0.3)", duration: 0.3 });
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) gsap.to(e.currentTarget, { scale: 1, boxShadow: "0 4px 6px rgba(0,0,0,0.1)", duration: 0.3 });
              }}
              onMouseDown={(e) => {
                if (!isSubmitting) gsap.to(e.currentTarget, { scale: 0.98, duration: 0.1 });
              }}
              onMouseUp={(e) => {
                if (!isSubmitting) gsap.to(e.currentTarget, { scale: 1.02, duration: 0.1 });
              }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div
                    ref={spinnerRef}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  <span>Enviando...</span>
                </div>
              ) : (
                <span>Enviar Mensaje</span>
              )}
            </button>
          </div>

          {responseMessage && (
            <div
              ref={responseRef}
              className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center text-green-400 opacity-0"
            >
              {responseMessage}
            </div>
          )}
          {error && (
            <div
              ref={errorRef}
              className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-center text-red-400 opacity-0"
            >
              {error}
            </div>
          )}

          <div
            ref={socialRef}
            className="flex justify-center space-x-6 mt-8 opacity-0"
          >
            {SOCIAL_ITEMS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactAttempt(social.name)}
                className={`text-white transition-colors duration-300 ${social.hoverColor} block`}
                aria-label={social.ariaLabel}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.2, rotate: 5, duration: 0.3, ease: "back.out(1.7)" })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.3, ease: "back.out(1.7)" })}
                onMouseDown={(e) => gsap.to(e.currentTarget, { scale: 0.9, duration: 0.1 })}
                onMouseUp={(e) => gsap.to(e.currentTarget, { scale: 1.2, duration: 0.1 })}
              >
                <IonIcon name={social.icon} className="text-3xl cursor-pointer" />
              </a>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
