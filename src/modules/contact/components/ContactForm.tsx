'use client';

import React, { useRef } from 'react';
import IonIcon from '@reacticons/ionicons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Input } from '../../../shared/components/Input';
import { Textarea } from '../../../shared/components/Textarea';
import { trackContactAttempt } from '../../../core/utils/analytics';
import { useContactForm } from '../hooks/useContactForm';

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

export const ContactForm: React.FC = () => {
  const { formData, isSubmitting, error, responseMessage, fieldErrors, handleChange, handleSubmit } = useContactForm();

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
            <Input
              label="Nombre"
              name="name"
              type="text"
              placeholder="Tu nombre completo"
              value={formData.name}
              onChange={handleChange}
              error={fieldErrors.name}
              animate={true}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              error={fieldErrors.email}
              animate={true}
            />
            <Input
              label="Teléfono"
              name="phone"
              type="tel"
              placeholder="04XX XXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              error={fieldErrors.phone}
              animate={true}
            />
            <Textarea
              label="Mensaje"
              name="message"
              placeholder="Cuéntame sobre tu proyecto..."
              value={formData.message}
              onChange={handleChange}
              error={fieldErrors.message}
              animate={true}
              rows={4}
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
