"use client";

import React from 'react';
import IonIcon from '@reacticons/ionicons';
import QRCode from 'react-qr-code';
import { trackContactAttempt } from '../../utils/analytics';

// Configuración reutilizable
const CONTACT_INFO = {
  email: 'lynchwilmer@gmail.com',
  phone: '+58 4265940917',
  socialMedia: {
    github: {
      url: 'https://github.com/Will855',
      label: 'GitHub/Will855',
      iconName: 'logo-github'
    },
    instagram: {
      url: 'https://www.instagram.com/techno__monster/',
      label: 'Instagram/techno_monster',
      iconName: 'logo-instagram'
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/wilmer-lynch/',
      label: 'LinkedIn/wilmer-lynch',
      iconName: 'logo-linkedin'
    },
    whatsapp: {
      url: 'https://wa.me/+584265940917',
      label: 'WhatsApp',
      iconName: 'logo-whatsapp'
    }
  }
};

const Footer: React.FC = () => {
  const handleSocialClick = (platform: string) => {
    trackContactAttempt(platform);
  };

  return (
    <footer id="contacto" className="relative text-slate-50 w-full">
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl transition-all hover:shadow-2xl">
          {/* Sección de Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Bloque de Contacto */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                Contacto
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-center gap-2 hover:text-blue-300 transition-colors duration-300 overflow-clip text-sm sm:text-base"
                    aria-label="Enviar correo electrónico"
                    onClick={() => handleSocialClick('email')}
                  >
                    <IonIcon name="mail-open-outline" className="text-xl text-blue-400 shrink-0" />
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 hover:text-purple-300 transition-colors duration-300 text-sm sm:text-base"
                    aria-label="Llamar por teléfono"
                    onClick={() => handleSocialClick('phone')}
                  >
                    <IonIcon name="call-outline" className="text-xl text-purple-400 shrink-0" />
                    {CONTACT_INFO.phone}
                  </a>
                </li>
              </ul>
            </div>

            {/* QR WhatsApp Nativo */}
            <div className="flex flex-col items-center space-y-4">
              <a 
                href={CONTACT_INFO.socialMedia.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialClick('whatsapp')}
                className="bg-white p-3 rounded-xl hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                aria-label="Abrir chat de WhatsApp"
              >
                <QRCode 
                  value={CONTACT_INFO.socialMedia.whatsapp.url}
                  size={128}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="Q"
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </a>
              <p className="text-sm opacity-75">Escanea para contactar</p>
            </div>

            {/* Redes Sociales */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-300 to-blue-400 bg-clip-text text-transparent">
                Redes
              </h3>
              <ul className="space-y-3">
                {Object.entries(CONTACT_INFO.socialMedia).map(([key, social]) => (
                  <li key={key}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-blue-300 transition-colors duration-300 text-sm sm:text-base"
                      aria-label={`Perfil de ${social.label}`}
                      onClick={() => handleSocialClick(key)}
                    >
                      <IonIcon name={social.iconName as any} className="text-xl text-purple-400 shrink-0" />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-t border-white/10 my-8" />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm opacity-75">
              &copy; {new Date().getFullYear()} Wilmer Lynch. Todos los derechos reservados.
            </p>
            <p className="mt-2 text-xs opacity-75">
              Desarrollado con <span className="text-blue-300">React</span> y{' '}
              <span className="text-purple-300">Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;