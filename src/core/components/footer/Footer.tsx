import React from 'react';
import { Link } from 'react-router-dom';
import { trackContactAttempt } from '../../utils/analytics';

// Configuración reutilizable
const CONTACT_INFO = {
  email: 'lynchwilmer@gmail.com',
  phone: '+58 4265940917',
  socialMedia: {
    github: {
      url: 'https://github.com/Will855',
      label: 'GitHub/Will855'
    },
    instagram: {
      url: 'https://www.instagram.com/techno__monster/',
      label: 'Instagram/techno_monster'
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/wilmer-lynch/',
      label: 'LinkedIn/wilmer-lynch'
    },
    whatsapp: {
      url: 'https://wa.me/+584265940917',
      label: 'WhatsApp'
    }
  }
};

const Footer: React.FC = () => {
  const handleSocialClick = (platform: string) => {
    trackContactAttempt(platform);
  };

  return (
    <footer className="relative text-slate-50">
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 shadow-xl transition-all hover:shadow-2xl">
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
                    className="flex items-center gap-2 hover:text-blue-300 transition-colors duration-300 overflow-clip"
                    aria-label="Enviar correo electrónico"
                    onClick={() => handleSocialClick('email')}
                  >
                    <span className="i-ion-mail-open-outline text-xl" aria-hidden />
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 hover:text-purple-300 transition-colors duration-300"
                    aria-label="Llamar por teléfono"
                    onClick={() => handleSocialClick('phone')}
                  >
                    <span className="i-ion-call-outline text-xl" aria-hidden />
                    {CONTACT_INFO.phone}
                  </a>
                </li>
              </ul>
            </div>

            {/* QR WhatsApp */}
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white/10 p-3 rounded-lg hover:scale-105 transition-transform duration-300">
                <img
                  src="/assets/qrWhatsapp.webp"
                  alt="Código QR para contacto por WhatsApp"
                  className="w-32 h-32 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
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
                      className="flex items-center gap-2 hover:text-blue-300 transition-colors duration-300"
                      aria-label={`Perfil de ${social.label}`}
                      onClick={() => handleSocialClick(key)}
                    >
                      <span className={`i-ion-logo-${key} text-xl`} aria-hidden />
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
            
            {/* Admin Link (Premium Glassmorphic with ping animation) */}
            <div className="mt-6 flex justify-center">
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-br from-white/10 to-white/[0.02] hover:from-white/15 hover:to-white/5 border border-white/10 hover:border-blue-400/50 shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 backdrop-blur-md group hover:scale-[1.03] active:scale-95 cursor-pointer"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                </span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-pink-300 transition-colors">
                  Acceso Administrador
                </span>
                <span className="opacity-80 group-hover:translate-x-0.5 transition-transform">🔑</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;