import React from 'react';

// Configuración reutilizable
const CONTACT_INFO = {
  email: 'lynchwilmer@gmail.com',
  phone: '+58 4265940917',
  socialMedia: {
    github: {
      url: 'https://github.com/Will855',
      label: 'GitHub/Will855'
    }
  }
};

const Footer: React.FC = () => {
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
                <li>
                  <a
                    href={CONTACT_INFO.socialMedia.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-300 transition-colors duration-300"
                    aria-label="Perfil de GitHub"
                  >
                    <span className="i-ion-logo-github text-xl" aria-hidden />
                    {CONTACT_INFO.socialMedia.github.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-t border-white/10 my-8" />

          {/* Copyright */}
          <div className="text-center opacity-75">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Wilmer Lynch. Todos los derechos reservados.
            </p>
            <p className="mt-2 text-xs">
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