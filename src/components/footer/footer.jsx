import React from 'react';
import BackgroundNodes from '../animations/backgrounds/bgNodes';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 text-slate-50">
      <BackgroundNodes />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 shadow-xl">
          {/* Sección de Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                Contacto
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:tuemail@gmail.com" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
                    <span className="i-ion-mail-open-outline text-xl"></span>
                    lynchwilmer@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                    <span className="i-ion-call-outline text-xl"></span>
                    +58 4265940917
                  </a>
                </li>
              </ul>
            </div>

            {/* QR WhatsApp */}
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white/10 p-3 rounded-lg hover:scale-105 transition-transform">
                <img
                  src="/qrWhatsapp"
                  alt="Código QR de WhatsApp"
                  className="w-32 h-32 object-contain"
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
                    href="https://github.com/Will855"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-300 transition-colors"
                  >
                    <span className="i-ion-logo-github text-xl"></span>
                    GitHub/Will855
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-8"></div>

          {/* Copyright */}
          <div className="text-center opacity-75">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Wilmer Lynch. Todos los derechos reservados.
            </p>
            <p className="mt-2 text-xs">Desarrollado con React y Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;