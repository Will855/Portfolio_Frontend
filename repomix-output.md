This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.firebase/
  hosting.ZGlzdA.cache
.github/
  workflows/
    firebase-hosting-merge.yml
    firebase-hosting-pull-request.yml
docs/
  componentes/
    about.md
    animations.md
    cards.md
    circle-profile.md
    demos.md
    footer.md
    form.md
    input.md
    magnetic-btn.md
    navbar.md
    README.md
    utils.md
public/
  assets/
    qrWhatsapp.webp
    video.gif
    video2.gif
    video3.gif
    web1.webp
    web2.webp
    web3.webp
    web4.webp
    web5.webp
    web6.webp
    web7.webp
  profile.jpeg
src/
  core/
    components/
      admin/
        AdminDashboard.tsx
        AdminLayout.tsx
      footer/
        Footer.tsx
      navbar/
        menuResponsive.tsx
        navMenu.css
        navMenu.tsx
      LoadingScreen.tsx
      NotFoundPage.tsx
      PublicLayout.tsx
      StarsBackground.tsx
    hooks/
      useAnalytics.ts
      useAppDataReady.ts
      useContentBlock.ts
      useGsapAnimation.ts
      useNavItems.ts
    utils/
      analytics.ts
      testSupabaseConnection.ts
  modules/
    auth/
      hooks/
        useAdminAuth.ts
      pages/
        AdminLogin.tsx
    contact/
      admin/
        AdminMessages.tsx
      components/
        ContactForm.tsx
    profile/
      admin/
        AdminHero.tsx
      components/
        glitch.css
        GlitchPresentation.tsx
        WordCloud.tsx
      hooks/
        useHeroContent.ts
    projects/
      admin/
        AdminContentEditor.tsx
        AdminInfoSections.tsx
        AdminProjectsCRUD.tsx
      components/
        InformationContent.tsx
        ProjectCard.tsx
        ProjectGrid.tsx
      config/
        cards.ts
        project.ts
      hooks/
        useCards.ts
        useInfoSections.ts
        useProjectContent.ts
        useProjectsMeta.ts
      pages/
        DemosRedirectPage.tsx
        ProjectDetailsPage.tsx
        ProjectsPage.tsx
      utils/
        markdown.ts
  pages/
    Home.tsx
  shared/
    components/
      CircleProfile.tsx
      Input.tsx
      MagneticBtn.tsx
      SafeHtml.tsx
    config/
      webPlans.ts
    services/
      supabase/
        supabase.ts
        supabaseStorage.ts
    utils/
      cardAnimations.ts
      infoHandler.ts
      validation.ts
      variants.ts
  types/
    supabase.ts
    types.ts
  App.css
  App.tsx
  main.tsx
  vite-env.d.ts
supabase/
  migrations/
    20250228000001_initial_schema.sql
    20250228000002_storage.sql
    20250228000003_unify_projects.sql
    20250228000004_project_content.sql
    20250228000005_info_sections.sql
  ejemplo_contenido.sql
  README.md
.firebaserc
.gitattributes
.gitignore
DOCUMENTATION.md
eslint.config.js
firebase.json
index.html
INSTRUCCIONES_ADMIN_CONTENIDO.md
package.json
postcss.config.js
README_SISTEMA_ADMIN.md
README.md
storage.rules
tailwind.config.js
vite.config.js
```

# Files

## File: src/core/components/admin/AdminDashboard.tsx
````typescript
import React from 'react';
import { Navigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  return <Navigate to="/admin/hero" replace />;
};
````

## File: src/core/components/admin/AdminLayout.tsx
````typescript
import React, { useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../../modules/auth/hooks/useAdminAuth';

const NAV = [
  { to: '/admin/hero', label: 'Hero', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { to: '/admin/projects', label: 'Proyectos', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { to: '/admin/content', label: 'Contenido', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { to: '/admin/info', label: 'Información', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { to: '/admin/messages', label: 'Mensajes', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

export const AdminLayout: React.FC = () => {
  const { user, loading, signOut, isConfigured } = useAdminAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isConfigured) return <Navigate to="/admin/login" replace />;
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span>Cargando...</span>
        </div>
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;

  const sidebarContent = (
    <>
      <Link to="/admin" className="font-bold text-lg text-white mb-6 block" onClick={() => setSidebarOpen(false)}>
        Admin
      </Link>
      <nav className="flex flex-col gap-1">
        {NAV.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={`px-3 py-2.5 rounded-xl flex items-center gap-3 text-sm font-medium transition-all duration-200 ${
              location.pathname === to
                ? 'bg-white/10 text-white border border-white/10'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
            </svg>
            {label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-white/5 space-y-1">
        <Link
          to="/"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Ver sitio
        </Link>
        <button
          type="button"
          onClick={() => { signOut(); setSidebarOpen(false); }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar sesión
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* Mobile header */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3
                      bg-slate-900/80 backdrop-blur-xl border-b border-white/5">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-bold text-white">Admin</span>
        <div className="w-9" />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 p-5 flex flex-col">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex md:w-56 lg:w-60 md:flex-col md:fixed md:inset-y-0
                          bg-slate-900/80 backdrop-blur-xl border-r border-white/10 p-5">
          {sidebarContent}
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-56 lg:ml-60 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
````

## File: src/core/components/footer/Footer.tsx
````typescript
import React from 'react';
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
````

## File: src/core/components/navbar/menuResponsive.tsx
````typescript
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import IonIcon from '@reacticons/ionicons';
import { useNavItems } from '../../hooks/useNavItems';

function ResponsiveMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);
    const animationRef = useRef<gsap.core.Timeline | null>(null);
    const navItems = useNavItems();

    // useEffect para inicializar el estado del menú y sus elementos
    useEffect(() => {
        // Configuración inicial: oculta el menú fuera de la pantalla (a la derecha)
        gsap.set(sidebarRef.current, { x: '100%' });
        // Configuración inicial: oculta los elementos del menú con opacidad y desplazamiento
        gsap.set('.nav-item', { opacity: 0, y: 20 });

        // Limpieza: elimina cualquier animación activa al desmontar el componente
        return () => {
            animationRef.current?.kill();
        };
    }, []);

    // useEffect para manejar las animaciones cuando el estado `isOpen` cambia
    useEffect(() => {
        // Limpia cualquier animación previa
        animationRef.current?.kill();

        // Crea una nueva línea de tiempo para las animaciones
        animationRef.current = gsap.timeline({
            defaults: { ease: 'power3.inOut', duration: 0.3 }, // Configuración por defecto
            onComplete: () => {
                // Si el menú está cerrado, oculta el contenedor fuera de la pantalla
                if (!isOpen) gsap.set(sidebarRef.current, { x: '100%' });
            }
        });

        if (isOpen) {
            // Animación para abrir el menú
            animationRef.current
                .to(sidebarRef.current, {
                    x: '0%', // Mueve el menú a la posición visible
                    backdropFilter: 'blur(12px)', // Aplica un desenfoque al fondo
                    force3D: true // Mejora el rendimiento en dispositivos
                })
                .to(
                    '.nav-item',
                    {
                        y: 0, // Restablece la posición vertical
                        opacity: 1, // Hace visibles los elementos
                        stagger: 0.08, // Retraso entre elementos
                        duration: 0.25,
                        ease: 'back.out(1.2)', // Efecto de rebote
                        immediateRender: false
                    },
                    0.2 // Inicia esta animación después de 0.2 segundos
                );
        } else {
            // Animación para cerrar el menú
            animationRef.current
                .to('.nav-item', {
                    y: 20, // Desplaza los elementos hacia abajo
                    opacity: 0, // Los hace invisibles
                    stagger: -0.05, // Retraso inverso entre elementos
                    duration: 0.2
                })
                .to(
                    sidebarRef.current,
                    {
                        x: '100%', // Mueve el menú fuera de la pantalla
                        backdropFilter: 'blur(0px)', // Elimina el desenfoque
                        force3D: true
                    },
                    0 // Inicia esta animación inmediatamente
                );
        }
    }, [isOpen]); // Se ejecuta cada vez que `isOpen` cambia

    return (
        <>
            {/* Botón para abrir/cerrar el menú */}
            <button
                onClick={() => setIsOpen(!isOpen)} // Alterna el estado del menú
                className="fixed top-4 left-4 z-50 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg sm:hidden"
                aria-label="Toggle menu" // Accesibilidad
                style={{ willChange: 'transform' }} // Optimización de rendimiento
            >
                {/* Icono dinámico según el estado del menú */}
                <IonIcon
                    name={isOpen ? "close-outline" : "menu-outline"}
                    className="text-2xl text-gray-800 pt-1 px-1"
                />
            </button>

            {/* Contenedor del menú lateral */}
            <nav
                ref={sidebarRef} // Referencia para manipulación con GSAP
                className="fixed top-0 right-0 h-full w-64 z-40 bg-white/70 backdrop-blur-lg shadow-xl"
                style={{ willChange: 'transform, backdrop-filter' }} // Optimización de rendimiento
            >
                {/* Lista de elementos del menú */}
                <ul className="flex flex-col h-full justify-center items-start p-6 space-y-4">
                    {navItems.map((item) => (
                        <li
                            key={item} // Clave única para cada elemento
                            className="nav-item" // Clase para animaciones
                            style={{ willChange: 'transform, opacity' }} // Optimización
                        >
                            {/* Enlace de navegación */}
                            <NavLink
                                to={`/${item.toLowerCase()}`} // Ruta dinámica
                                className={({ isActive }) => `
                                    px-4 py-3 w-full block
                                    text-lg font-medium rounded-xl
                                    transition-colors duration-200
                                    hover:bg-gray-200/50
                                    ${isActive ? 'bg-gray-200/50' : ''}
                                `}
                                onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic
                            >
                                {item} {/* Texto del enlace */}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default ResponsiveMenu;
````

## File: src/core/components/navbar/navMenu.css
````css
@media (max-width: 460px) {
    .nav-item {
        opacity: 0;
        transform: translateY(50px);
    }
}

@media (min-width: 461px) {
    nav {
        @apply fixed top-4 left-1/2 transform -translate-x-1/2 w-auto max-w-2xl bg-transparent backdrop-filter-none;
    }
    nav ul {
        @apply flex-row justify-between px-4 py-2;
    }
    .nav-item {
        @apply mb-0 mr-4;
    }
    button {
        @apply hidden;
    }
}
````

## File: src/core/components/navbar/navMenu.tsx
````typescript
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavItems } from '../../hooks/useNavItems';

// Componente funcional NavMenu
function NavMenu() {
  const [isScrolled, setIsScrolled] = useState(false); // Estado para verificar si se ha desplazado la página

  useEffect(() => {
    // Función para manejar el evento de desplazamiento
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Cambiar el estado si se ha desplazado más de 10px
    };

    // Agregar el listener de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup: eliminar el listener al desmontar el componente
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Dependencias vacías para ejecutar solo al montar

  const navItems = useNavItems();

  return (
    <nav className={`
      fixed top-4 left-1/2 transform -translate-x-1/2 z-50
      max-w-2xl mx-auto px-4
      transition-colors duration-200 ease-in-out
      rounded-full hidden sm:block
      ${isScrolled ? 'bg-gray-200/90 backdrop-blur-sm' : 'bg-transparent'}
    `}>
      <ul className="flex justify-between items-center py-2">
        {navItems.map((item) => (
          <li key={item}>
            <NavLink 
              to={`/${item.toLowerCase()}`} // Enlace a la ruta correspondiente
              className={({ isActive }) => `
                px-4 py-2 mx-2 rounded-full
                text-md md:text-lg font-medium
                transition-colors duration-200
                hover:bg-gray-300/50
                ${isScrolled ? 'text-gray-800' : 'text-white'}
                ${isActive ? 'bg-gray-300/50' : ''}
              `}
            >
              {item} {/* Renderizar el nombre del elemento */}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavMenu;
````

## File: src/core/components/LoadingScreen.tsx
````typescript
import React from 'react';

/**
 * Pantalla de carga full-screen hasta que los datos de Supabase estén listos.
 * Evita parpadeos y renderizado dinámico incompleto.
 */
export const LoadingScreen: React.FC = () => {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-slate-200"
      role="status"
      aria-live="polite"
      aria-label="Cargando"
    >
      <div className="flex flex-col items-center gap-6">
        <div
          className="w-12 h-12 border-3 border-slate-600 border-t-blue-400 rounded-full animate-spin"
          style={{ borderWidth: '3px' }}
        />
        <p className="text-sm font-medium text-slate-400">Cargando...</p>
      </div>
    </div>
  );
};
````

## File: src/core/components/NotFoundPage.tsx
````typescript
// NotFoundPage.tsx
import React from "react";
import Glitch from "../../modules/profile/components/GlitchPresentation";

const NotFound: React.FC = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center p-8">
                <div className="mb-16">
                    <Glitch title="404" subtitle="Página no encontrada" />
                </div>
            </div>
        </>
    );
};

export default NotFound;
````

## File: src/core/components/PublicLayout.tsx
````typescript
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDataReady } from '../hooks/useAppDataReady';
import { LoadingScreen } from './LoadingScreen';
import NavMenu from './navbar/navMenu';
import BackgroundStars from './StarsBackground';
import ResponsiveMenu from './navbar/menuResponsive';
import Home from '../../pages/Home';
import { Proyects } from '../../modules/projects/pages/ProjectsPage';
import CardDetails from '../../modules/projects/pages/ProjectDetailsPage';
import NotFound from './NotFoundPage';
import Demo from '../../modules/projects/pages/DemosRedirectPage';

/**
 * Layout del sitio público. Muestra pantalla de carga hasta que hero, nav, cards,
 * projects_meta y secciones de información estén cargados desde Supabase.
 */
export const PublicLayout: React.FC = () => {
  const ready = useAppDataReady();

  if (!ready) return <LoadingScreen />;

  return (
    <>
      <NavMenu />
      <BackgroundStars />
      <ResponsiveMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/proyectos" element={<Proyects />} />
        <Route path="/page/:id" element={<CardDetails />} />
        <Route path="/demos/:projectId" element={<Demo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
````

## File: src/core/components/StarsBackground.tsx
````typescript
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const BackgroundStars = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    // Propósito: Referencia al elemento DOM que contendrá el canvas de Three.js
    // Tipo: HTMLDivElement - contenedor específico para el renderizador
    // @returns {React.RefObject<HTMLDivElement>} Referencia al contenedor del canvas
    const scene = useRef<THREE.Scene>(new THREE.Scene());
    // Propósito: Referencia a la escena 3D
    // Tipo: THREE.Scene - escena 3D de Three.js
    // @returns {React.RefObject<THREE.Scene>} Referencia a la escena 3D
    const camera = useRef<THREE.PerspectiveCamera>(
        new THREE.PerspectiveCamera(
            100,   //100 - Campo de visión vertical en grados
            window.innerWidth / window.innerHeight,  //window.innerWidth / window.innerHeight - Relación de aspecto inicial
            0.5,  //0.1 - Plano cercano (near clipping plane)
            300  //300 - Plano lejano (far clipping plane)
        )
    );
     // Renderizador con optimizaciones para transparencia y antialiasing
    const renderer = useRef<THREE.WebGLRenderer>(
        new THREE.WebGLRenderer({
            alpha: true, //true - Permite transparencia
            antialias: true //true - Suaviza los bordes
        })
    );

    const stars = useRef<THREE.Points>(new THREE.Points());
    // Referencia a las estrellas 3D

/**
 * useEffect para configurar la escena 3D y las estrellas
 * @returns {void}
 */
    useEffect(() => {
        // Verificar si el contenedor existe
        if (!containerRef.current) return;

        // Configurar renderizador 3D
        renderer.current = new THREE.WebGLRenderer({
            alpha: true, //true - Permite transparencia
            antialias: true //true - Suaviza los bordes
        });
        // Ajustar el tamaño del canvas al viewport
        renderer.current.setSize(window.innerWidth, window.innerHeight);
        // Optimizar para pantallas de alta densidad
        renderer.current.setPixelRatio(window.devicePixelRatio);
        // Agregar el canvas al DOM
        containerRef.current.appendChild(renderer.current.domElement);

        // Configurar cámara    
        camera.current.position.z = 5;

        // Crear estrellas
        const starGeometry = new THREE.BufferGeometry();
        // Número de estrellas
        const starCount = 500;
        // Array de posiciones
        const positions = new Float32Array(starCount * 3);
        // Loop para generar posiciones aleatorias
        for (let i = 0; i < starCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100; // X
            positions[i + 1] = (Math.random() - 0.5) * 100; // Y
            positions[i + 2] = (Math.random() - 0.5) * 100; // Z
        }

        // Asignar las posiciones a la geometría
        starGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        // Material para renderizar las estrellas
        const starMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF, // Blanco
            size: 0.2, // Tamaño de las estrellas
            transparent: true, //true - Permite transparencia
            opacity: 0.8, // Opacidad de las estrellas
            blending: THREE.AdditiveBlending // AdditiveBlending - Las estrellas se suman en lugar de mezclarse
        });
        // Crear las estrellas
        stars.current = new THREE.Points(starGeometry, starMaterial);
        // Agregar las estrellas a la escena
        scene.current.add(stars.current);

        // Animación
        const animate = () => {
            // Solicitar el próximo frame de animación
            requestAnimationFrame(animate);

            // Actualizar posiciones
            const positions = starGeometry.attributes.position.array as Float32Array;
            // Loop para actualizar las posiciones
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] -= 0.3; // Velocidad de caída
                if (positions[i + 1] < -50) positions[i + 1] = 50; // Reiniciar posición
            }

            // Marcar que la geometría ha cambiado
            starGeometry.attributes.position.needsUpdate = true;

            // Renderizar la escena
            if (renderer.current) {
                // Renderizar la escena
                renderer.current.render(scene.current, camera.current);
            }
        };

        // Manejar resize
        const handleResize = () => {
            // Actualizar la relación de aspecto de la cámara
            camera.current.aspect = window.innerWidth / window.innerHeight;
            // Actualizar la matriz de proyección
            camera.current.updateProjectionMatrix();
            // Ajustar el tamaño del canvas al viewport
            renderer.current?.setSize(window.innerWidth, window.innerHeight);
        };

        // Agregar el listener de resize
        window.addEventListener("resize", handleResize);
        // Iniciar la animación
        animate();

        return () => {
            // Eliminar el listener de resize
            window.removeEventListener("resize", handleResize);
            // Eliminar el canvas del DOM
            if (containerRef.current && renderer.current?.domElement) {
                containerRef.current.removeChild(renderer.current.domElement);
            }
            // Liberar memoria de la geometría
            starGeometry.dispose();
            // Liberar memoria del material
            starMaterial.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            // Div contenedor con posición fija, tamaño completo y overflow oculto
            className="fixed inset-0 w-full h-full overflow-hidden" 
            style={{
                // Estilos para el div contenedor
                zIndex: -1, // -1 - Va detrás del contenido
                // Gradiente de negro a azul oscuro
                background: "linear-gradient(to bottom, #000000 0%, #1a1a2e 100%)", 
            }}
        />
    );
};

export default BackgroundStars;

// ===========================================
// 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
// ===========================================
// 
// Este archivo es un COMPONENTE REACT que crea un fondo animado de estrellas
// usando Three.js (WebGL). Es un ejemplo perfecto de cómo integrar gráficos
// 3D en una aplicación React. Te explico paso a paso qué hace cada parte:
//
// 🎯 ¿QUÉ ES ESTE ARCHIVO?
// Es un componente que renderiza un fondo de estrellas animadas que caen
// hacia abajo, creando un efecto visual atractivo para el portfolio.
// Usa WebGL (a través de Three.js) para renderizado de alto rendimiento.
//
// 📋 DESGLOSE POR SECCIONES:
//
// 1. IMPORTS Y DEPENDENCIAS (líneas 1-2):
//    - React: useEffect, useRef para manejo de ciclo de vida
//    - THREE: Biblioteca de gráficos 3D para WebGL
//    - ¿Por qué Three.js? Simplifica el trabajo con WebGL
//
// 2. REFS PARA PERSISTENCIA (líneas 5-11):
//    - containerRef: Referencia al div contenedor
//    - scene: Escena 3D donde están todos los objetos
//    - camera: Cámara que define la perspectiva
//    - renderer: Motor que convierte la escena 3D en imagen 2D
//    - stars: Objeto que contiene todas las estrellas
//    - ¿Por qué useRef? Persiste entre renders sin causar re-renders
//
// 3. CONFIGURACIÓN INICIAL (líneas 13-26):
//    - Verificación de contenedor: if (!containerRef.current) return
//    - WebGL Renderer: Motor de renderizado con transparencia y antialiasing
//    - setSize: Ajusta el tamaño del canvas al viewport
//    - setPixelRatio: Optimiza para pantallas de alta densidad
//    - appendChild: Inserta el canvas en el DOM
//    - Cámara: Posicionada en z=5 para ver las estrellas
//
// 4. CREACIÓN DE ESTRELLAS (líneas 28-53):
//    - BufferGeometry: Estructura de datos optimizada para GPU
//    - starCount = 500: Número de estrellas a crear
//    - Float32Array: Array tipado para mejor rendimiento
//    - Loop de posiciones: Genera coordenadas aleatorias en 3D
//    - setAttribute: Asigna las posiciones a la geometría
//    - PointsMaterial: Material para renderizar puntos
//    - AdditiveBlending: Las estrellas se suman en lugar de mezclarse
//
// 5. SISTEMA DE ANIMACIÓN (líneas 55-72):
//    - requestAnimationFrame: Sincroniza con el refresh rate del monitor
//    - Loop infinito: animate() se llama a sí misma
//    - Actualización de posiciones: Mueve estrellas hacia abajo
//    - Reinicio: Cuando una estrella sale por abajo, reaparece arriba
//    - needsUpdate: Marca que la geometría ha cambiado
//    - render: Dibuja la escena en el canvas
//
// 6. MANEJO DE RESIZE (líneas 74-82):
//    - handleResize: Función que ajusta la cámara y renderer
//    - aspect ratio: Mantiene la proporción correcta
//    - updateProjectionMatrix: Recalcula la perspectiva
//    - setSize: Ajusta el tamaño del canvas
//    - addEventListener: Escucha cambios de tamaño de ventana
//
// 7. CLEANUP (líneas 84-91):
//    - removeEventListener: Limpia el listener de resize
//    - removeChild: Remueve el canvas del DOM
//    - dispose: Libera memoria de geometría y material
//    - ¿Por qué es importante? Previene memory leaks
//
// 8. RENDER (líneas 94-103):
//    - div contenedor: Elemento donde se monta el canvas
//    - fixed inset-0: Cubre toda la pantalla
//    - zIndex: -1: Va detrás del contenido
//    - background: Gradiente de negro a azul oscuro
//
// 🎨 CONCEPTOS DE THREE.JS:
//
// 1. ESCENA 3D:
//    - Scene: Contenedor de todos los objetos 3D
//    - Camera: Define desde dónde y cómo vemos la escena
//    - Renderer: Convierte la escena 3D en imagen 2D
//
// 2. GEOMETRÍA Y MATERIALES:
//    - BufferGeometry: Estructura optimizada para GPU
//    - PointsMaterial: Material específico para puntos
//    - BufferAttribute: Datos organizados para el shader
//
// 3. ANIMACIÓN:
//    - requestAnimationFrame: Loop de animación optimizado
//    - needsUpdate: Sistema de invalidación de Three.js
//    - render: Comando para dibujar la escena
//
// ⚡ OPTIMIZACIONES DE RENDIMIENTO:
//
// 1. BUFFER GEOMETRY:
//    - Float32Array: Arrays tipados son más rápidos
//    - BufferAttribute: Datos organizados para GPU
//    - needsUpdate: Solo actualiza cuando es necesario
//
// 2. MEMORY MANAGEMENT:
//    - dispose(): Libera memoria de geometría y materiales
//    - removeChild(): Limpia el DOM
//    - removeEventListener(): Evita memory leaks
//
// 3. RENDERING:
//    - setPixelRatio(): Optimiza para pantallas Retina
//    - antialias: true: Suaviza los bordes
//    - alpha: true: Permite transparencia
//
// 🎯 PATRONES APLICADOS:
//
// 1. IMPERATIVE PROGRAMMING:
//    - Three.js es imperativo (comandos directos)
//    - React es declarativo (describe qué quieres)
//    - useEffect: Puente entre ambos paradigmas
//
// 2. RESOURCE MANAGEMENT:
//    - Cleanup en useEffect: Libera recursos
//    - Event listeners: Se limpian automáticamente
//    - Memory disposal: Evita leaks
//
// 3. SEPARATION OF CONCERNS:
//    - React maneja el DOM y ciclo de vida
//    - Three.js maneja los gráficos 3D
//    - useRef: Comunicación entre ambos
//
// 🚀 FLUJO DE EJECUCIÓN:
// 1. Componente se monta
// 2. useEffect se ejecuta
// 3. Se crea la escena 3D
// 4. Se generan las estrellas
// 5. Se inicia el loop de animación
// 6. Las estrellas caen continuamente
// 7. Al desmontar, se limpia todo
//
// 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
// - Integración de WebGL con React
// - Gestión de recursos 3D
// - Animaciones con requestAnimationFrame
// - Optimización de memoria
// - Event handling en componentes 3D
// - Cleanup patterns
// - Buffer geometry y shaders
//
// ¡Es un ejemplo excelente de cómo crear efectos visuales impresionantes!
// ===========================================
````

## File: src/core/hooks/useAnalytics.ts
````typescript
/**
 * @file useAnalytics.ts
 * @description Hook que activa el tracking de analytics en la página actual:
 * tiempo en página (cada 30s y al desmontar) y profundidad de scroll (porcentaje máximo).
 * Delega en utilidades de ../utils/analytics (p. ej. Google Analytics 4).
 */
import { useEffect, useRef } from 'react';
import { trackTimeOnPage, trackScrollDepth } from '../utils/analytics';

/**
 * Hook que registra tiempo en página y profundidad de scroll para analytics.
 * Se ejecuta al montar y limpia intervalos/listeners al desmontar.
 * Tiempo: cada 30 segundos y tiempo final al desmontar.
 * Scroll: porcentaje cuando supera el máximo anterior.
 * @example
 * function MyPage() {
 *   useAnalytics();
 *   return <div>...</div>;
 * }
 */
export const useAnalytics = () => {
  const startTime = useRef(Date.now());
  const maxScrollDepth = useRef(0);

  useEffect(() => {
    // Tracking de tiempo en página
    const timeInterval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      trackTimeOnPage(timeSpent);
    }, 30000); // Cada 30 segundos

    // Tracking de profundidad de scroll
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const scrollPercentage = Math.round((currentScroll / scrollHeight) * 100);
      
      if (scrollPercentage > maxScrollDepth.current) {
        maxScrollDepth.current = scrollPercentage;
        trackScrollDepth(scrollPercentage);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
      
      // Enviar tiempo final al desmontar
      const finalTimeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      trackTimeOnPage(finalTimeSpent);
    };
  }, []);
};
````

## File: src/core/hooks/useAppDataReady.ts
````typescript
/**
 * @file useAppDataReady.ts
 * @description Hook que indica si todos los datos solicitados a la base de datos
 * (hero, nav, cards, projects_meta, secciones de información) han llegado.
 * Usado para mostrar una pantalla de carga hasta que la app pueda renderizar sin parpadeos.
 */
import { useContentBlock } from './useContentBlock';
import { useHeroContent } from '../../modules/profile/hooks/useHeroContent';
import { useCards } from '../../modules/projects/hooks/useCards';
import { useProjectsMeta } from '../../modules/projects/hooks/useProjectsMeta';
import { useSkillSections, useKnowledgeSections } from '../../modules/projects/hooks/useInfoSections';
import { isSupabaseConfigured } from '../../shared/services/supabase/supabase';

/**
 * Indica si los datos críticos del sitio público están listos.
 * Cuando Supabase no está configurado, devuelve true para no bloquear la app.
 */
export function useAppDataReady(): boolean {
  const { isLoading: navLoading } = useContentBlock('nav_items');
  const { isLoading: heroLoading } = useHeroContent();
  const { isLoading: cardsLoading } = useCards();
  const { isLoading: metaLoading } = useProjectsMeta();
  const { isLoading: skillsLoading } = useSkillSections();
  const { isLoading: knowledgesLoading } = useKnowledgeSections();

  if (!isSupabaseConfigured) return true;

  return !(
    navLoading ||
    heroLoading ||
    cardsLoading ||
    metaLoading ||
    skillsLoading ||
    knowledgesLoading
  );
}
````

## File: src/core/hooks/useContentBlock.ts
````typescript
/**
 * @file useContentBlock.ts
 * @description Hooks para leer bloques de contenido genérico (content_blocks) desde Supabase.
 * Los bloques se identifican por una clave (key) y pueden ser tipo 'html' o 'json'.
 * Usado para ítems de navegación, secciones about, footer, etc.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../shared/services/supabase/supabase';
import type { ContentBlockRow } from '../../types/supabase';

/**
 * Obtiene un único bloque de contenido por su clave desde la tabla content_blocks.
 * @param key - Clave única del bloque (ej: 'nav_items', 'footer_contact')
 * @returns Fila del bloque o null si no existe o hay error
 * @internal
 */
async function fetchContentBlock(key: string): Promise<ContentBlockRow | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('content_blocks')
    .select('*')
    .eq('key', key)
    .single();
  if (error || !data) return null;
  return data as ContentBlockRow;
}

/**
 * Hook que expone un bloque de contenido por clave.
 * Útil para contenido editable desde el admin (nav, about, footer).
 * @param key - Clave del bloque; si es null, la query no se ejecuta
 * @returns block, isLoading, error y refetch
 * @example
 * const { block, isLoading } = useContentBlock('nav_items');
 * const items = block?.type === 'json' ? JSON.parse(block.content) : [];
 */
export function useContentBlock(key: string | null) {
  const q = useQuery({
    queryKey: ['content_block', key],
    queryFn: () => fetchContentBlock(key!),
    enabled: Boolean(key),
    staleTime: 5 * 60 * 1000,
  });
  return {
    block: q.data ?? null,
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}

/**
 * Hook que obtiene varios bloques de contenido en paralelo por sus claves.
 * @param keys - Lista de claves de bloques
 * @returns blocks (mapa clave -> bloque), isLoading y queries
 * @example
 * const { blocks, isLoading } = useContentBlocks(['nav_items', 'footer_contact']);
 */
export function useContentBlocks(keys: string[]) {
  const queries = keys.map((key) => useContentBlock(key));
  const blocks = Object.fromEntries(
    keys.map((key, i) => [key, queries[i].block])
  );
  const isLoading = queries.some((q) => q.isLoading);
  return { blocks, isLoading, queries };
}
````

## File: src/core/hooks/useGsapAnimation.ts
````typescript
// Importaciones necesarias
import { useEffect, useRef } from 'react'; // Hooks de React
import { gsap } from 'gsap'; // Librería para animaciones

// Hook personalizado: useGsapAnimation
// Este hook aplica una animación de borde luminoso a un elemento referenciado.
const useGsapAnimation = (ref: React.RefObject<HTMLElement | null>) => {
    // Referencia para almacenar la línea de tiempo de GSAP
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!ref.current) return;
        // Crea una línea de tiempo de GSAP con animación infinita (repetición y efecto yoyo)
        timelineRef.current = gsap.timeline({ repeat: -1, yoyo: true });

        // Define la animación: un efecto de sombra luminosa
        timelineRef.current.to(ref.current, {
            boxShadow: '0 0 20px rgba(240, 248, 255, 0.5)', // Sombra luminosa
            duration: 2, // Duración de la animación
            repeat: -1, // Repetición infinita
            yoyo: true, // Efecto de ida y vuelta
        });

        // Limpieza: elimina la animación al desmontar el componente
        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill(); // Detiene y elimina la animación
            }
        };
    }, [ref]); // Dependencia: se ejecuta cuando cambia la referencia
};

export default useGsapAnimation; // Exporta el hook para su uso en otros componentes
````

## File: src/core/hooks/useNavItems.ts
````typescript
/**
 * @file useNavItems.ts
 * @description Hook que devuelve los ítems de navegación del sitio.
 * Lee el bloque 'nav_items' desde content_blocks (JSON array de strings).
 * Si no existe o falla el parse, usa un array por defecto.
 */
import { useContentBlock } from './useContentBlock';

/** Ítems de navegación por defecto cuando no hay datos en Supabase o el JSON es inválido. */
const DEFAULT_NAV_ITEMS = ['Inicio', 'Proyectos'];

/** Ítems que no deben mostrarse en el navbar (páginas eliminadas o unificadas en Home). */
const EXCLUDED_NAV_ITEMS = ['Informacion', 'Contacto', 'Planes'];

function filterNavItems(items: string[]): string[] {
  return items.filter((label) => !EXCLUDED_NAV_ITEMS.includes(label));
}

/**
 * Hook que expone la lista de etiquetas de navegación para el menú principal.
 * Obtiene el contenido del bloque 'nav_items' (tipo json) y lo parsea como array de strings.
 * Excluye Información, Contacto y Planes para que no aparezcan en el navbar.
 * @returns Array de etiquetas para los enlaces del nav
 * @example
 * const navItems = useNavItems();
 * return <nav>{navItems.map(label => <Link key={label}>{label}</Link>)}</nav>;
 */
export function useNavItems(): string[] {
  const { block } = useContentBlock('nav_items');
  if (!block || block.type !== 'json') return DEFAULT_NAV_ITEMS;
  try {
    const parsed = JSON.parse(block.content) as unknown;
    const items = Array.isArray(parsed) && parsed.every((x) => typeof x === 'string')
      ? (parsed as string[])
      : DEFAULT_NAV_ITEMS;
    const filtered = filterNavItems(items);
    return filtered.length > 0 ? filtered : DEFAULT_NAV_ITEMS;
  } catch {
    return DEFAULT_NAV_ITEMS;
  }
}
````

## File: src/core/utils/analytics.ts
````typescript
import GA4 from 'react-ga4';

// Eventos de navegación
export const trackPageView = (path: string) => {
  GA4.send({
    hitType: 'pageview',
    page: path
  });
};

// Eventos de interacción
export const trackButtonClick = (buttonName: string, buttonLocation: string) => {
  GA4.event({
    category: 'Button Click',
    action: buttonName,
    label: buttonLocation
  });
};

// Eventos de tiempo
export const trackTimeOnPage = (timeInSeconds: number) => {
  GA4.event({
    category: 'Time',
    action: 'Time on Page',
    value: timeInSeconds
  });
};

// Eventos de scroll
export const trackScrollDepth = (depth: number) => {
  GA4.event({
    category: 'Scroll',
    action: 'Scroll Depth',
    value: depth
  });
};

// Eventos de conversión
export const trackConversion = (conversionType: string, value?: number) => {
  GA4.event({
    category: 'Conversion',
    action: conversionType,
    value: value
  });
};

// Eventos de interacción con planes
export const trackPlanInteraction = (planName: string, action: string) => {
  GA4.event({
    category: 'Plan Interaction',
    action: action,
    label: planName
  });
};

// Eventos de contacto
export const trackContactAttempt = (method: string) => {
  GA4.event({
    category: 'Contact',
    action: 'Contact Attempt',
    label: method
  });
};

// Eventos de navegación entre secciones
export const trackSectionNavigation = (fromSection: string, toSection: string) => {
  GA4.event({
    category: 'Navigation',
    action: 'Section Change',
    label: `${fromSection} to ${toSection}`
  });
};
````

## File: src/core/utils/testSupabaseConnection.ts
````typescript
import { supabase } from '../../shared/services/supabase/supabase';

export type ConnectionTestResult =
  | { ok: true }
  | { ok: false; error: string };

export async function testSupabaseConnection(): Promise<ConnectionTestResult> {
  try {
    const { error } = await supabase.from('hero_content').select('id').limit(1).maybeSingle();
    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error desconocido';
    return { ok: false, error: message };
  }
}
````

## File: src/modules/auth/hooks/useAdminAuth.ts
````typescript
/**
 * @file useAdminAuth.ts
 * @description Hook de autenticación para el panel de administración.
 * Gestiona sesión de Supabase Auth, login, registro y cierre de sesión.
 * Solo usuarios cuyo email está en la tabla `admin_emails` pueden acceder al admin.
 */
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import type { User, Session } from '@supabase/supabase-js';

/**
 * Hook que proporciona estado de autenticación y métodos para iniciar/cerrar sesión en el admin.
 * Suscribe a cambios de sesión con onAuthStateChange y expone user, session y loading.
 * @returns Objeto con user, session, loading, signIn, signOut e isConfigured
 * @example
 * const { user, loading, signIn, signOut, isConfigured } = useAdminAuth();
 * if (!isConfigured) return <SetupMessage />;
 * if (!user) return <LoginForm onSubmit={signIn} />;
 * return <AdminPanel />;
 */
export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  /**
   * Inicia sesión con email y contraseña.
   * @param email - Correo del usuario
   * @param password - Contraseña
   * @returns Resultado de signInWithPassword de Supabase
   */
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  /**
   * Cierra la sesión actual del usuario.
   */
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, session, loading, signIn, signOut, isConfigured: isSupabaseConfigured };
}
````

## File: src/modules/auth/pages/AdminLogin.tsx
````typescript
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { testSupabaseConnection, type ConnectionTestResult } from '../../../core/utils/testSupabaseConnection';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dbTest, setDbTest] = useState<ConnectionTestResult | null>(null);
  const { user, loading: authLoading, signIn, isConfigured } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConfigured) return;
    testSupabaseConnection().then(setDbTest);
  }, [isConfigured]);

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200 p-4">
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 max-w-sm text-center">
          <p className="text-slate-300">Supabase no está configurado. Añade <code className="text-blue-400">VITE_SUPABASE_URL</code> y <code className="text-blue-400">VITE_SUPABASE_ANON_KEY</code> en .env</p>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span>Cargando...</span>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err.message ?? 'Error al iniciar sesión');
      return;
    }
    navigate('/admin', { replace: true });
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200 p-4">
      <div className="w-full max-w-sm space-y-3">
        {dbTest && !dbTest.ok && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-300">
            <strong>Base de datos:</strong> {dbTest.error}
            <p className="mt-1 text-xs text-red-400/70">Comprueba que las migraciones estén aplicadas en Supabase (SQL Editor).</p>
          </div>
        )}
        {dbTest?.ok && (
          <p className="text-center text-xs text-emerald-400">Conexión a la base de datos correcta</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white/5 backdrop-blur-xl p-6 sm:p-8 border border-white/10"
        >
          <h1 className="text-xl font-bold text-center text-white">Admin</h1>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                         text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                         focus:ring-1 focus:ring-blue-500/20 transition-all"
              placeholder="tu@email.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                         text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                         focus:ring-1 focus:ring-blue-500/20 transition-all"
              placeholder="••••••"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
                       text-white font-medium hover:from-blue-500 hover:to-blue-400
                       transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50
                       disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};
````

## File: src/modules/contact/admin/AdminMessages.tsx
````typescript
import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import type { ContactSubmissionRow } from '../../../types/supabase';

export const AdminMessages: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: messages, isLoading } = useQuery({
    queryKey: ['contact_submissions'],
    queryFn: async () => {
      const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as ContactSubmissionRow[];
    },
    enabled: isSupabaseConfigured,
  });

  const deleteMessage = async (id: string) => {
    await supabase.from('contact_submissions').delete().eq('id', id);
    queryClient.invalidateQueries({ queryKey: ['contact_submissions'] });
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <p className="text-slate-400">Supabase no configurado.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Mensajes de contacto</h2>
        <div className="flex items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400">Cargando mensajes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl font-bold text-white">Mensajes de contacto</h2>
        {messages && messages.length > 0 && (
          <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400">
            {messages.length} mensaje{messages.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {!messages?.length ? (
        <div className="text-center py-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <svg className="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-slate-400 text-lg">No hay mensajes</p>
          <p className="text-slate-500 text-sm mt-1">Los mensajes del formulario de contacto aparecerán aquí</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className="group rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10
                         p-4 sm:p-5 space-y-3 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.07]"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-white truncate">{m.name}</p>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-sm text-blue-400 hover:text-blue-300 truncate block transition-colors"
                  >
                    {m.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-500">
                    {new Date(m.created_at).toLocaleDateString('es', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </span>
                  <button
                    onClick={() => deleteMessage(m.id)}
                    className="p-1.5 rounded-lg text-slate-500 opacity-0 group-hover:opacity-100
                               hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Eliminar"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Phone */}
              {m.phone && (
                <div className="flex items-center gap-1.5 text-sm text-slate-400">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {m.phone}
                </div>
              )}

              {/* Message */}
              <div className="pt-2 border-t border-white/5">
                <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{m.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
````

## File: src/modules/contact/components/ContactForm.tsx
````typescript
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
````

## File: src/modules/profile/admin/AdminHero.tsx
````typescript
import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../shared/services/supabase/supabase';
import { useHeroContent } from '../hooks/useHeroContent';
import { STORAGE_BUCKET } from '../../../types/supabase';

const DEFAULT_TITLE = 'Wilmer Lynch';
const DEFAULT_SUBTITLE = 'Web Developer';

export const AdminHero: React.FC = () => {
  const { hero } = useHeroContent();
  const safeHero = hero ?? { title: DEFAULT_TITLE, subtitle: DEFAULT_SUBTITLE, profile_image_url: '/profile.jpeg' };
  const [title, setTitle] = useState(safeHero.title);
  const [subtitle, setSubtitle] = useState(safeHero.subtitle);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setTitle(safeHero.title);
    setSubtitle(safeHero.subtitle);
  }, [safeHero.title, safeHero.subtitle]);

  const saveText = async () => {
    setSaving(true);
    await supabase.from('hero_content').update({ title, subtitle, updated_at: new Date().toISOString() }).eq('id', 'default');
    queryClient.invalidateQueries({ queryKey: ['hero_content'] });
    setSaving(false);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `avatars/profile.${file.name.split('.').pop() || 'jpeg'}`;
    await supabase.storage.from(STORAGE_BUCKET).upload(path, file, { upsert: true });
    await supabase.from('hero_content').update({ profile_image_path: path, updated_at: new Date().toISOString() }).eq('id', 'default');
    queryClient.invalidateQueries({ queryKey: ['hero_content'] });
    setUploading(false);
    e.target.value = '';
  };

  const imgSrc = safeHero.profile_image_url?.startsWith('http') || safeHero.profile_image_url?.startsWith('/')
    ? safeHero.profile_image_url
    : '/profile.jpeg';

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Hero</h2>

      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 sm:p-6 space-y-6">
        {/* Profile image */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <img
            src={imgSrc}
            alt=""
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover bg-slate-700 border-2 border-white/10 shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).src = '/profile.jpeg'; }}
          />
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <label className="block text-sm font-medium text-slate-300">Foto de perfil</label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              disabled={uploading}
              className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4
                         file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                         file:font-medium file:cursor-pointer hover:file:bg-white/15
                         file:transition-all cursor-pointer"
            />
            {uploading && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                Subiendo...
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300">Título</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                       text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                       focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Subtitle */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300">Subtítulo</label>
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                       text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                       focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Save */}
        <button
          onClick={saveText}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
                     text-white font-medium hover:from-blue-500 hover:to-blue-400
                     transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50
                     disabled:cursor-not-allowed active:scale-95 flex items-center gap-2"
        >
          {saving && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {saving ? 'Guardando...' : 'Guardar textos'}
        </button>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-slate-300">Vista previa</h3>
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 flex flex-col items-center gap-4">
          <img
            src={imgSrc}
            alt=""
            className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
            onError={(e) => { (e.target as HTMLImageElement).src = '/profile.jpeg'; }}
          />
          <div className="text-center">
            <h4 className="text-2xl sm:text-3xl font-bold text-white">{title || DEFAULT_TITLE}</h4>
            <p className="text-slate-400 mt-1">{subtitle || DEFAULT_SUBTITLE}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
````

## File: src/modules/profile/components/glitch.css
````css
/* Estilos para el texto con efecto glitch */
.glitch-text {
    position: relative; /* Posicionamiento relativo para los pseudo-elementos */
    display: inline-block; /* Permitir que el texto se comporte como un bloque en línea */
}

/* Pseudo-elementos para crear el efecto glitch */
.glitch-text::before,
.glitch-text::after {
    content: attr(data-text); /* Usar el texto del atributo data-text */
    position: absolute; /* Posicionamiento absoluto para superponer los elementos */
    top: 0; /* Alinear al top */
    left: 0; /* Alinear a la izquierda */
    width: 100%; /* Ancho completo del contenedor */
    height: 100%; /* Alto completo del contenedor */
}

/* Estilos para el pseudo-elemento antes */
.glitch-text::before {
    left: 2px; /* Desplazar ligeramente a la derecha */
    text-shadow: -2px 0 #ff00c1; /* Sombra de texto en color rosa */
    clip: rect(24px, 550px, 90px, 0); /* Recortar el texto para crear el efecto glitch */
    animation: glitch-anim-1 3s infinite linear alternate-reverse; /* Animación del glitch */
}

/* Estilos para el pseudo-elemento después */
.glitch-text::after {
    left: -2px; /* Desplazar ligeramente a la izquierda */
    text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1; /* Sombra de texto en colores cian y rosa */
    animation: glitch-anim-2 2s infinite linear alternate-reverse; /* Animación del glitch */
}

/* Animación para el pseudo-elemento antes */
@keyframes glitch-anim-1 {
    0% { clip: rect(51px, 9999px, 28px, 0); }
    10% { clip: rect(33px, 9999px, 60px, 0); }
    20% { clip: rect(74px, 9999px, 71px, 0); }
    30% { clip: rect(41px, 9999px, 98px, 0); }
    40% { clip: rect(16px, 9999px, 35px, 0); }
    50% { clip: rect(89px, 9999px, 24px, 0); }
    60% { clip: rect(22px, 9999px, 53px, 0); }
    70% { clip: rect(68px, 9999px, 15px, 0); }
    80% { clip: rect(39px, 9999px, 99px, 0); }
    90% { clip: rect(81px, 9999px, 77px, 0); }
    100% { clip: rect(10px, 9999px, 47px, 0); }
}

/* Animación para el pseudo-elemento después */
@keyframes glitch-anim-2 {
    0% { clip: rect(18px, 9999px, 82px, 0); }
    10% { clip: rect(64px, 9999px, 31px, 0); }
    20% { clip: rect(95px, 9999px, 4px, 0); }
    30% { clip: rect(7px, 9999px, 69px, 0); }
    40% { clip: rect(52px, 9999px, 26px, 0); }
    50% { clip: rect(13px, 9999px, 86px, 0); }
    60% { clip: rect(79px, 9999px, 11px, 0); }
    70% { clip: rect(36px, 9999px, 93px, 0); }
    80% { clip: rect(46px, 9999px, 21px, 0); }
    90% { clip: rect(57px, 9999px, 73px, 0); }
    100% { clip: rect(30px, 9999px, 88px, 0); }
}

/* ===========================================
 * 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
 * ===========================================
 * 
 * Este archivo CSS crea un EFECTO GLITCH avanzado usando pseudo-elementos
 * y animaciones CSS. Es un ejemplo perfecto de cómo crear efectos visuales
 * impresionantes usando solo CSS. Te explico paso a paso qué hace cada parte:
 *
 * 🎯 ¿QUÉ ES ESTE ARCHIVO?
 * Es un archivo CSS que implementa un efecto de "glitch" (interferencia digital)
 * en texto, simulando errores de visualización como los que se ven en
 * películas de ciencia ficción. Usa técnicas avanzadas de CSS para crear
 * el efecto sin JavaScript.
 *
 * 📋 DESGLOSE POR SECCIONES:
 *
 * 1. CLASE PRINCIPAL (líneas 2-5):
 *    - .glitch-text: Clase base para aplicar el efecto
 *    - position: relative: Permite posicionar pseudo-elementos
 *    - display: inline-block: Comportamiento híbrido inline/block
 *    - ¿Por qué relative? Los pseudo-elementos necesitan un contenedor
 *
 * 2. PSEUDO-ELEMENTOS BASE (líneas 8-16):
 *    - ::before y ::after: Crean capas adicionales del texto
 *    - content: attr(data-text): Usa el texto del atributo data-text
 *    - position: absolute: Superpone las capas sobre el texto original
 *    - top: 0, left: 0: Alineación perfecta con el texto original
 *    - width: 100%, height: 100%: Mismo tamaño que el contenedor
 *    - ¿Por qué pseudo-elementos? Crean capas sin HTML adicional
 *
 * 3. CAPA ROSA (líneas 19-24):
 *    - left: 2px: Desplazamiento hacia la derecha
 *    - text-shadow: -2px 0 #ff00c1: Sombra rosa hacia la izquierda
 *    - clip: rect(): Recorta el texto para crear el efecto glitch
 *    - animation: glitch-anim-1: Animación de 3 segundos
 *    - alternate-reverse: Alterna la dirección de la animación
 *
 * 4. CAPA CIAN (líneas 27-31):
 *    - left: -2px: Desplazamiento hacia la izquierda
 *    - text-shadow: Doble sombra en cian y rosa
 *    - animation: glitch-anim-2: Animación de 2 segundos
 *    - Diferente timing: Crea desincronización visual
 *
 * 5. ANIMACIÓN 1 (líneas 34-46):
 *    - @keyframes: Define los pasos de la animación
 *    - clip: rect(): Recorta diferentes partes del texto
 *    - Valores aleatorios: Simulan interferencia digital
 *    - 10 pasos: 0%, 10%, 20%... hasta 100%
 *    - ¿Por qué rect()? Permite recortar formas rectangulares
 *
 * 6. ANIMACIÓN 2 (líneas 49-61):
 *    - Misma estructura que la animación 1
 *    - Valores diferentes: Crea desincronización
 *    - Timing diferente: 2s vs 3s
 *    - Efecto de interferencia: Las dos capas se superponen
 *
 * 🎨 CONCEPTOS DE CSS AVANZADO:
 *
 * 1. PSEUDO-ELEMENTOS:
 *    - ::before: Crea un elemento antes del contenido
 *    - ::after: Crea un elemento después del contenido
 *    - content: attr(): Usa el valor de un atributo HTML
 *    - position: absolute: Posicionamiento independiente
 *
 * 2. CLIP PROPERTY:
 *    - rect(top, right, bottom, left): Define un rectángulo
 *    - Valores en píxeles: Controla qué parte se muestra
 *    - 9999px: Valor grande para el ancho (truco para clip)
 *    - ¿Por qué clip? Permite mostrar solo partes del elemento
 *
 * 3. TEXT-SHADOW:
 *    - Múltiples sombras: Separa colores
 *    - Desplazamiento: Crea efecto de separación
 *    - Colores vibrantes: #ff00c1 (rosa), #00fff9 (cian)
 *    - ¿Por qué sombras? Simula interferencia de color
 *
 * 4. ANIMACIONES CSS:
 *    - @keyframes: Define los pasos de la animación
 *    - infinite: Repetición infinita
 *    - linear: Velocidad constante
 *    - alternate-reverse: Alterna dirección
 *    - Diferentes duraciones: Crea desincronización
 *
 * ⚡ TÉCNICAS AVANZADAS:
 *
 * 1. LAYERING:
 *    - Múltiples capas: Texto original + 2 pseudo-elementos
 *    - Superposición: Las capas se superponen
 *    - Desplazamiento: Cada capa se mueve independientemente
 *    - ¿Por qué capas? Crea profundidad visual
 *
 * 2. CLIPPING:
 *    - rect(): Función de recorte rectangular
 *    - Valores aleatorios: Simulan interferencia
 *    - Animación: Cambia qué parte se muestra
 *    - ¿Por qué clipping? Crea el efecto de "corte"
 *
 * 3. COLOR SEPARATION:
 *    - RGB separation: Separa colores primarios
 *    - text-shadow: Crea sombras de colores
 *    - Desplazamiento: Separa los colores
 *    - ¿Por qué separación? Simula error de display
 *
 * 4. TIMING:
 *    - Diferentes duraciones: 2s vs 3s
 *    - Desincronización: Las animaciones no coinciden
 *    - alternate-reverse: Cambia dirección
 *    - ¿Por qué timing diferente? Crea caos visual
 *
 * 🎯 PATRONES APLICADOS:
 *
 * 1. GLITCH AESTHETIC:
 *    - Colores vibrantes: Rosa y cian
 *    - Movimiento errático: Animaciones desincronizadas
 *    - Interferencia: Efecto de corte y pegado
 *    - ¿Por qué glitch? Estética cyberpunk/retro
 *
 * 2. LAYER COMPOSITION:
 *    - Múltiples capas: Profundidad visual
 *    - Superposición: Efectos combinados
 *    - Desplazamiento: Movimiento independiente
 *    - ¿Por qué composición? Crea complejidad visual
 *
 * 3. ANIMATION CHAOS:
 *    - Valores aleatorios: Simulan interferencia
 *    - Timing irregular: Crea caos
 *    - Direcciones opuestas: Movimiento errático
 *    - ¿Por qué caos? Simula error digital
 *
 * 🚀 FLUJO DE EJECUCIÓN:
 * 1. Se aplica la clase .glitch-text al elemento
 * 2. Se crean los pseudo-elementos ::before y ::after
 * 3. Cada pseudo-elemento se desplaza y colorea
 * 4. Las animaciones se ejecutan independientemente
 * 5. El clipping cambia constantemente
 * 6. Se crea el efecto de interferencia visual
 *
 * 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
 * - Pseudo-elementos para efectos visuales
 * - Clip property para recorte de elementos
 * - Text-shadow para efectos de color
 * - Animaciones CSS complejas
 * - Layer composition
 * - Glitch aesthetic
 * - CSS sin JavaScript
 * - Efectos de interferencia digital
 *
 * ¡Es un ejemplo excelente de cómo crear efectos visuales impresionantes solo con CSS!
 * =========================================== */
````

## File: src/modules/profile/components/GlitchPresentation.tsx
````typescript
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './glitch.css';

// Interface para las props
interface GlitchProps {
  title?: string;
  subtitle?: string;
}
/**
 * Componente para el efecto glitch
 * @param title - Título del efecto glitch
 * @param subtitle - Subtítulo del efecto glitch
 * @returns Componente con el efecto glitch
 */
const Glitch: React.FC<GlitchProps> = ({ 
  title = "Hi, I'm Wilmer", 
  subtitle = "Web Developer" 
}) => {
    const containerRef = useRef<HTMLDivElement>(null); // Referencia al contenedor principal

  useEffect(() => { // Animación GSAP
    if (containerRef.current) { // Verificación de seguridad
      gsap.to(containerRef.current, {
        duration: 0.6, // Duración de la animación
        x: 1, // Desplazamiento horizontal
        y: 1, // Desplazamiento vertical
        repeat: -1,
        yoyo: true, // Efecto de ida y vuelta
        ease: "power1.inOut" // Easing de la animación
      });
    }
  }, []); // Dependencia: se ejecuta cuando cambia la referencia

  return (
    <div  // Contenedor principal
      ref={containerRef}
      className="relative w-full text-center mx-auto px-4" // Clases Tailwind
      style={{
        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
        maxWidth: 'min(100%, 1200px)' // Ancho máximo responsivo
      }}
    >
      <h1 
        className="font-bold text-white mb-2 glitch-text"  // Clases Tailwind
        data-text={title}
        style={{
          fontSize: 'clamp(2.5rem, 10vw, 3.5rem)', // Tamaño responsivo
          lineHeight: '1.2'
        }}
      >
        {title}
      </h1>
      
      <p 
        className="text-gray-300 glitch-text" 
        data-text={subtitle} // Subtítulo con efecto glitch
        style={{
          fontSize: 'clamp(1.25rem, 5vw, 2rem)',
          marginTop: 'clamp(-0.5rem, -2vw, -1rem)' // Márgen superior responsivo
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

export default Glitch;

// ===========================================
// 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
// ===========================================
// 
// Este archivo es un COMPONENTE REACT que combina el efecto glitch CSS
// con animaciones GSAP para crear una presentación visual impactante.
// Es un ejemplo perfecto de cómo integrar múltiples tecnologías para
// crear efectos visuales profesionales. Te explico paso a paso:
//
// 🎯 ¿QUÉ ES ESTE ARCHIVO?
// Es un componente que renderiza un título y subtítulo con efecto glitch,
// combinando CSS puro (para el efecto visual) con GSAP (para animaciones
// adicionales). Crea una presentación dinámica y atractiva para portfolios.
//
// 📋 DESGLOSE POR SECCIONES:
//
// 1. IMPORTS Y DEPENDENCIAS (líneas 1-5):
//    - 'use client': Directiva de Next.js para componentes del cliente
//    - React: useEffect, useRef para manejo de estado y referencias
//    - GSAP: Biblioteca de animaciones de alto rendimiento
//    - './glitch.css': Importa los estilos del efecto glitch
//    - ¿Por qué combinar? CSS para efectos visuales + GSAP para animaciones
//
// 2. INTERFACE Y PROPS (líneas 7-11):
//    - GlitchProps: Interface TypeScript para las props
//    - title?: string: Título opcional con valor por defecto
//    - subtitle?: string: Subtítulo opcional con valor por defecto
//    - ¿Por qué opcionales? Permite personalización pero con valores por defecto
//
// 3. COMPONENTE PRINCIPAL (líneas 13-16):
//    - React.FC<GlitchProps>: Componente funcional tipado
//    - Destructuring: Extrae title y subtitle de las props
//    - Valores por defecto: "Hi, I'm Wilmer" y "Web Developer"
//    - ¿Por qué valores por defecto? Funciona sin props obligatorias
//
// 4. REFS Y ESTADO (línea 17):
//    - containerRef: Referencia al contenedor principal
//    - useRef<HTMLDivElement>: Tipado específico para div
//    - ¿Por qué ref? Permite animar el elemento con GSAP
//
// 5. ANIMACIÓN GSAP (líneas 19-30):
//    - useEffect: Se ejecuta al montar el componente
//    - Verificación: if (containerRef.current) para seguridad
//    - gsap.to(): Anima el contenedor hacia x: 1, y: 1
//    - duration: 0.6s para animación suave
//    - repeat: -1 para repetición infinita
//    - yoyo: true para alternar dirección
//    - ease: "power1.inOut" para suavizado
//    - ¿Por qué GSAP? Mejor rendimiento que CSS para animaciones complejas
//
// 6. RENDER PRINCIPAL (líneas 32-63):
//    - div contenedor: Elemento principal con ref
//    - className: Tailwind para estilos base
//    - style: CSS inline para responsive design
//    - h1: Título con efecto glitch
//    - p: Subtítulo con efecto glitch
//
// 🎨 CONCEPTOS DE RESPONSIVE DESIGN:
//
// 1. CLAMP FUNCTION:
//    - clamp(2.5rem, 10vw, 3.5rem): Tamaño responsivo
//    - Mínimo: 2.5rem, Preferido: 10vw, Máximo: 3.5rem
//    - ¿Por qué clamp? Escala automáticamente con el viewport
//
// 2. VIEWPORT UNITS:
//    - 10vw: 10% del ancho del viewport
//    - 5vw: 5% del ancho del viewport
//    - ¿Por qué vw? Escala proporcionalmente
//
// 3. MIN/MAX FUNCTIONS:
//    - min(100%, 1200px): Ancho máximo responsivo
//    - clamp(-0.5rem, -2vw, -1rem): Márgenes responsivos
//    - ¿Por qué min/max? Controla límites de tamaño
//
// ⚡ INTEGRACIÓN DE TECNOLOGÍAS:
//
// 1. CSS + GSAP:
//    - CSS: Efecto glitch visual (pseudo-elementos, clip, text-shadow)
//    - GSAP: Animación de movimiento (x, y, repeat, yoyo)
//    - ¿Por qué combinar? Cada uno hace lo que mejor sabe
//
// 2. REACT + GSAP:
//    - React: Manejo de estado y ciclo de vida
//    - GSAP: Animaciones de alto rendimiento
//    - useRef: Puente entre React y GSAP
//    - ¿Por qué useRef? Permite acceso directo al DOM
//
// 3. TAILWIND + CSS INLINE:
//    - Tailwind: Clases utilitarias para layout
//    - CSS inline: Valores responsivos con clamp
//    - ¿Por qué ambos? Flexibilidad y control preciso
//
// 🎯 PATRONES APLICADOS:
//
// 1. COMPOSITION PATTERN:
//    - Múltiples tecnologías: CSS + GSAP + React
//    - Separación de responsabilidades: Cada tecnología hace su parte
//    - ¿Por qué composición? Mejor mantenibilidad y flexibilidad
//
// 2. RESPONSIVE DESIGN:
//    - clamp(): Escalado automático
//    - viewport units: Proporcionalidad
//    - min/max: Control de límites
//    - ¿Por qué responsive? Funciona en todos los dispositivos
//
// 3. PERFORMANCE:
//    - GSAP: Hardware acceleration automática
//    - CSS: Efectos optimizados por el navegador
//    - useRef: Evita re-renders innecesarios
//    - ¿Por qué performance? Experiencia de usuario fluida
//
// 🚀 FLUJO DE EJECUCIÓN:
// 1. Componente se monta con props (o valores por defecto)
// 2. useEffect se ejecuta y configura la animación GSAP
// 3. Se renderiza el HTML con clases CSS
// 4. CSS aplica el efecto glitch (pseudo-elementos, clip, text-shadow)
// 5. GSAP anima el movimiento del contenedor
// 6. Las animaciones se ejecutan infinitamente
//
// 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
// - Integración de CSS con GSAP
// - Responsive design con clamp y viewport units
// - Component composition patterns
// - Performance optimization
// - TypeScript interfaces
// - React lifecycle management
// - Hardware acceleration
// - Cross-technology integration
//
// ¡Es un ejemplo excelente de cómo crear presentaciones visuales impactantes!
// ===========================================
````

## File: src/modules/profile/components/WordCloud.tsx
````typescript
import React, { useEffect, useRef } from 'react'; // Importamos React y useRef
import { gsap } from 'gsap'; // Importamos GSAP para animaciones
import IonIcon from '@reacticons/ionicons'; // Importamos Ionicons para iconos

/*
WordCloud es un componente que renderiza una nube de palabras interactiva
usando GSAP para animaciones suaves. Es un ejemplo perfecto de cómo crear
efectos visuales atractivos con interacción del usuario.
*/

const WordCloud = () => {
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]); // Referencia para los iconos
  const words = [
    { name: 'logo-javascript', icon: <IonIcon name="logo-javascript" className='hover:text-yellow-500'/> },
    { name: 'logo-github', icon: <IonIcon name="logo-github" /> },
    { name: 'logo-sql', icon: <IonIcon name="server" className='hover:text-green-600'/> },
    { name: 'logo-laravel', icon: <IonIcon name="logo-laravel" className='hover:text-orange-600'/> },
    { name: 'logo-sass', icon: <IonIcon name="logo-sass" className='hover:text-purple-700'/> },
    { name: 'logo-python', icon: <IonIcon name="logo-python" className='hover:text-blue-700'/> },
    { name: 'logo-css3', icon: <IonIcon name="logo-css3" className='hover:text-blue-800'/> },
    { name: 'logo-html5', icon: <IonIcon name="logo-html5" className='hover:text-orange-500'/> }
  ]; // Lista de iconos

  // Función para generar un tamaño aleatorio entre 10 y 24
  const getRandomSize = () => Math.floor(Math.random() * (20 - 5 + 5)) + 20;
  // Función que se activa al mover el mouse
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e; // Obtenemos la posición del mouse
    wordsRef.current.forEach((word) => {
      if (word) {
        const rect = word.getBoundingClientRect(); // Obtenemos el tamaño y posición del icono
        const x = rect.left + rect.width / 2; // Calculamos el centro en X
        const y = rect.top + rect.height / 2; // Calculamos el centro en Y
        const deltaX = clientX - x; // Diferencia en X
        const deltaY = clientY - y; // Diferencia en Y

        // Animamos el icono para que se aleje del mouse
        gsap.to(word, {
          x: (deltaX / 10) * -1, // Movemos en dirección opuesta al mouse
          y: (deltaY / 10) * -1, // Movemos en dirección opuesta al mouse
          duration: 0.5,
          ease: 'power1.out'
        });
      }
    });
  };


  // Función que se activa al entrar el mouse en un icono
  const handleMouseEnter = (index: number) => {
    if (wordsRef.current[index]) {
      gsap.to(wordsRef.current[index], {
        scale: 2.5, // Aumentamos el tamaño del icono
        duration: 0.3,
        ease: 'power1.out'
      });
    }
  };


  // Función que se activa al salir el mouse de un icono
  const handleMouseLeave = (index: number) => {
    if (wordsRef.current[index]) {
      gsap.to(wordsRef.current[index], {
        scale: 1.5, // Regresamos al tamaño original
        duration: 0.3,
        ease: 'power1.out'
      });
    }
  };


  // Usamos useEffect para limpiar el código y evitar fugas de memoria
  useEffect(() => {
    const handleMouseLeaveWindow = () => {
      // Función para manejar el evento de salir de la ventana
      wordsRef.current.forEach((word) => {
        if (word) {
          gsap.to(word, {
            x: 0, // Regresamos a la posición original
            y: 0,
            duration: 0.5,
            ease: 'elastic.out'
          });
        }
      });
    };


    window.addEventListener('mouseleave', handleMouseLeaveWindow); // Agregamos el evento

    // Limpiamos el evento al desmontar el componente
    return () => {
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, []);

  
  return (
    <div
      onMouseMove={handleMouseMove} // Evento para mover el mouse
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center',height : '150px', position: 'relative', alignContent: 'center', color: 'white' }}
      id='skills'
      className='my-20'
    >
      {words.map((word, index) => (
        <div
          key={index}
          ref={el => wordsRef.current[index] = el} // Asignamos la referencia
          style={{
            fontSize: `${getRandomSize()}px`, // Tamaño aleatorio inicial
            margin: '20px',
            opacity: 1,
            transition: 'opacity 0.5s',
            cursor: 'pointer'
          }}
          onMouseEnter={() => handleMouseEnter(index)} // Evento al entrar
          onMouseLeave={() => handleMouseLeave(index)} // Evento al salir
        >
          {word.icon} {/* Renderizamos el icono */}
        </div>
      ))}
    </div>
  );
};

export default WordCloud; // Exportamos el componente

// ===========================================
// 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
// ===========================================
// 
// Este archivo es un COMPONENTE REACT que crea una nube de palabras interactiva
// usando GSAP para animaciones suaves. Es un ejemplo perfecto de cómo crear
// efectos visuales atractivos con interacción del usuario. Te explico paso a paso:
//
// 🎯 ¿QUÉ ES ESTE ARCHIVO?
// Es un componente que renderiza una colección de iconos de tecnologías que
// reaccionan al movimiento del mouse, creando un efecto de "repulsión" y
// escalado interactivo. Usa GSAP para animaciones fluidas y profesionales.
//
// 📋 DESGLOSE POR SECCIONES:
//
// 1. IMPORTS Y DEPENDENCIAS (líneas 1-3):
//    - React: useEffect, useRef para manejo de estado y referencias
//    - GSAP: Biblioteca de animaciones de alto rendimiento
//    - IonIcon: Iconos de Ionicons para tecnologías
//    - ¿Por qué GSAP? Mejor rendimiento que CSS transitions
//
// 2. CONFIGURACIÓN INICIAL (líneas 5-16):
//    - wordsRef: Array de referencias para cada icono
//    - words: Array de objetos con nombre e icono
//    - Hover classes: Colores específicos para cada tecnología
//    - ¿Por qué array de refs? Permite animar múltiples elementos
//
// 3. FUNCIONES UTILITARIAS (líneas 19-20):
//    - getRandomSize: Genera tamaños aleatorios entre 20-40px
//    - Math.random(): Crea variación visual en los iconos
//    - ¿Por qué aleatorio? Evita que se vea uniforme y aburrido
//
// 4. INTERACCIÓN CON MOUSE (líneas 23-43):
//    - handleMouseMove: Función principal de interacción
//    - clientX, clientY: Posición del mouse en la pantalla
//    - getBoundingClientRect(): Obtiene posición y tamaño del elemento
//    - Cálculo de distancia: deltaX, deltaY para determinar dirección
//    - GSAP.to(): Anima el elemento hacia la dirección opuesta
//    - ¿Por qué /10? Reduce la intensidad del movimiento
//
// 5. ANIMACIONES DE HOVER (líneas 46-67):
//    - handleMouseEnter: Escala el icono a 2.5x
//    - handleMouseLeave: Regresa a escala 1.5x
//    - duration: 0.3s para respuesta rápida
//    - ease: 'power1.out' para animación suave
//    - ¿Por qué diferentes escalas? Crea jerarquía visual
//
// 6. CLEANUP Y RESET (líneas 70-93):
//    - handleMouseLeaveWindow: Resetea posiciones al salir de la ventana
//    - useEffect: Maneja el ciclo de vida del componente
//    - addEventListener/removeEventListener: Gestión de eventos
//    - ¿Por qué reset? Evita que los iconos queden "perdidos"
//
// 7. RENDER (líneas 96-121):
//    - onMouseMove: Escucha el movimiento del mouse
//    - Flexbox: Layout flexible para distribución de iconos
//    - map(): Renderiza cada icono con sus props
//    - ref callback: Asigna referencia a cada elemento
//    - Event handlers: onMouseEnter/onMouseLeave
//
// 🎨 CONCEPTOS DE GSAP:
//
// 1. ANIMACIONES BÁSICAS:
//    - gsap.to(): Anima hacia un valor específico
//    - duration: Tiempo de duración en segundos
//    - ease: Función de suavizado (power1.out, elastic.out)
//
// 2. PROPIEDADES ANIMABLES:
//    - x, y: Transformaciones 2D
//    - scale: Escalado del elemento
//    - opacity: Transparencia
//    - rotation: Rotación
//
// 3. EASING FUNCTIONS:
//    - power1.out: Aceleración suave
//    - elastic.out: Efecto de rebote
//    - bounce.out: Efecto de salto
//
// ⚡ OPTIMIZACIONES DE RENDIMIENTO:
//
// 1. GSAP BENEFITS:
//    - Hardware acceleration: Usa GPU automáticamente
//    - Batch updates: Agrupa cambios para mejor rendimiento
//    - RequestAnimationFrame: Sincroniza con el refresh rate
//
// 2. EVENT HANDLING:
//    - Throttling: GSAP maneja automáticamente el throttling
//    - Debouncing: Evita animaciones excesivas
//    - Cleanup: Remove event listeners correctamente
//
// 3. MEMORY MANAGEMENT:
//    - useEffect cleanup: Previene memory leaks
//    - Event listener removal: Limpia recursos
//    - Ref management: Gestión eficiente de referencias
//
// 🎯 PATRONES APLICADOS:
//
// 1. INTERACTIVE DESIGN:
//    - Mouse tracking: Seguimiento de posición del cursor
//    - Proximity effects: Efectos basados en distancia
//    - Hover states: Estados de interacción
//
// 2. ANIMATION PATTERNS:
//    - Stagger animations: Animaciones escalonadas
//    - Easing functions: Curvas de animación naturales
//    - Reset patterns: Vuelta al estado original
//
// 3. COMPONENT ARCHITECTURE:
//    - Separation of concerns: Lógica separada por función
//    - Event handling: Manejo centralizado de eventos
//    - State management: Estado local con useRef
//
// 🚀 FLUJO DE INTERACCIÓN:
// 1. Usuario mueve el mouse sobre el contenedor
// 2. handleMouseMove calcula distancias a cada icono
// 3. GSAP anima cada icono en dirección opuesta
// 4. Al hacer hover, el icono se escala
// 5. Al salir del hover, regresa a escala normal
// 6. Al salir de la ventana, todos los iconos se resetean
//
// 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
// - Integración de GSAP con React
// - Mouse tracking y cálculos de distancia
// - Event handling avanzado
// - Animation performance
// - Component lifecycle management
// - Interactive design patterns
// - Hardware acceleration
// - Memory management
//
// ¡Es un ejemplo excelente de cómo crear interacciones fluidas y atractivas!
// ===========================================
````

## File: src/modules/profile/hooks/useHeroContent.ts
````typescript
/**
 * @file useHeroContent.ts
 * @description Hook para obtener el contenido del Hero (título, subtítulo, imagen de perfil)
 * desde la tabla hero_content de Supabase. Hay una única fila con id 'default'.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';
import type { HeroContent } from '../../../types/supabase';

/** Hero por defecto cuando Supabase no está configurado o no hay datos. */
const DEFAULT_HERO: HeroContent & { profile_image_url: string } = {
  id: 'default',
  title: 'Wilmer Lynch',
  subtitle: 'Web Developer',
  profile_image_path: 'avatars/profile.jpeg',
  updated_at: '',
  profile_image_url: '/profile.jpeg',
};

/**
 * Obtiene el contenido del hero (fila id='default') y resuelve la URL de la imagen de perfil.
 * @returns Hero con profile_image_url absoluta
 * @internal
 */
async function fetchHero(): Promise<HeroContent & { profile_image_url: string }> {
  if (!isSupabaseConfigured) return DEFAULT_HERO;
  const { data, error } = await supabase
    .from('hero_content')
    .select('*')
    .eq('id', 'default')
    .single();
  if (error || !data) return DEFAULT_HERO;
  const row = data as HeroContent;
  return {
    ...row,
    profile_image_url: getStoragePublicUrl(row.profile_image_path) || '/profile.jpeg',
  };
}

/**
 * Hook que expone el contenido del Hero para la página de inicio.
 * @returns hero (título, subtítulo, profile_image_url), isLoading, error y refetch
 * @example
 * const { hero, isLoading } = useHeroContent();
 * return (
 *   <section>
 *     <img src={hero.profile_image_url} alt="" />
 *     <h1>{hero.title}</h1>
 *     <p>{hero.subtitle}</p>
 *   </section>
 * );
 */
export function useHeroContent() {
  const q = useQuery({
    queryKey: ['hero_content'],
    queryFn: fetchHero,
    staleTime: 5 * 60 * 1000,
    placeholderData: DEFAULT_HERO,
  });
  return {
    hero: q.data ?? DEFAULT_HERO,
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
````

## File: src/modules/projects/admin/AdminContentEditor.tsx
````typescript
import React, { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../shared/services/supabase/supabase';
import { useCards } from '../hooks/useCards';
import { useProjectContent } from '../hooks/useProjectContent';
import { STORAGE_BUCKET } from '../../../types/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';

type BlockType = 'text' | 'image' | 'video';

interface LocalBlock {
  id: string | null;
  type: BlockType;
  content: string;
  caption: string;
  order: number;
  file?: File | null;
  previewUrl?: string;
}

export const AdminContent: React.FC = () => {
  const { cards } = useCards();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const list = Array.isArray(cards) ? cards : [];

  useEffect(() => {
    if (!selectedProjectId && list.length > 0) {
      setSelectedProjectId(list[0].id);
    }
  }, [list, selectedProjectId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white">Contenido de proyectos</h2>
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-300">
            <strong>💡 Cómo funciona:</strong> Selecciona un proyecto y agrega bloques de texto, imágenes (.webp, .jpg, .png) o videos (.gif, .mp4). 
            El contenido se mostrará en la página pública del proyecto (<code className="text-blue-200">/page/:id</code>).
          </p>
        </div>
      </div>

      {/* Project selector */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-300">Seleccionar proyecto</label>
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="w-full sm:w-80 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                     text-white focus:outline-none focus:border-blue-500/50
                     focus:ring-1 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
        >
          <option value="" disabled className="bg-slate-900">-- Elige un proyecto --</option>
          {list.map((c) => (
            <option key={c.id} value={c.id} className="bg-slate-900">
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {selectedProjectId && (
        <ProjectContentEditor key={selectedProjectId} projectId={selectedProjectId} />
      )}
    </div>
  );
};

const ProjectContentEditor: React.FC<{ projectId: string }> = ({ projectId }) => {
  const { blocks, isLoading } = useProjectContent(projectId);
  const queryClient = useQueryClient();
  const [localBlocks, setLocalBlocks] = useState<LocalBlock[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addMenuOpen, setAddMenuOpen] = useState(false);

  useEffect(() => {
    setLocalBlocks(
      blocks.map((b) => ({
        id: b.id,
        type: b.type,
        content: b.content,
        caption: b.caption,
        order: b.order,
        file: null,
        previewUrl: b.type !== 'text' ? (getStoragePublicUrl(b.content) || b.content) : undefined,
      }))
    );
  }, [blocks]);

  const addBlock = useCallback((type: BlockType) => {
    setLocalBlocks((prev) => [
      ...prev,
      {
        id: null,
        type,
        content: '',
        caption: '',
        order: prev.length,
        file: null,
      },
    ]);
    setAddMenuOpen(false);
  }, []);

  const removeBlock = useCallback((idx: number) => {
    setLocalBlocks((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const moveBlock = useCallback((idx: number, direction: 'up' | 'down') => {
    setLocalBlocks((prev) => {
      const arr = [...prev];
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= arr.length) return prev;
      [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
      return arr.map((b, i) => ({ ...b, order: i }));
    });
  }, []);

  const updateBlock = useCallback((idx: number, updates: Partial<LocalBlock>) => {
    setLocalBlocks((prev) =>
      prev.map((b, i) => (i === idx ? { ...b, ...updates } : b))
    );
  }, []);

  const handleFileChange = useCallback((idx: number, file: File | null) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    updateBlock(idx, { file, previewUrl });
  }, [updateBlock]);

  const saveAll = async () => {
    setSaving(true);
    setError(null);
    try {
      const existingIds = blocks.map((b) => b.id);
      const localIds = localBlocks.filter((b) => b.id).map((b) => b.id!);
      const toDelete = existingIds.filter((id) => !localIds.includes(id));

      if (toDelete.length > 0) {
        const { error: delErr } = await supabase
          .from('project_content')
          .delete()
          .in('id', toDelete);
        if (delErr) throw delErr;
      }

      for (let i = 0; i < localBlocks.length; i++) {
        const block = localBlocks[i];
        let contentValue = block.content;

        if (block.file && (block.type === 'image' || block.type === 'video')) {
          const ext = block.file.name.split('.').pop() || 'webp';
          const folder = block.type === 'image' ? 'project-images' : 'project-videos';
          const path = `${folder}/${projectId}-${i}-${Date.now()}.${ext}`;
          const { error: upErr } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(path, block.file, { upsert: true });
          if (upErr) throw upErr;
          contentValue = path;
        }

        if (block.type === 'text' && !contentValue.trim()) continue;
        if ((block.type === 'image' || block.type === 'video') && !contentValue && !block.file) continue;

        if (block.id) {
          const { error: updErr } = await supabase
            .from('project_content')
            .update({
              type: block.type,
              content: contentValue,
              caption: block.caption,
              order: i,
              updated_at: new Date().toISOString(),
            })
            .eq('id', block.id);
          if (updErr) throw updErr;
        } else {
          const { error: insErr } = await supabase
            .from('project_content')
            .insert({
              project_id: projectId,
              type: block.type,
              content: contentValue,
              caption: block.caption,
              order: i,
            });
          if (insErr) throw insErr;
        }
      }

      queryClient.invalidateQueries({ queryKey: ['project_content', projectId] });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-slate-400">Cargando contenido...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Blocks list */}
      {localBlocks.length === 0 && (
        <div className="text-center py-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <svg className="w-12 h-12 mx-auto text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-slate-400">Sin contenido para este proyecto</p>
          <p className="text-slate-500 text-sm mt-1">Agrega bloques de texto, imágenes o videos</p>
        </div>
      )}

      <div className="space-y-3">
        {localBlocks.map((block, idx) => (
          <div
            key={block.id ?? `new-${idx}`}
            className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
          >
            {/* Block header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                block.type === 'text'
                  ? 'bg-blue-500/20 text-blue-300'
                  : block.type === 'image'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-purple-500/20 text-purple-300'
              }`}>
                {block.type === 'text' ? 'Texto' : block.type === 'image' ? 'Imagen' : 'Video'}
              </span>
              <span className="text-xs text-slate-500">#{idx + 1}</span>
              <div className="ml-auto flex items-center gap-1">
                <button
                  onClick={() => moveBlock(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10
                             disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Subir"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => moveBlock(idx, 'down')}
                  disabled={idx === localBlocks.length - 1}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10
                             disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Bajar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => removeBlock(idx)}
                  className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  title="Eliminar bloque"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Block body */}
            <div className="p-4 space-y-3">
              {block.type === 'text' && (
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlock(idx, { content: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                             text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                             focus:ring-1 focus:ring-blue-500/20 transition-all resize-y font-mono text-sm"
                  placeholder="Escribe el contenido del bloque (soporta HTML)..."
                />
              )}

              {block.type === 'image' && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept=".webp,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(idx, e.target.files?.[0] ?? null)}
                        className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4
                                   file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                                   file:font-medium file:cursor-pointer hover:file:bg-white/15
                                   file:transition-all cursor-pointer"
                      />
                      <p className="text-xs text-slate-500 mt-1">Formatos: .webp, .jpg, .png</p>
                    </div>
                    {block.previewUrl && (
                      <img
                        src={block.previewUrl}
                        alt="Preview"
                        className="w-32 h-24 sm:w-40 sm:h-28 rounded-xl object-cover border border-white/10"
                      />
                    )}
                  </div>
                  <input
                    value={block.caption}
                    onChange={(e) => updateBlock(idx, { caption: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10
                               text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                               focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                    placeholder="Pie de imagen (opcional)"
                  />
                </div>
              )}

              {block.type === 'video' && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept=".gif,.mp4,.webm"
                        onChange={(e) => handleFileChange(idx, e.target.files?.[0] ?? null)}
                        className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4
                                   file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                                   file:font-medium file:cursor-pointer hover:file:bg-white/15
                                   file:transition-all cursor-pointer"
                      />
                      <p className="text-xs text-slate-500 mt-1">Formatos: .gif, .mp4, .webm</p>
                    </div>
                    {block.previewUrl && (
                      block.previewUrl.endsWith('.gif') || block.file?.name.endsWith('.gif') ? (
                        <img
                          src={block.previewUrl}
                          alt="Preview GIF"
                          className="w-32 h-24 sm:w-40 sm:h-28 rounded-xl object-cover border border-white/10"
                        />
                      ) : (
                        <video
                          src={block.previewUrl}
                          className="w-32 h-24 sm:w-40 sm:h-28 rounded-xl object-cover border border-white/10"
                          muted
                          loop
                          autoPlay
                          playsInline
                        />
                      )
                    )}
                  </div>
                  <input
                    value={block.caption}
                    onChange={(e) => updateBlock(idx, { caption: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10
                               text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                               focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                    placeholder="Pie de video (opcional)"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add block + Save */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
          <button
            onClick={() => setAddMenuOpen(!addMenuOpen)}
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10
                       text-white/80 hover:bg-white/10 hover:text-white transition-all
                       flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Agregar bloque
          </button>
          {addMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setAddMenuOpen(false)} />
              <div className="absolute bottom-full left-0 mb-2 z-20 rounded-xl bg-slate-800/95 backdrop-blur-xl
                              border border-white/10 shadow-xl overflow-hidden min-w-[180px]">
                <button
                  onClick={() => addBlock('text')}
                  className="w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/10
                             flex items-center gap-2.5 transition-colors"
                >
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Texto
                </button>
                <button
                  onClick={() => addBlock('image')}
                  className="w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/10
                             flex items-center gap-2.5 transition-colors"
                >
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Imagen (.webp, .jpg, .png)
                </button>
                <button
                  onClick={() => addBlock('video')}
                  className="w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/10
                             flex items-center gap-2.5 transition-colors"
                >
                  <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Video (.gif, .mp4)
                </button>
              </div>
            </>
          )}
        </div>

        <button
          onClick={saveAll}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
                     text-white font-medium hover:from-blue-500 hover:to-blue-400
                     transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50
                     disabled:cursor-not-allowed active:scale-95 flex items-center gap-2 w-fit"
        >
          {saving && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {saving ? 'Guardando...' : 'Guardar todo'}
        </button>
      </div>

      {/* Preview */}
      {localBlocks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-300">Vista previa</h3>
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-6 space-y-4">
            {localBlocks.map((block, idx) => (
              <div key={block.id ?? `preview-${idx}`}>
                {block.type === 'text' && block.content && (
                  <div
                    className="text-slate-200 text-sm leading-relaxed prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                )}
                {block.type === 'image' && block.previewUrl && (
                  <figure className="space-y-2">
                    <img
                      src={block.previewUrl}
                      alt={block.caption || ''}
                      className="w-full max-h-96 object-contain rounded-xl"
                    />
                    {block.caption && (
                      <figcaption className="text-xs text-slate-400 text-center">{block.caption}</figcaption>
                    )}
                  </figure>
                )}
                {block.type === 'video' && block.previewUrl && (
                  <figure className="space-y-2">
                    {block.previewUrl.endsWith('.gif') || block.file?.name.endsWith('.gif') ? (
                      <img
                        src={block.previewUrl}
                        alt={block.caption || ''}
                        className="w-full max-h-96 object-contain rounded-xl"
                      />
                    ) : (
                      <video
                        src={block.previewUrl}
                        className="w-full max-h-96 rounded-xl"
                        controls
                        muted
                        loop
                        playsInline
                      />
                    )}
                    {block.caption && (
                      <figcaption className="text-xs text-slate-400 text-center">{block.caption}</figcaption>
                    )}
                  </figure>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
````

## File: src/modules/projects/admin/AdminInfoSections.tsx
````typescript
import React, { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../shared/services/supabase/supabase';
import { useSkillSections, useKnowledgeSections } from '../hooks/useInfoSections';
import type { InfoSectionRow } from '../../../types/supabase';

type SectionType = 'skill' | 'knowledge';
type ColorOption = 'blue' | 'purple' | 'green';

interface EditableSection {
  id: string | null;
  title: string;
  color: ColorOption;
  items: string[];
  order: number;
}

const COLOR_OPTIONS: { value: ColorOption; label: string; cls: string }[] = [
  { value: 'blue', label: 'Azul', cls: 'bg-blue-400' },
  { value: 'purple', label: 'Morado', cls: 'bg-purple-400' },
  { value: 'green', label: 'Verde', cls: 'bg-green-400' },
];

export const AdminInfoSections: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SectionType>('skill');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white">Secciones de información</h2>
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-300">
            <strong>Habilidades:</strong> Tarjetas compactas que se muestran en la sección "Información" del home.
            <br />
            <strong>Conocimientos:</strong> Tarjetas expandibles que se muestran en "Tecnologías y Experiencia".
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('skill')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'skill'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
              : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          Habilidades
        </button>
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'knowledge'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
              : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          Conocimientos
        </button>
      </div>

      <SectionEditor key={activeTab} sectionType={activeTab} />
    </div>
  );
};

const SectionEditor: React.FC<{ sectionType: SectionType }> = ({ sectionType }) => {
  const { skills, isLoading: skillsLoading, refetch: refetchSkills } = useSkillSections();
  const { knowledges, isLoading: knowledgesLoading, refetch: refetchKnowledges } = useKnowledgeSections();
  const queryClient = useQueryClient();

  const sourceData = sectionType === 'skill' ? skills : knowledges;
  const isLoading = sectionType === 'skill' ? skillsLoading : knowledgesLoading;

  const [sections, setSections] = useState<EditableSection[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setSections(
      sourceData.map((s: InfoSectionRow) => ({
        id: s.id,
        title: s.title,
        color: s.color,
        items: [...s.items],
        order: s.order,
      }))
    );
  }, [sourceData]);

  const addSection = useCallback(() => {
    setSections(prev => [
      ...prev,
      {
        id: null,
        title: '',
        color: sectionType === 'skill' ? 'blue' : 'purple',
        items: [''],
        order: prev.length,
      },
    ]);
  }, [sectionType]);

  const removeSection = useCallback((idx: number) => {
    setSections(prev => prev.filter((_, i) => i !== idx).map((s, i) => ({ ...s, order: i })));
  }, []);

  const moveSection = useCallback((idx: number, direction: 'up' | 'down') => {
    setSections(prev => {
      const arr = [...prev];
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= arr.length) return prev;
      [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
      return arr.map((s, i) => ({ ...s, order: i }));
    });
  }, []);

  const updateSection = useCallback((idx: number, updates: Partial<EditableSection>) => {
    setSections(prev => prev.map((s, i) => (i === idx ? { ...s, ...updates } : s)));
  }, []);

  const addItem = useCallback((sectionIdx: number) => {
    setSections(prev =>
      prev.map((s, i) => (i === sectionIdx ? { ...s, items: [...s.items, ''] } : s))
    );
  }, []);

  const updateItem = useCallback((sectionIdx: number, itemIdx: number, value: string) => {
    setSections(prev =>
      prev.map((s, i) =>
        i === sectionIdx
          ? { ...s, items: s.items.map((it, j) => (j === itemIdx ? value : it)) }
          : s
      )
    );
  }, []);

  const removeItem = useCallback((sectionIdx: number, itemIdx: number) => {
    setSections(prev =>
      prev.map((s, i) =>
        i === sectionIdx ? { ...s, items: s.items.filter((_, j) => j !== itemIdx) } : s
      )
    );
  }, []);

  const saveAll = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const existingIds = sourceData.map((s: InfoSectionRow) => s.id);
      const localIds = sections.filter(s => s.id).map(s => s.id!);
      const toDelete = existingIds.filter(id => !localIds.includes(id));

      if (toDelete.length > 0) {
        const { error: delErr } = await supabase
          .from('info_sections')
          .delete()
          .in('id', toDelete);
        if (delErr) throw delErr;
      }

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const filteredItems = section.items.filter(it => it.trim() !== '');
        if (!section.title.trim()) continue;

        if (section.id) {
          const { error: updErr } = await supabase
            .from('info_sections')
            .update({
              title: section.title,
              color: section.color,
              items: filteredItems,
              order: i,
              updated_at: new Date().toISOString(),
            })
            .eq('id', section.id);
          if (updErr) throw updErr;
        } else {
          const { error: insErr } = await supabase
            .from('info_sections')
            .insert({
              section_type: sectionType,
              title: section.title,
              color: section.color,
              items: filteredItems,
              order: i,
            });
          if (insErr) throw insErr;
        }
      }

      queryClient.invalidateQueries({ queryKey: ['info_sections', sectionType] });
      if (sectionType === 'skill') refetchSkills();
      else refetchKnowledges();
      setSuccess('Guardado correctamente');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-slate-400">Cargando secciones...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
      )}
      {success && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">{success}</div>
      )}

      {sections.length === 0 && (
        <div className="text-center py-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <p className="text-slate-400">No hay secciones de este tipo</p>
          <p className="text-slate-500 text-sm mt-1">Crea una nueva sección para empezar</p>
        </div>
      )}

      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div
            key={section.id ?? `new-${idx}`}
            className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
          >
            {/* Section header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
              <div className={`w-3 h-3 rounded-full ${COLOR_OPTIONS.find(c => c.value === section.color)?.cls ?? 'bg-blue-400'}`} />
              <span className="text-sm font-medium text-white truncate flex-1">
                {section.title || '(sin título)'}
              </span>
              <span className="text-xs text-slate-500">#{idx + 1}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveSection(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Subir"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => moveSection(idx, 'down')}
                  disabled={idx === sections.length - 1}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Bajar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => removeSection(idx)}
                  className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  title="Eliminar sección"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Section body */}
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-400">Título</label>
                  <input
                    value={section.title}
                    onChange={(e) => updateSection(idx, { title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                    placeholder="Título de la sección"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-400">Color</label>
                  <div className="flex gap-2">
                    {COLOR_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => updateSection(idx, { color: opt.value })}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          section.color === opt.value
                            ? 'bg-white/15 text-white border border-white/20'
                            : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
                        }`}
                      >
                        <div className={`w-2.5 h-2.5 rounded-full ${opt.cls}`} />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Items list */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-400">
                  {sectionType === 'skill' ? 'Elementos' : 'Detalles'}
                </label>
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex gap-2 items-center">
                    <span className="text-xs text-slate-500 w-5 text-right shrink-0">{itemIdx + 1}.</span>
                    <input
                      value={item}
                      onChange={(e) => updateItem(idx, itemIdx, e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                      placeholder={`Elemento ${itemIdx + 1}`}
                    />
                    <button
                      onClick={() => removeItem(idx, itemIdx)}
                      disabled={section.items.length <= 1}
                      className="p-1 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
                      title="Eliminar elemento"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addItem(idx)}
                  className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors mt-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Agregar elemento
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={addSection}
          className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nueva sección
        </button>
        <button
          onClick={saveAll}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center gap-2 w-fit"
        >
          {saving && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {saving ? 'Guardando...' : 'Guardar todo'}
        </button>
      </div>
    </div>
  );
};
````

## File: src/modules/projects/admin/AdminProjectsCRUD.tsx
````typescript
import React, { useState, useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { supabase } from '../../../shared/services/supabase/supabase';
import { useCards } from '../hooks/useCards';
import { STORAGE_BUCKET } from '../../../types/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';
import { ALLOWED_HTML_TAGS, parseMarkdownToHtml } from '../utils/markdown';

interface ProjectForm {
  title: string;
  description: string;
  buttonText: string;
  codeUrl: string;
  demoUrl: string;
  order: number;
  problemSolved: string;
  architecturalDoc: string;
}

const emptyForm: ProjectForm = {
  title: '',
  description: '',
  buttonText: 'Ver más...',
  codeUrl: '',
  demoUrl: '',
  order: 0,
  problemSolved: '',
  architecturalDoc: '',
};

export const AdminProjects: React.FC = () => {
  const { cards, isLoading } = useCards();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [cardImage, setCardImage] = useState<File | null>(null);
  const [bgImage, setBgImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const list = Array.isArray(cards) ? cards : [];

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((e: React.UIEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const preview = previewRef.current;
    if (!textarea || !preview) return;

    const scrollPercentage = textarea.scrollTop / (textarea.scrollHeight - textarea.clientHeight);
    preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight);
  }, []);


  const insertMarkdown = useCallback((prefix: string, suffix: string, defaultText: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = form.architecturalDoc;

    const selectedText = currentValue.substring(start, end);
    const textToInsert = selectedText || defaultText;

    const before = currentValue.substring(0, start);
    const after = currentValue.substring(end);

    const newValue = before + prefix + textToInsert + suffix + after;

    setForm((f) => ({ ...f, architecturalDoc: newValue }));

    // Refocus and set selection range
    setTimeout(() => {
      textarea.focus();
      const newStart = start + prefix.length;
      const newEnd = newStart + textToInsert.length;
      textarea.setSelectionRange(newStart, newEnd);
    }, 0);
  }, [form.architecturalDoc]);

  const handleImportMarkdown = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.md')) {
      setError('Solo se admiten archivos Markdown (.md)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setForm((f) => ({ ...f, architecturalDoc: text }));
      }
    };
    reader.onerror = () => {
      setError('Error al leer el archivo markdown.');
    };
    reader.readAsText(file);

    // Clear input value so same file can be reloaded if changed
    e.target.value = '';
  }, []);


  const openCreate = useCallback(() => {
    setEditingId(null);
    setForm({ ...emptyForm, order: list.length + 1 });
    setCardImage(null);
    setBgImage(null);
    setError(null);
    setModalOpen(true);
  }, [list.length]);

  const openEdit = useCallback((id: string) => {
    const card = list.find((c) => c.id === id);
    if (!card) return;
    setEditingId(id);
    setForm({
      title: card.title,
      description: card.description,
      buttonText: card.buttonText ?? 'Ver más...',
      codeUrl: card.codeUrl ?? '',
      demoUrl: card.demoUrl ?? '',
      order: card.order ?? 0,
      problemSolved: card.problem_solved ?? '',
      architecturalDoc: card.architectural_doc ?? '',
    });
    setCardImage(null);
    setBgImage(null);
    setError(null);
    setModalOpen(true);
  }, [list]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setCardImage(null);
    setBgImage(null);
    setError(null);
  }, []);

  const uploadFile = async (file: File, folder: string, id: string): Promise<string> => {
    const ext = file.name.split('.').pop() || 'webp';
    const path = `${folder}/${id}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { upsert: true });
    if (uploadError) throw uploadError;
    return path;
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.problemSolved.trim() || !form.architecturalDoc.trim()) {
      setError('Título, descripción, problema resuelto y documentación arquitectónica son obligatorios.');
      return;
    }
    setSaving(true);
    setError(null);

    try {
      if (editingId) {
        const updates: Record<string, unknown> = {
          title: form.title.trim(),
          description: form.description.trim(),
          button_text: form.buttonText.trim() || 'Ver más...',
          code_url: form.codeUrl.trim(),
          demo_url: form.demoUrl.trim(),
          order: form.order,
          problem_solved: form.problemSolved.trim(),
          architectural_doc: form.architecturalDoc.trim(),
          updated_at: new Date().toISOString(),
        };

        if (cardImage) {
          updates.image_path = await uploadFile(cardImage, 'cards', editingId);
        }
        if (bgImage) {
          updates.bg_image_path = await uploadFile(bgImage, 'projects-bg', editingId);
        }

        const { error: dbError } = await supabase
          .from('cards')
          .update(updates)
          .eq('id', editingId);
        if (dbError) throw dbError;
      } else {
        const nextId = String(
          Math.max(0, ...list.map((c) => Number(c.id) || 0)) + 1
        );

        let imagePath = '';
        let bgImagePath = '';

        if (cardImage) {
          imagePath = await uploadFile(cardImage, 'cards', nextId);
        }
        if (bgImage) {
          bgImagePath = await uploadFile(bgImage, 'projects-bg', nextId);
        }

        const { error: dbError } = await supabase.from('cards').insert({
          id: nextId,
          title: form.title.trim(),
          description: form.description.trim(),
          button_text: form.buttonText.trim() || 'Ver más...',
          image_path: imagePath,
          code_url: form.codeUrl.trim(),
          demo_url: form.demoUrl.trim(),
          bg_image_path: bgImagePath,
          order: form.order,
          problem_solved: form.problemSolved.trim(),
          architectural_doc: form.architecturalDoc.trim(),
        });
        if (dbError) throw dbError;
      }

      queryClient.invalidateQueries({ queryKey: ['cards'] });
      closeModal();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const { error: dbError } = await supabase.from('cards').delete().eq('id', id);
      if (dbError) throw dbError;

      await supabase.storage.from(STORAGE_BUCKET).remove([`cards/${id}.webp`, `cards/${id}.jpg`, `cards/${id}.png`]);
      await supabase.storage.from(STORAGE_BUCKET).remove([`projects-bg/${id}.webp`, `projects-bg/${id}.jpg`, `projects-bg/${id}.png`]);

      queryClient.invalidateQueries({ queryKey: ['cards'] });
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  const moveProject = async (id: string, direction: 'up' | 'down') => {
    const sorted = [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const idx = sorted.findIndex((c) => c.id === id);
    if (idx < 0) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const current = sorted[idx];
    const swap = sorted[swapIdx];

    await Promise.all([
      supabase.from('cards').update({ order: swap.order ?? swapIdx, updated_at: new Date().toISOString() }).eq('id', current.id),
      supabase.from('cards').update({ order: current.order ?? idx, updated_at: new Date().toISOString() }).eq('id', swap.id),
    ]);
    queryClient.invalidateQueries({ queryKey: ['cards'] });
  };

  const placeholderImg =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="80" fill="%23334155"%3E%3Crect width="120" height="80" rx="8"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="12"%3ESin imagen%3C/text%3E%3C/svg%3E';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Proyectos</h2>
        <button
          onClick={openCreate}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium
                     hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/20
                     active:scale-95 flex items-center gap-2 w-fit"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo proyecto
        </button>
      </div>

      {/* Loading */}
      {isLoading && list.length === 0 && (
        <div className="flex items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400">Cargando proyectos...</span>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && list.length === 0 && (
        <div className="text-center py-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <svg className="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-slate-400 text-lg">No hay proyectos todavía</p>
          <p className="text-slate-500 text-sm mt-1">Crea tu primer proyecto con el botón de arriba</p>
        </div>
      )}

      {/* Project grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...list]
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((card, idx) => (
          <div
            key={card.id}
            className="group relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10
                       overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
          >
            {/* Card image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={card.img || placeholderImg}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).src = placeholderImg; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Order badge */}
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm
                               text-xs font-medium text-white/80 border border-white/10">
                #{card.order ?? idx + 1}
              </span>

              {/* Reorder buttons */}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => moveProject(card.id, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10
                             text-white/70 hover:text-white hover:bg-black/60 disabled:opacity-30
                             disabled:cursor-not-allowed transition-all"
                  title="Subir"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => moveProject(card.id, 'down')}
                  disabled={idx === list.length - 1}
                  className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10
                             text-white/70 hover:text-white hover:bg-black/60 disabled:opacity-30
                             disabled:cursor-not-allowed transition-all"
                  title="Bajar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Card content */}
            <div className="p-4 space-y-3">
              <h3 className="text-lg font-semibold text-white truncate">{card.title}</h3>
              <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{card.description}</p>

              {/* URLs */}
              <div className="space-y-1">
                {card.codeUrl && (
                  <a
                    href={card.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 truncate transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    {card.codeUrl}
                  </a>
                )}
                {card.demoUrl && (
                  <a
                    href={card.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 truncate transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {card.demoUrl}
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => openEdit(card.id)}
                  className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10
                             text-sm text-white/80 hover:bg-white/10 hover:text-white
                             transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar
                </button>
                {confirmDeleteId === card.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(card.id)}
                      disabled={deletingId === card.id}
                      className="px-3 py-2 rounded-xl bg-red-500/20 border border-red-500/30
                                 text-sm text-red-400 hover:bg-red-500/30 transition-all duration-200
                                 disabled:opacity-50"
                    >
                      {deletingId === card.id ? '...' : 'Sí'}
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="px-3 py-2 rounded-xl bg-white/5 border border-white/10
                                 text-sm text-slate-400 hover:bg-white/10 transition-all duration-200"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(card.id)}
                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/10
                               text-sm text-red-400/70 hover:bg-red-500/10 hover:text-red-400
                               hover:border-red-500/20 transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal content */}
          <div className="relative w-full max-w-2xl md:max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl
                          bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40">
            {/* Modal header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4
                            bg-slate-900/80 backdrop-blur-xl border-b border-white/5">
              <h3 className="text-xl font-bold text-white">
                {editingId ? 'Editar proyecto' : 'Nuevo proyecto'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400
                           hover:text-white hover:bg-white/10 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-5">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Title */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-300">Título *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                             text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                             focus:ring-1 focus:ring-blue-500/20 transition-all"
                  placeholder="Nombre del proyecto"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-300">Descripción *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                             text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                             focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
                  placeholder="Breve descripción del proyecto"
                />
              </div>

              {/* Problem Solved */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-300">¿Qué problema resuelve? *</label>
                <textarea
                  value={form.problemSolved}
                  onChange={(e) => setForm((f) => ({ ...f, problemSolved: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                             text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                             focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
                  placeholder="Explica qué problema específico resuelve este proyecto..."
                />
              </div>

              {/* Architectural Doc */}
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-300">Documentación Arquitectónica (Soporta Markdown) *</label>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                    <strong>⚠️ Aviso de seguridad:</strong> No expongas contraseñas, claves de API, credenciales ni información sensible en este documento.
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Editor Column */}
                  <div className="flex flex-col space-y-2">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md min-h-[38px]">
                      <button
                        type="button"
                        onClick={() => insertMarkdown('**', '**', 'Texto')}
                        className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-white/90 transition-all active:scale-95"
                        title="Negrita"
                      >
                        Negrita
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('## ', '', 'Título')}
                        className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-white/90 transition-all active:scale-95"
                        title="Título"
                      >
                        Título
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('```javascript\n', '\n```', '')}
                        className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-white/90 transition-all active:scale-95"
                        title="Código"
                      >
                        Código
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('[', '](https://link.com)', 'Texto')}
                        className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-white/90 transition-all active:scale-95"
                        title="Enlace"
                      >
                        Enlace
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('![', '](https://url-imagen.com)', 'Descripción')}
                        className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-white/90 transition-all active:scale-95"
                        title="Imagen"
                      >
                        Imagen
                      </button>
                      
                      <div className="h-4 w-px bg-white/10 mx-0.5" />

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-2 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/40 text-[11px] font-semibold text-blue-400 transition-all flex items-center gap-1 active:scale-95"
                        title="Importar archivo .md"
                      >
                        📥 Cargar .md
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImportMarkdown}
                        accept=".md"
                        className="hidden"
                      />
                    </div>

                    <textarea
                      ref={textareaRef}
                      value={form.architecturalDoc}
                      onChange={(e) => setForm((f) => ({ ...f, architecturalDoc: e.target.value }))}
                      onScroll={handleScroll}
                      className="w-full h-[220px] md:h-[280px] px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                                 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                                 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none font-mono text-sm overflow-y-auto"
                      placeholder="### Arquitectura de la Solución..."
                    />
                  </div>

                  {/* Live Preview Column */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center px-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md h-[38px]">
                      <span className="text-xs font-semibold text-slate-400">Previsualización en Vivo</span>
                    </div>

                    <div
                      ref={previewRef}
                      className="prose max-w-none text-slate-700 leading-relaxed font-sans bg-white p-4 rounded-xl border border-slate-200 overflow-y-auto h-[220px] md:h-[280px]"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          parseMarkdownToHtml(form.architecturalDoc || '_Escribe en el editor o carga un archivo .md para previsualizar_'),
                          { ALLOWED_TAGS: ALLOWED_HTML_TAGS }
                        )
                      }}
                    />
                  </div>
                </div>
              </div>


              {/* Button text */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-300">Texto del botón</label>
                <input
                  value={form.buttonText}
                  onChange={(e) => setForm((f) => ({ ...f, buttonText: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                             text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                             focus:ring-1 focus:ring-blue-500/20 transition-all"
                  placeholder="Ver más..."
                />
              </div>

              {/* URLs row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-300">URL del código</label>
                  <input
                    value={form.codeUrl}
                    onChange={(e) => setForm((f) => ({ ...f, codeUrl: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                               text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                               focus:ring-1 focus:ring-blue-500/20 transition-all"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-300">URL del demo</label>
                  <input
                    value={form.demoUrl}
                    onChange={(e) => setForm((f) => ({ ...f, demoUrl: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                               text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                               focus:ring-1 focus:ring-blue-500/20 transition-all"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Images row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-300">Imagen de card</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCardImage(e.target.files?.[0] ?? null)}
                      className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4
                                 file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                                 file:font-medium file:cursor-pointer hover:file:bg-white/15
                                 file:transition-all cursor-pointer"
                    />
                  </div>
                  {cardImage && (
                    <p className="text-xs text-emerald-400 truncate">{cardImage.name}</p>
                  )}
                  {editingId && !cardImage && (
                    <p className="text-xs text-slate-500">Imagen actual se mantiene si no seleccionas otra</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-300">Imagen de fondo</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setBgImage(e.target.files?.[0] ?? null)}
                      className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4
                                 file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                                 file:font-medium file:cursor-pointer hover:file:bg-white/15
                                 file:transition-all cursor-pointer"
                    />
                  </div>
                  {bgImage && (
                    <p className="text-xs text-emerald-400 truncate">{bgImage.name}</p>
                  )}
                  {editingId && !bgImage && (
                    <p className="text-xs text-slate-500">Fondo actual se mantiene si no seleccionas otro</p>
                  )}
                </div>
              </div>

              {/* Order */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-300">Orden</label>
                <input
                  type="number"
                  min={0}
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))}
                  className="w-32 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                             text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                             focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Preview */}
              {form.title && (
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-300">Vista previa</label>
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-transparent
                                  p-6 backdrop-blur-xl h-48 border border-white/10">
                    {(cardImage || (editingId && list.find((c) => c.id === editingId)?.img)) && (
                      <img
                        src={cardImage ? URL.createObjectURL(cardImage) : list.find((c) => c.id === editingId)?.img}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                      />
                    )}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="space-y-2">
                        <h4 className="text-2xl font-bold text-white drop-shadow-lg">{form.title}</h4>
                        <p className="text-white/80 text-sm leading-relaxed line-clamp-2">{form.description}</p>
                      </div>
                      <span className="w-fit px-4 py-2 rounded-lg bg-white/5 backdrop-blur-lg border border-white/20
                                       text-white/90 text-sm font-medium">
                        {form.buttonText || 'Ver más...'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="sticky bottom-0 flex justify-end gap-3 p-6 pt-4
                            bg-slate-900/80 backdrop-blur-xl border-t border-white/5">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10
                           text-slate-300 hover:bg-white/10 hover:text-white transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
                           text-white font-medium hover:from-blue-500 hover:to-blue-400
                           transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50
                           disabled:cursor-not-allowed active:scale-95 flex items-center gap-2"
              >
                {saving && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {saving ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear proyecto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
````

## File: src/modules/projects/components/InformationContent.tsx
````typescript
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTAINERCARDS, CARDS, INLINECARDS } from "../../../shared/utils/variants";
import { useSkillSections, useKnowledgeSections } from "../hooks/useInfoSections";

interface SkillGroup {
    readonly title: string;
    readonly color: "blue" | "purple" | "green";
    readonly items: readonly string[];
}

interface KnowledgeGroup {
    readonly title: string;
    readonly color: "blue" | "purple" | "green";
    readonly items: readonly string[];
}

const FALLBACK_SKILLS: SkillGroup[] = [
    { title: "Información", color: "blue", items: ["Wilmer Lynch - Programador Full Stack"] },
    { title: "Lenguajes", color: "purple", items: ["JavaScript", "Python"] },
    { title: "Frameworks", color: "green", items: ["React", "Django", "PHP", "Next.js"] },
    { title: "MERN de React", color: "blue", items: ["MongoDB", "Express.js", "React", "Node.js"] },
    { title: "MERN de Django", color: "blue", items: ["MongoDB + Express + React + Node.js", "Alternativa con Django: PostgreSQL + Django + React"] },
];

const FALLBACK_KNOWLEDGES: KnowledgeGroup[] = [
    { title: "📚 Librerías para React (4 años) — Estado y Gestión", color: "blue", items: ["Redux — Gestión de estado predecible", "Zustand — Gestión de estado minimalista", "React Query / TanStack Query — Estado del servidor"] },
    { title: "🧭 Ruteo", color: "purple", items: ["React Router — Ruteo para SPA", "Next.js Router — Ruteo por file-system"] },
    { title: "🎨 UI Components y Styling", color: "blue", items: ["Material-UI (MUI)", "Ant Design", "Chakra UI", "Tailwind CSS", "Styled Components"] },
    { title: "📝 Formularios", color: "purple", items: ["React Hook Form", "Formik"] },
    { title: "🧪 Testing", color: "blue", items: ["Jest", "React Testing Library"] },
    { title: "🧰 Utilidades", color: "purple", items: ["Axios", "React Spring / Framer Motion", "React Icons", "date-fns"] },
    { title: "⚙️ Librerías Django (4 años) — APIs REST", color: "blue", items: ["Django REST Framework (DRF)"] },
    { title: "🔐 Autenticación y Autorización", color: "purple", items: ["Django Allauth", "DRF Simple JWT", "Django Cors Headers"] },
    { title: "🗄️ Bases de Datos y ORM", color: "blue", items: ["Django Debug Toolbar", "Django Extensions", "Django Filter"] },
    { title: "📋 Formularios y UI", color: "purple", items: ["Django Crispy Forms"] },
    { title: "🛡️ Seguridad", color: "blue", items: ["Django Guardian"] },
    { title: "🚀 Desarrollo y Deployment", color: "purple", items: ["Django Environ", "WhiteNoise", "Django Storages"] },
    { title: "🧪 Testing (Django)", color: "blue", items: ["pytest-django"] },
    { title: "🔧 Otras Utilidades (Django)", color: "purple", items: ["Celery", "Django Redis"] },
    { title: "💼 ¿A qué me dedico?", color: "purple", items: ["Creación de páginas web", "Administrador de servidores", "Creación de bots de Telegram", "Automatización de procesos (n8n)", "Integraciones: web + automatización + feedback por Telegram"] },
    { title: "📖 ¿Cómo aprendí?", color: "blue", items: ["Autodidacta: videos, libros y práctica", "Canales: HolaMundoDev, mouredev, ProgramadorX, soydalto, Platzi, FaztTech"] },
    { title: "📚 Libros", color: "purple", items: ["Patterns of Enterprise Application Architecture — Martin Fowler", "JavaScript: The Good Parts — Douglas Crockford", "Clean Architecture — Robert C. Martin", "The Clean Coder — Robert C. Martin", "Atomic Habits — James Clear", "The Linux Programming Interface — Michael Kerrisk", "Clean Code — Robert C. Martin"] },
    { title: "✍️ ¿Cómo me gusta escribir el código?", color: "blue", items: ["Entender primero el problema", "Definir los requisitos", "Planificar la solución", "Aplicar Principios SOLID y Clean Code", "Practicar patrones de diseño", "Manejo de errores robusto"] },
    { title: "🎯 ¿A dónde quiero llegar? (Especialización)", color: "purple", items: ["Creación de E-commerce", "Frameworks: React (conocimientos), Next.js (conocimientos)", "Frameworks: Vue.js + Nuxt.js (sin conocimientos)", "Frameworks: Angular (sin conocimientos)", "Frameworks: Svelte + SvelteKit (sin conocimientos)"] },
    { title: "🛒 Librerías específicas e-commerce", color: "blue", items: ["Shopify Storefront API (para React) — con conocimientos", "Commerce.js — sin conocimientos"] },
];

const COLOR_CONFIG = {
    blue: {
        bg: 'bg-blue-400',
        shadow: 'shadow-blue-400/50',
        gradient: 'from-blue-400 to-blue-300',
        textColor: 'text-blue-400',
        textHoverColor: 'group-hover/skill:text-blue-300'
    },
    purple: {
        bg: 'bg-purple-400',
        shadow: 'shadow-purple-400/50',
        gradient: 'from-purple-400 to-purple-300',
        textColor: 'text-purple-400',
        textHoverColor: 'group-hover/skill:text-purple-300'
    },
    green: {
        bg: 'bg-green-400',
        shadow: 'shadow-green-400/50',
        gradient: 'from-green-400 to-green-300',
        textColor: 'text-green-400',
        textHoverColor: 'group-hover/skill:text-green-300'
    }
} as const;

const SkillGroupCard: React.FC<{ readonly group: SkillGroup; readonly index: number }> = ({ group, index }) => {
    const currentColor = COLOR_CONFIG[group.color] ?? COLOR_CONFIG.blue;

    return (
        <motion.div
            className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)] min-w-0 break-words overflow-hidden"
            variants={CARDS}
            whileHover={{ y: -3, scale: 1.02 }}
            custom={index}
        >
            <div className={`absolute -top-2 -right-2 w-3 h-3 rounded-full ${currentColor.bg} shadow-lg ${currentColor.shadow}`} />
            <motion.div
                className="relative z-10 transform-gpu will-change-transform"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 4.5 + (index % 3) * 0.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
                <h3 className={`font-semibold text-sm md:text-base mb-2.5 bg-gradient-to-r ${currentColor.gradient} bg-clip-text text-transparent`}>
                    {group.title}
                </h3>
                <ul className="space-y-1">
                    {group.items.map((item, idx) => (
                        <motion.li
                            key={idx}
                            className="flex items-start gap-1.5 text-xs md:text-sm text-slate-300 group/skill"
                            whileHover={{ x: 2 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <span className={`mt-0.5 flex-shrink-0 transition-colors ${currentColor.textColor} ${currentColor.textHoverColor}`}>•</span>
                            <span className="group-hover/skill:text-white transition-colors">{item}</span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
};

const KnowledgeTimelineItem: React.FC<{ readonly item: KnowledgeGroup; readonly index: number }> = ({ item, index }) => {
    const currentColor = COLOR_CONFIG[item.color] ?? COLOR_CONFIG.blue;
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handlePointerDown = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node | null;
            if (!containerRef.current || !target) return;
            if (!containerRef.current.contains(target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('touchstart', handlePointerDown);
        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('touchstart', handlePointerDown);
        };
    }, []);

    useEffect(() => {
        if (isOpen) containerRef.current?.focus();
    }, [isOpen]);

    return (
        <motion.li className="group relative" variants={INLINECARDS} custom={index}>
            <motion.div
                ref={containerRef}
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)] focus:outline-none focus:ring-2 focus:ring-blue-400/60"
                whileHover={{ y: -2, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div className={`absolute -top-2 -left-2 w-3 h-3 rounded-full ${currentColor.bg} shadow-lg ${currentColor.shadow}`} />
                <motion.div
                    className="relative z-10 transform-gpu will-change-transform"
                    animate={{ y: [0, -1.5, 0] }}
                    transition={{ duration: 5 + (index % 3) * 0.7, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                >
                    <h3 className="text-sm sm:text-base font-semibold mb-2.5 text-white pr-4 leading-snug">
                        {item.title}
                    </h3>
                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <motion.ul
                                key="details"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                className="space-y-1.5"
                                aria-hidden={!isOpen}
                            >
                                {item.items.map((detail, idx) => (
                                    <motion.li
                                        key={idx}
                                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 group/item"
                                        whileHover={{ x: 2 }}
                                        transition={{ type: 'spring', stiffness: 400 }}
                                    >
                                        <span className="text-blue-400 mt-0.5 flex-shrink-0 group-hover/item:text-blue-300 transition-colors">▸</span>
                                        <span className="group-hover/item:text-white transition-colors">{detail}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </motion.li>
    );
};

export const SkillSection: React.FC = () => {
    const { skills, isLoading } = useSkillSections();
    const data: SkillGroup[] = skills.length > 0
        ? skills.map(s => ({ title: s.title, color: s.color, items: s.items }))
        : FALLBACK_SKILLS;

    return (
        <motion.article
            className="w-full min-w-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={CONTAINERCARDS}
        >
            <motion.h2
                className="font-bold text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-3"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Información
            </motion.h2>
            <div className="space-y-3 text-base leading-relaxed">
                <motion.p
                    className="text-justify sm:text-left text-slate-200 text-sm sm:text-base"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Wilmer Lynch — Programador Full Stack.
                </motion.p>
                {isLoading ? (
                    <div className="flex items-center gap-2 text-slate-400 text-sm py-4">
                        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                        Cargando...
                    </div>
                ) : (
                    <motion.div
                        className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        variants={CONTAINERCARDS}
                    >
                        {data.map((group, index) => (
                            <SkillGroupCard key={index} group={group} index={index} />
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.article>
    );
};

export const ExpAndTecnologies: React.FC = () => {
    const { knowledges, isLoading } = useKnowledgeSections();
    const data: KnowledgeGroup[] = knowledges.length > 0
        ? knowledges.map(k => ({ title: k.title, color: k.color, items: k.items }))
        : FALLBACK_KNOWLEDGES;

    return (
        <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={CONTAINERCARDS}
        >
            <motion.h2
                className="font-bold text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Tecnologías y Experiencia
            </motion.h2>
            {isLoading ? (
                <div className="flex items-center gap-2 text-slate-400 text-sm py-4">
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    Cargando...
                </div>
            ) : (
                <motion.ul
                    className="mt-4 space-y-4 sm:space-y-5 grid gap-4 sm:gap-5 lg:grid-cols-2"
                    variants={CONTAINERCARDS}
                >
                    {data.map((item, index) => (
                        <KnowledgeTimelineItem key={index} item={item} index={index} />
                    ))}
                </motion.ul>
            )}
        </motion.article>
    );
};
````

## File: src/modules/projects/components/ProjectCard.tsx
````typescript
import React, { useRef, useEffect } from "react";
import { CardProps } from "../../../types/types";
import { handleMouseMove, resetCardPosition } from "../../../shared/utils/cardAnimations";
import { useNavigate } from "react-router-dom";

/**
 * Componente de tarjeta interactiva con efectos de movimiento y navegación
 * @component
 * @param {CardProps} props - Propiedades del componente
 * @param {string} props.id - Identificador único del proyecto
 * @param {string} props.img - URL de la imagen de fondo
 * @param {string} props.title - Título de la tarjeta
 * @param {string} props.description - Descripción corta del proyecto
 * @param {string} props.buttonText - Texto del botón de acción
 * @returns {JSX.Element} Tarjeta interactiva con efecto parallax y navegación
 * 
 * @example
 * <Card
 *   id="proyecto-1"
 *   img="/imagen.jpg"
 *   title="Mi Proyecto"
 *   description="Descripción detallada"
 *   buttonText="Ver demo"
 * />
 */
const Card: React.FC<CardProps> = ({ id, img, title, description, buttonText }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  /**
   * Efecto para configurar interacciones de movimiento
   * @effect
   * @description Configura los listeners de eventos para las animaciones
   * - Movimiento del mouse: Aplica efecto parallax
   * - Salida del mouse: Restablece posición
   * - Limpieza automática al desmontar el componente
   */
  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;

    if (!card || !content) return;

    // Configurar sensibilidad del efecto
    const sensitivity = 1.15;

    const optimizedMouseMove = (e: MouseEvent) => {
      handleMouseMove(e, card, content, sensitivity);
    };

    card.addEventListener("mousemove", optimizedMouseMove);
    card.addEventListener("mouseleave", () => resetCardPosition(card, content));

    return () => {
      card.removeEventListener("mousemove", optimizedMouseMove);
      card.removeEventListener("mouseleave", () => resetCardPosition(card, content));
    };
  }, []);

  /**
   * Maneja la navegación a la página de demo
   * @function handleNavigation
   * @description Navega a la ruta del proyecto y hace scroll suave al inicio
   */
  const handleNavigation = () => {
    navigate(`/page/${id}`);
    window.scrollTo({ 
      top: -80, // Scroll al inicio de la página
      behavior: "smooth" // Efecto de scroll suave
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-xl transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl h-72 cursor-pointer group"
      role="article"
      aria-label={`Tarjeta del proyecto: ${title}`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform" // Optimización para animaciones
      }}
    >
      {/* Imagen con efecto de profundidad */}
      <img
        src={img}
        alt={`Visualización del proyecto ${title}`}
        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
        loading="lazy" 
        decoding="async" 
      />

      {/* Contenido con efecto de flotación */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-between transform-gpu"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            {title}
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* Botón con feedback interactivo */}
        <button
          onClick={handleNavigation}
          className="w-fit px-6 py-3 rounded-lg bg-white/5 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl text-white/90 font-medium transition-all duration-300 flex items-center gap-2 hover:bg-white/10 hover:border-white/30 hover:text-white active:scale-95"
          aria-label={`Ver demo del proyecto: ${title}`}
        >
          <span>{buttonText}</span>
          <span className="opacity-80 group-hover:translate-x-1 group-hover:opacity-100 transition-transform">
            →
          </span>
        </button>
      </div>
    </div>
  );
};

export default Card;

// ===========================================
// 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
// ===========================================
// 
// Este archivo es un COMPONENTE REACT que implementa una tarjeta interactiva
// con efectos de parallax y navegación. Es un ejemplo perfecto de cómo crear
// componentes reutilizables con animaciones avanzadas y buena documentación.
// Te explico paso a paso qué hace cada parte:
//
// 🎯 ¿QUÉ ES ESTE ARCHIVO?
// Es un componente de tarjeta que muestra información de proyectos con
// efectos visuales interactivos. Combina parallax, navegación, y optimizaciones
// de rendimiento para crear una experiencia de usuario atractiva.
//
// 📋 DESGLOSE POR SECCIONES:
//
// 1. IMPORTS Y DEPENDENCIAS (líneas 1-4):
//    - React: useRef, useEffect para manejo de estado y referencias
//    - CardProps: Interface TypeScript importada desde types
//    - cardAnimations: Funciones utilitarias para animaciones
//    - useNavigate: Hook de React Router para navegación
//    - ¿Por qué esta estructura? Separación clara de responsabilidades
//
// 2. DOCUMENTACIÓN JSDOC (líneas 6-25):
//    - @component: Marca el componente
//    - @param: Documenta cada prop con tipo y descripción
//    - @returns: Describe el elemento JSX retornado
//    - @example: Ejemplo de uso del componente
//    - ¿Por qué JSDoc? Mejora la experiencia de desarrollo y documentación
//
// 3. COMPONENTE PRINCIPAL (líneas 26-29):
//    - Card: Componente funcional tipado con CardProps
//    - Destructuring: Extrae todas las props necesarias
//    - Refs: cardRef y contentRef para animaciones
//    - navigate: Hook para navegación programática
//    - ¿Por qué destructuring? Código más limpio y legible
//
// 4. CONFIGURACIÓN DE ANIMACIONES (líneas 39-59):
//    - useEffect: Configura event listeners al montar
//    - Verificación: if (!card || !content) return para seguridad
//    - sensitivity: 1.15 para controlar la intensidad del efecto
//    - optimizedMouseMove: Función optimizada para el evento
//    - Event listeners: mousemove y mouseleave
//    - Cleanup: Remueve listeners al desmontar
//    - ¿Por qué cleanup? Previene memory leaks
//
// 5. FUNCIÓN DE NAVEGACIÓN (líneas 66-69):
//    - handleNavigation: Función para navegar a la página del proyecto
//    - navigate(`/page/${id}`): Navegación a la página del proyecto
//    - window.scrollTo(): Scroll suave al inicio de la página
//    - ¿Por qué scroll? Mejora la experiencia de usuario
//
// 6. RENDER PRINCIPAL (líneas 71-118):
//    - div contenedor: Elemento principal con ref y estilos
//    - Imagen: Fondo con efecto de profundidad
//    - Contenido: Título, descripción y botón
//    - Botón: Con feedback interactivo y navegación
//
// 🎨 CONCEPTOS DE DISEÑO:
//
// 1. PARALLAX EFFECT:
//    - handleMouseMove: Función externa para efecto parallax
//    - sensitivity: Controla la intensidad del movimiento
//    - resetCardPosition: Restablece la posición al salir
//    - ¿Por qué parallax? Crea sensación de profundidad
//
// 2. VISUAL LAYERING:
//    - Imagen: Fondo con opacity 40%, aumenta a 50% en hover
//    - Contenido: z-10 para estar sobre la imagen
//    - Botón: Feedback visual con hover y active states
//    - ¿Por qué capas? Crea profundidad visual
//
// 3. INTERACTIVE FEEDBACK:
//    - hover:scale-[1.02]: Escala sutil en hover
//    - hover:shadow-2xl: Sombra más intensa
//    - active:scale-95: Feedback al hacer click
//    - ¿Por qué feedback? Mejora la experiencia de usuario
//
// ⚡ OPTIMIZACIONES DE RENDIMIENTO:
//
// 1. CSS OPTIMIZATIONS:
//    - transformStyle: "preserve-3d": Optimiza transformaciones 3D
//    - willChange: "transform": Indica al navegador que optimice
//    - transform-gpu: Fuerza aceleración por hardware
//    - ¿Por qué optimizaciones? Mejor rendimiento en animaciones
//
// 2. IMAGE OPTIMIZATION:
//    - loading="lazy": Carga diferida de imágenes
//    - decoding="async": Decodificación asíncrona
//    - object-cover: Mantiene proporciones
//    - ¿Por qué lazy loading? Mejora el tiempo de carga inicial
//
// 3. EVENT OPTIMIZATION:
//    - optimizedMouseMove: Función optimizada
//    - Cleanup automático: Previene memory leaks
//    - Event delegation: Un solo listener por evento
//    - ¿Por qué optimización? Mejor rendimiento general
//
// 🎯 PATRONES APLICADOS:
//
// 1. COMPONENT COMPOSITION:
//    - Props tipadas: CardProps interface
//    - Reutilización: Componente genérico para cualquier proyecto
//    - Separación: Lógica de animación en utils
//    - ¿Por qué composición? Mejor mantenibilidad
//
// 2. ACCESSIBILITY:
//    - role="article": Indica que es un artículo
//    - aria-label: Descripción para lectores de pantalla
//    - alt text: Descripción de la imagen
//    - ¿Por qué accesibilidad? Inclusión para todos los usuarios
//
// 3. RESPONSIVE DESIGN:
//    - Tailwind classes: Responsive por defecto
//    - h-72: Altura fija para consistencia
//    - flex layout: Adaptable a diferentes contenidos
//    - ¿Por qué responsive? Funciona en todos los dispositivos
//
// 🚀 FLUJO DE INTERACCIÓN:
// 1. Usuario mueve el mouse sobre la tarjeta
// 2. handleMouseMove aplica efecto parallax
// 3. La imagen y contenido se mueven independientemente
// 4. Al salir del mouse, resetCardPosition restablece la posición
// 5. Al hacer click en el botón, handleNavigation navega a la página
// 6. window.scrollTo hace scroll suave al inicio
//
// 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
// - Component composition patterns
// - Parallax effects con JavaScript
// - Performance optimization
// - Accessibility patterns
// - Event handling y cleanup
// - TypeScript interfaces
// - JSDoc documentation
// - Responsive design
//
// ¡Es un ejemplo excelente de cómo crear componentes reutilizables y bien documentados!
// ===========================================
````

## File: src/modules/projects/components/ProjectGrid.tsx
````typescript
import React from "react";
import { Link } from "react-router-dom";
import Card from "./ProjectCard";
import { useCards } from "../hooks/useCards";

const Grid: React.FC = () => {
  const { cards } = useCards();
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
      {cards.map((card) => (
        <Link to={`/page/${card.id}`} key={card.id}>
          <Card
            id={card.id}
            title={card.title}
            description={card.description}
            img={card.img}
            buttonText={card.buttonText}
          />
        </Link>
      ))}
    </div>
  );
};

export default Grid;

// ===========================================
// 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
// ===========================================
// 
// Este archivo es un COMPONENTE REACT que implementa una grilla de tarjetas
// usando datos externos y navegación con React Router. Es un ejemplo perfecto
// de cómo crear layouts responsivos y reutilizables. Te explico paso a paso:
//
// 🎯 ¿QUÉ ES ESTE ARCHIVO?
// Es un componente contenedor que renderiza múltiples tarjetas en una grilla
// responsiva. Combina datos externos, navegación, y diseño responsivo para
// crear una galería de proyectos interactiva.
//
// 📋 DESGLOSE POR SECCIONES:
//
// 1. IMPORTS Y DEPENDENCIAS (líneas 1-4):
//    - React: Para crear el componente funcional
//    - Link: Componente de React Router para navegación
//    - Card: Componente de tarjeta importado localmente
//    - cards: Array de datos desde config/cards
//    - ¿Por qué esta estructura? Separación clara de responsabilidades
//
// 2. COMPONENTE PRINCIPAL (líneas 6-22):
//    - Grid: Componente funcional sin props
//    - return: JSX que renderiza la grilla
//    - ¿Por qué sin props? Los datos vienen de la configuración externa
//
// 3. LAYOUT RESPONSIVO (línea 8):
//    - grid: Clase base de CSS Grid
//    - grid-cols-1: 1 columna en móvil
//    - sm:grid-cols-2: 2 columnas en tablet
//    - md:grid-cols-3: 3 columnas en desktop
//    - gap-6: Espaciado entre elementos
//    - p-6: Padding interno del contenedor
//    - ¿Por qué responsivo? Funciona en todos los dispositivos
//
// 4. RENDERIZADO DINÁMICO (líneas 9-19):
//    - cards.map(): Itera sobre el array de datos
//    - Link: Envuelve cada tarjeta para navegación
//    - to={`/page/${card.id}`}: Ruta dinámica basada en ID
//    - key={card.id}: Identificador único para React
//    - Card: Componente de tarjeta con props
//    - ¿Por qué map? Renderiza dinámicamente basado en datos
//
// 5. PROPS DE TARJETA (líneas 12-16):
//    - id: Identificador único del proyecto
//    - title: Título del proyecto
//    - description: Descripción del proyecto
//    - img: URL de la imagen
//    - buttonText: Texto del botón
//    - ¿Por qué estas props? Permiten personalizar cada tarjeta
//
// 🎨 CONCEPTOS DE DISEÑO:
//
// 1. CSS GRID:
//    - grid: Sistema de layout bidimensional
//    - grid-cols-*: Define número de columnas
//    - gap: Espaciado entre elementos
//    - ¿Por qué Grid? Mejor control del layout que Flexbox
//
// 2. RESPONSIVE BREAKPOINTS:
//    - sm: 640px y superior (tablet)
//    - md: 768px y superior (desktop)
//    - grid-cols-1: Móvil (por defecto)
//    - ¿Por qué breakpoints? Adapta el layout al dispositivo
//
// 3. COMPONENT COMPOSITION:
//    - Grid: Componente contenedor
//    - Card: Componente hijo reutilizable
//    - Link: Componente de navegación
//    - ¿Por qué composición? Mejor mantenibilidad y reutilización
//
// ⚡ OPTIMIZACIONES DE RENDIMIENTO:
//
// 1. REACT OPTIMIZATIONS:
//    - key prop: Identificador único para React
//    - Component composition: Reutilización de componentes
//    - Data separation: Datos en archivo externo
//    - ¿Por qué optimización? Mejor rendimiento y mantenibilidad
//
// 2. NAVIGATION OPTIMIZATION:
//    - Link component: Navegación optimizada de React Router
//    - Dynamic routes: Rutas basadas en datos
//    - ¿Por qué Link? Mejor rendimiento que navegación programática
//
// 3. LAYOUT OPTIMIZATION:
//    - CSS Grid: Layout nativo del navegador
//    - Responsive design: Una sola implementación para todos los dispositivos
//    - ¿Por qué Grid? Mejor rendimiento que JavaScript para layouts
//
// 🎯 PATRONES APLICADOS:
//
// 1. CONTAINER PATTERN:
//    - Grid: Componente contenedor
//    - Card: Componente presentacional
//    - Separación: Lógica de layout vs presentación
//    - ¿Por qué contenedor? Mejor separación de responsabilidades
//
// 2. DATA-DRIVEN RENDERING:
//    - cards.map(): Renderizado basado en datos
//    - Configuración externa: Datos separados del componente
//    - ¿Por qué data-driven? Fácil mantenimiento y actualización
//
// 3. RESPONSIVE DESIGN:
//    - Mobile-first: Diseño desde móvil hacia desktop
//    - Breakpoints: Adaptación a diferentes tamaños
//    - ¿Por qué responsive? Mejor experiencia en todos los dispositivos
//
// 🚀 FLUJO DE EJECUCIÓN:
// 1. Componente se monta
// 2. Importa datos desde config/cards
// 3. Renderiza la grilla con CSS Grid
// 4. Itera sobre el array de cards
// 5. Para cada card, crea un Link con Card
// 6. Usuario puede hacer click para navegar
//
// 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
// - Component composition patterns
// - CSS Grid para layouts responsivos
// - Data-driven rendering
// - React Router navigation
// - Responsive design principles
// - Container vs presentational components
// - Performance optimization
// - Code organization
//
// ¡Es un ejemplo excelente de cómo crear layouts responsivos y mantenibles!
// ===========================================
````

## File: src/modules/projects/config/cards.ts
````typescript
export interface CardData {
    id: string;
    title: string;
    description: string;
    img: string;
    buttonText: string;
    codeUrl?: string;
    demoUrl?: string;
    bgImage?: string;
    order?: number;
}

export const cards: CardData[] = [
    {
        id: "1",
        title: "E-Commerce",
        description: "Aplicacion de React con Redux y FakeStore API para crea un E-commerce",
        img: "assets/web7.webp",
        buttonText: "Ver mas...",
        codeUrl: "https://github.com/Will855/fakeStore",
        demoUrl: "https://fakestore-edf2003.web.app/",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 1,
    },
    {
        id: "2",
        title: "FutureCart",
        description: "E-commerce de teclados gaming",
        img: "assets/web2.webp",
        buttonText: "Ver más...",
        codeUrl: "https://github.com/Will855/Carrito-de-Compras-JavaScript",
        demoUrl: "https://will855.github.io/Carrito-de-Compras-JavaScript/",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 2,
    },
    {
        id: "3",
        title: "Barberia",
        description: "Interfaz de reserva - Selección de servicios y barberos.",
        img: "assets/web3.webp",
        buttonText: "Ver más...",
        codeUrl: "https://github.com/Will855/Barberia--Agendado-de-citas-",
        demoUrl: "https://will855.github.io/Barberia--Agendado-de-citas-/#servicios",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 3,
    },
    {
        id: "4",
        title: "Formulario",
        description: "Sistema de autenticación con login y registro",
        img: "assets/web4.webp",
        buttonText: "Ver más...",
        codeUrl: "https://github.com/Will855/formulario",
        demoUrl: "https://will855.github.io/formulario/",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 4,
    },
    {
        id: "5",
        title: "Paleta de colores",
        description: "Aplicacion de react que genera 21 tonalidades de cualquier color",
        img: "assets/web5.webp",
        buttonText: "Ver mas...",
        codeUrl: "https://github.com/Will855/paleta-de-colores",
        demoUrl: "https://will855.github.io/paleta-de-colores/",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 5,
    },
    {
        id: "6",
        title: "CRUD/Rest API",
        description: "CRUD de NodeJS con rest API para login con seguridad hash y manejo de errores",
        img: "assets/web6.webp",
        buttonText: "Ver mas...",
        codeUrl: "https://github.com/Will855/CRUD-NodeJS",
        demoUrl: "/page/6",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 6,
    },
    {
        id: "7",
        title: "HP Headphones",
        description: "Landing Page de Auriculares",
        img: "assets/web1.webp",
        buttonText: "Ver más...",
        codeUrl: "https://github.com/Will855/HeadPhones",
        demoUrl: "https://will855.github.io/HeadPhones/",
        bgImage: "/images/bg-proyecto1.jpg",
        order: 7,
    },
];
````

## File: src/modules/projects/config/project.ts
````typescript
/**
 * IDs de proyectos (páginas /page/:id).
 * Los datos (título, descripción, URLs, imagen) vienen de Supabase (cards)
 * y el contenido editable de Supabase (project_content).
 */
export const projectIds: string[] = ['1', '2', '3', '4', '5', '6', '7'];

/** Fallback de metadata cuando Supabase no devuelve projects_meta (para useProjectsMeta). */
export const projectMetaFallback: Record<string, { codeUrl: string; demoUrl: string; bgProyect: string }> = {
  '1': { codeUrl: 'https://github.com/Will855/fakeStore', demoUrl: 'https://fakestore-edf2003.web.app/', bgProyect: '/images/bg-proyecto2.jpg' },
  '2': { codeUrl: 'https://github.com/Will855/Carrito-de-Compras-JavaScript', demoUrl: 'https://will855.github.io/Carrito-de-Compras-JavaScript/', bgProyect: '/images/bg-proyecto2.jpg' },
  '3': { codeUrl: 'https://github.com/Will855/Barberia--Agendado-de-citas-', demoUrl: 'https://will855.github.io/Barberia--Agendado-de-citas-/#servicios', bgProyect: '/images/bg-proyecto2.jpg' },
  '4': { codeUrl: 'https://github.com/Will855/formulario', demoUrl: 'https://will855.github.io/formulario/', bgProyect: '/images/bg-proyecto2.jpg' },
  '5': { codeUrl: 'https://github.com/Will855/paleta-de-colores', demoUrl: 'https://will855.github.io/paleta-de-colores/', bgProyect: '/images/bg-proyecto2.jpg' },
  '6': { codeUrl: 'https://github.com/Will855/CRUD-NodeJS', demoUrl: '/page/6', bgProyect: '/images/bg-proyecto2.jpg' },
  '7': { codeUrl: 'https://github.com/Will855/HeadPhones', demoUrl: 'https://will855.github.io/HeadPhones/', bgProyect: '/images/bg-proyecto1.jpg' },
};
````

## File: src/modules/projects/hooks/useCards.ts
````typescript
/**
 * @file useCards.ts
 * @description Hook para obtener la lista de proyectos/cards desde Supabase.
 * Proporciona datos unificados (título, descripción, imagen, URLs, orden) con fallback
 * a configuración local cuando Supabase no está disponible o no devuelve datos.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';
import type { CardRow } from '../../../types/supabase';
import type { CardProps } from '../../../types/types';
import { cards as fallbackCards } from '../config/cards';

/**
 * Convierte un elemento del fallback (config/cards) al formato CardProps usado en la app.
 * @param c - Card del fallback
 * @returns Card con URLs absolutas y campos extendidos (codeUrl, demoUrl, bgImage, order)
 * @internal
 */
function mapFallback(c: (typeof fallbackCards)[number]): CardProps {
  return {
    id: c.id,
    title: c.title,
    description: c.description,
    img: c.img.startsWith('http') ? c.img : `/${c.img}`,
    problem_solved: '',
    architectural_doc: '',
    buttonText: c.buttonText,
    codeUrl: c.codeUrl ?? '',
    demoUrl: c.demoUrl ?? '',
    bgImage: c.bgImage ?? '/images/bg-proyecto2.jpg',
    order: c.order ?? 0,
  };
}

/**
 * Obtiene las cards desde Supabase (tabla `cards`) o devuelve el fallback local.
 * Resuelve las rutas de imagen con getStoragePublicUrl para Storage de Supabase.
 * @returns Lista de proyectos ordenados por `order` e `id`
 * @internal
 */
async function fetchCards(): Promise<CardProps[]> {
  if (!isSupabaseConfigured) {
    return fallbackCards.map(mapFallback);
  }
  const { data, error } = await supabase.from('cards').select('*').order('order').order('id');
  if (error || !data?.length) {
    return fallbackCards.map(mapFallback);
  }
  return (data as CardRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    img: getStoragePublicUrl(row.image_path) || `/${row.image_path}`,
    buttonText: row.button_text,
    codeUrl: row.code_url,
    demoUrl: row.demo_url,
    bgImage: getStoragePublicUrl(row.bg_image_path) || row.bg_image_path || '/images/bg-proyecto2.jpg',
    order: row.order,
    problem_solved: row.problem_solved,
    architectural_doc: row.architectural_doc,
  }));
}

/**
 * Hook que expone la lista de proyectos (cards) para la grilla y páginas de detalle.
 * Usa TanStack Query con cache de 5 minutos y placeholder con datos del fallback.
 * @returns Objeto con la lista de cards, estado de carga, error y función para refrescar
 * @example
 * const { cards, isLoading, refetch } = useCards();
 * if (isLoading) return <Spinner />;
 * return cards.map(c => <Card key={c.id} {...c} />);
 */
export function useCards() {
  const defaults = fallbackCards.map(mapFallback);
  const q = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
    staleTime: 5 * 60 * 1000,
    placeholderData: defaults,
  });
  return {
    cards: Array.isArray(q.data) && q.data.length > 0 ? q.data : defaults,
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
````

## File: src/modules/projects/hooks/useInfoSections.ts
````typescript
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import type { InfoSectionRow } from '../../../types/supabase';

async function fetchInfoSections(sectionType: 'skill' | 'knowledge'): Promise<InfoSectionRow[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('info_sections')
    .select('*')
    .eq('section_type', sectionType)
    .order('order', { ascending: true });
  if (error || !data) return [];
  return data.map((row: Record<string, unknown>) => ({
    ...row,
    items: Array.isArray(row.items) ? row.items : JSON.parse(String(row.items || '[]')),
  })) as InfoSectionRow[];
}

export function useSkillSections() {
  const q = useQuery({
    queryKey: ['info_sections', 'skill'],
    queryFn: () => fetchInfoSections('skill'),
    staleTime: 5 * 60 * 1000,
  });
  return {
    skills: q.data ?? [],
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}

export function useKnowledgeSections() {
  const q = useQuery({
    queryKey: ['info_sections', 'knowledge'],
    queryFn: () => fetchInfoSections('knowledge'),
    staleTime: 5 * 60 * 1000,
  });
  return {
    knowledges: q.data ?? [],
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
````

## File: src/modules/projects/hooks/useProjectContent.ts
````typescript
/**
 * @file useProjectContent.ts
 * @description Hook para obtener los bloques de contenido (texto, imagen, video) de un proyecto
 * desde la tabla `project_content` de Supabase. Usado en el editor de contenido del admin
 * y en la página pública de detalle del proyecto.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import type { ProjectContentRow } from '../../../types/supabase';

/**
 * Representa un bloque de contenido editable de un proyecto.
 * @property id - UUID del bloque
 * @property projectId - ID del proyecto (FK a cards.id)
 * @property type - Tipo: 'text' | 'image' | 'video'
 * @property content - Contenido: HTML para texto, path en Storage para imagen/video
 * @property caption - Pie de imagen o video (opcional)
 * @property order - Orden de visualización
 */
export interface ProjectContentBlock {
  id: string;
  projectId: string;
  type: 'text' | 'image' | 'video';
  content: string;
  caption: string;
  order: number;
}

/**
 * Obtiene los bloques de contenido de un proyecto desde la tabla project_content.
 * @param projectId - ID del proyecto
 * @returns Lista de bloques ordenados por `order`
 * @internal
 */
async function fetchProjectContent(projectId: string): Promise<ProjectContentBlock[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('project_content')
    .select('*')
    .eq('project_id', projectId)
    .order('order');
  
  if (error) return [];
  if (!data?.length) return [];
  return (data as ProjectContentRow[]).map((row) => ({
    id: row.id,
    projectId: row.project_id,
    type: row.type,
    content: row.content,
    caption: row.caption ?? '',
    order: row.order,
  }));
}

/**
 * Hook que expone los bloques de contenido de un proyecto para edición (admin) o visualización (página pública).
 * La query solo se ejecuta cuando projectId está definido y Supabase está configurado.
 * @param projectId - ID del proyecto; si es undefined, la query no se ejecuta
 * @returns blocks, isLoading, error y refetch
 * @example
 * const { blocks, isLoading } = useProjectContent(id);
 * if (isLoading) return <Spinner />;
 * return blocks.map(b => <ContentBlock key={b.id} block={b} />);
 */
export function useProjectContent(projectId: string | undefined) {
  const q = useQuery({
    queryKey: ['project_content', projectId],
    queryFn: () => fetchProjectContent(projectId!),
    enabled: !!projectId && isSupabaseConfigured,
    staleTime: 5 * 60 * 1000,
  });
  return {
    blocks: q.data ?? [],
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
````

## File: src/modules/projects/hooks/useProjectsMeta.ts
````typescript
/**
 * @file useProjectsMeta.ts
 * @description Hook para obtener metadata de proyectos (imagen de fondo, URLs de código y demo, orden)
 * desde la tabla projects_meta de Supabase. Proporciona getMeta y fallbackMeta.
 * Nota: Los datos principales están en cards (useCards); este hook puede usarse como respaldo.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';
import type { ProjectMetaRow } from '../../../types/supabase';
import { projectMetaFallback } from '../config/project';

/**
 * Metadata de un proyecto: fondo, URLs y orden.
 * @property id - ID del proyecto
 * @property bgProyect - URL de la imagen de fondo
 * @property codeUrl - URL del repositorio (ej: GitHub)
 * @property demoUrl - URL del demo en vivo
 * @property order - Orden de visualización
 */
export interface ProjectMeta {
  id: string;
  bgProyect: string;
  codeUrl: string;
  demoUrl: string;
  order: number;
}

/**
 * Obtiene toda la metadata de proyectos desde la tabla projects_meta.
 * @returns Lista ordenada por `order` o null si no hay datos/error
 * @internal
 */
async function fetchProjectsMeta(): Promise<ProjectMeta[] | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('projects_meta')
    .select('*')
    .order('order');
  if (error || !data?.length) return null;
  return (data as ProjectMetaRow[]).map((row) => ({
    id: row.id,
    bgProyect: getStoragePublicUrl(row.bg_image_path) || `/images/bg-proyecto2.jpg`,
    codeUrl: row.code_url,
    demoUrl: row.demo_url,
    order: row.order,
  }));
}

/**
 * Hook que expone la metadata de todos los proyectos con helpers getMeta y fallbackMeta.
 * @returns projectsMeta, getMeta(id), fallbackMeta(id), isLoading, error y refetch
 * @example
 * const { getMeta, fallbackMeta } = useProjectsMeta();
 * const meta = getMeta(projectId) ?? fallbackMeta(projectId);
 * return <header style={{ backgroundImage: `url(${meta.bgProyect})` }} />;
 */
export function useProjectsMeta() {
  const q = useQuery({
    queryKey: ['projects_meta'],
    queryFn: fetchProjectsMeta,
    staleTime: 5 * 60 * 1000,
  });
  const metaMap = (q.data ?? []).reduce<Record<string, ProjectMeta>>((acc, m) => {
    acc[m.id] = m;
    return acc;
  }, {});
  return {
    projectsMeta: q.data ?? [],
    getMeta: (id: string): ProjectMeta | undefined => metaMap[id],
    fallbackMeta: (id: string): ProjectMeta => {
      const p = projectMetaFallback[id];
      return p
        ? { id, bgProyect: p.bgProyect, codeUrl: p.codeUrl, demoUrl: p.demoUrl, order: 0 }
        : { id, bgProyect: '/images/bg-proyecto2.jpg', codeUrl: '', demoUrl: '', order: 0 };
    },
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
````

## File: src/modules/projects/pages/DemosRedirectPage.tsx
````typescript
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { projectIds } from "../config/project";

/**
 * Redirige /demos/:projectId a /page/:id.
 * Los proyectos ya no tienen contenido embebido; el contenido viene de Supabase (project_content).
 */
const Demo: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  if (projectId && projectIds.includes(projectId)) {
    return <Navigate to={`/page/${projectId}`} replace />;
  }
  return <Navigate to="/proyectos" replace />;
};

export default Demo;
````

## File: src/modules/projects/pages/ProjectDetailsPage.tsx
````typescript
import React from "react";
import { useParams } from "react-router-dom";
import { showInfo, hideInfo } from "../../../shared/utils/infoHandler";
import { useCards } from "../hooks/useCards";
import { useProjectContent, type ProjectContentBlock } from "../hooks/useProjectContent";
import { getStoragePublicUrl } from "../../../shared/services/supabase/supabaseStorage";
import DOMPurify from "dompurify";

import { ALLOWED_HTML_TAGS, parseMarkdownToHtml } from "../utils/markdown";

const DynamicContent: React.FC<{ blocks: ProjectContentBlock[] }> = ({ blocks }) => (
    <div className="bg-gray-50 p-4 sm:p-6 md:p-12 space-y-6">
        {blocks.map((block) => {
            if (block.type === 'text' && block.content) {
                const sanitized = DOMPurify.sanitize(block.content, { ALLOWED_TAGS: ALLOWED_HTML_TAGS });
                return (
                    <div
                        key={block.id}
                        className="prose max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: sanitized }}
                    />
                );
            }
            if (block.type === 'image') {
                const src = getStoragePublicUrl(block.content) || block.content;
                return (
                    <figure key={block.id} className="space-y-2">
                        <img
                            src={src}
                            alt={block.caption || ''}
                            className="w-full max-h-[600px] object-contain rounded-xl"
                            loading="lazy"
                        />
                        {block.caption && (
                            <figcaption className="text-sm text-gray-500 text-center">{block.caption}</figcaption>
                        )}
                    </figure>
                );
            }
            if (block.type === 'video') {
                const src = getStoragePublicUrl(block.content) || block.content;
                const isGif = block.content.endsWith('.gif');
                return (
                    <figure key={block.id} className="space-y-2">
                        {isGif ? (
                            <img
                                src={src}
                                alt={block.caption || ''}
                                className="w-full max-h-[600px] object-contain rounded-xl"
                                loading="lazy"
                            />
                        ) : (
                            <video
                                src={src}
                                className="w-full max-h-[600px] rounded-xl"
                                controls
                                muted
                                loop
                                playsInline
                            />
                        )}
                        {block.caption && (
                            <figcaption className="text-sm text-gray-500 text-center">{block.caption}</figcaption>
                        )}
                    </figure>
                );
            }
            return null;
        })}
    </div>
);

const CardDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { cards } = useCards();
    const { blocks, isLoading: contentLoading } = useProjectContent(id);
    const card = cards.find((c) => c.id === id);

    if (!id || !card) {
        return (
            <div className="error-message text-red-500 text-center p-8">
                Caso de Estudio no encontrado
            </div>
        );
    }

    const bgImage = card.bgImage || '/images/bg-proyecto2.jpg';
    const codeUrl = card.codeUrl ?? '';
    const demoUrl = card.demoUrl ?? '';
    const hasDynamicContent = blocks.length > 0;

    return (
        <>
            <header
                className="header h-[80vh] bg-opacity-85 flex justify-center items-center relative text-white bg-cover bg-center brightness-75"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="button flex gap-4">
                    <button
                        className="info-btn border-2 px-6 py-2 font-bold relative hover:bg-white hover:text-black transition-colors"
                        onMouseOver={(e) => showInfo(e.currentTarget, "Este botón te lleva al código del proyecto.")}
                        onMouseOut={hideInfo}
                        onClick={() => codeUrl && window.open(codeUrl, "_blank")}
                    >
                        Código
                    </button>
                    <button
                        className="info-btn border-2 border-white px-6 py-2 font-bold relative hover:bg-white hover:text-black transition-colors"
                        onMouseOver={(e) => showInfo(e.currentTarget, "Este botón te lleva a la vista del proyecto.")}
                        onMouseOut={hideInfo}
                        onClick={() => demoUrl && (demoUrl.startsWith('http') ? window.open(demoUrl, "_blank") : window.location.href = demoUrl)}
                    >
                        Ver Proyecto
                    </button>
                </div>
            </header>

            <div className="bg-slate-300 md:mx-6 pb-12">
                <div className="max-w-6xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 pt-8">
                    {/* Caso de Estudio Fixed Narratives */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
                        <section className="space-y-3">
                            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 border-slate-200">
                                Contexto
                            </h2>
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                                {card.description}
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 border-slate-200">
                                El Reto
                            </h2>
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                                {card.problem_solved || "No especificado."}
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 border-slate-200">
                                Documentación de Arquitectura
                            </h2>
                            <div 
                                className="prose max-w-none text-slate-600 leading-relaxed font-sans"
                                dangerouslySetInnerHTML={{ 
                                    __html: DOMPurify.sanitize(
                                        parseMarkdownToHtml(card.architectural_doc || "No especificada."), 
                                        { ALLOWED_TAGS: ALLOWED_HTML_TAGS }
                                    ) 
                                }}
                            />
                        </section>
                    </div>

                    {/* Dynamic implementation content blocks */}
                    {hasDynamicContent && (
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-6 sm:p-10">
                            <h2 className="text-2xl font-bold text-slate-800 border-b pb-4 border-slate-200 mb-6">
                                Detalles de la Implementación
                            </h2>
                            <DynamicContent blocks={blocks} />
                        </div>
                    )}

                    {contentLoading && (
                        <div className="flex items-center justify-center py-16">
                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CardDetails;
````

## File: src/modules/projects/pages/ProjectsPage.tsx
````typescript
import React from "react";
import Grid from "../components/ProjectGrid";
import Footer from "../../../core/components/footer/Footer";

export const Proyects: React.FC = () => {
    return (
        <>
            <div className="p-8 pt-32">
                <Grid />
                <Footer />
            </div>
        </>
    );
};
````

## File: src/modules/projects/utils/markdown.ts
````typescript
/**
 * @file markdown.ts
 * @description Utilidades de procesamiento de Markdown a HTML para Casos de Estudio.
 */

export const ALLOWED_HTML_TAGS = ['pre', 'code', 'h2', 'h3', 'p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'span'];

export function parseMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';

  // Basic markdown parser
  let html = markdown
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    // Headers (h3, h2, h1)
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Bullet points
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    // Line breaks
    .replace(/\n/g, '<br />');

  // Wrap bullet points in ul
  html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');

  return html;
}
````

## File: src/pages/Home.tsx
````typescript
import Glitch from "../modules/profile/components/GlitchPresentation";
import CircleProfile from "../shared/components/CircleProfile";
import Footer from "../core/components/footer/Footer";
import WordCloud from "../modules/profile/components/WordCloud";
import { useHeroContent } from "../modules/profile/hooks/useHeroContent";
import { motion } from "framer-motion";
import { SkillSection, ExpAndTecnologies } from "../modules/projects/components/InformationContent";
import ContactForm from "../modules/contact/components/ContactForm";

const Home = () => {
    const { hero } = useHeroContent();
    return (
        <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-14 lg:space-y-16 mt-16 sm:mt-20">
            <section className="text-center space-y-4 sm:space-y-10 md:space-y-8 w-full max-w-md sm:max-w-lg md:max-w-2xl">
                <CircleProfile
                    src={hero.profile_image_url}
                    alt={hero.title}
                    size="xl"
                    ring={false}
                    fallbackSrc="/profile.jpeg"
                />
                <Glitch title={hero.title} subtitle={hero.subtitle} />
            </section>
            <WordCloud />

            <motion.section
                className="mx-auto w-full max-w-4xl"
                initial="hidden"
                animate="visible"
            >
                <motion.div className="p-6 sm:p-8 lg:p-10 text-slate-50 flex flex-col gap-8 sm:gap-12 backdrop-blur-lg bg-white/5 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-white/10 transition-all duration-300">
                    <SkillSection />
                    <ExpAndTecnologies />
                </motion.div>
            </motion.section>
            <Footer />
        </div>
    );
};

export default Home;
````

## File: src/shared/components/CircleProfile.tsx
````typescript
import React, { useEffect, useMemo, useState } from "react";

export type CircleProfileSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface CircleProfileProps {
    /** URL de la imagen a mostrar dentro del círculo */
    src: string;
    /** Texto alternativo para accesibilidad; también se usa para fallback iniciales */
    alt: string;
    /** Tamaño base del avatar (responsive por defecto) */
    size?: CircleProfileSize;
    /** Añade clases extra para personalizar (se agregan al contenedor raíz) */
    className?: string;
    /** Muestra un aro (ring) alrededor del avatar */
    ring?: boolean;
    /** Si la imagen principal falla, se intenta esta URL antes de mostrar iniciales */
    fallbackSrc?: string;
}

/**
 * CircleProfile
 * Componente de avatar circular, pequeño y responsivo, similar a un perfil de Facebook.
 * - Imagen recortada en círculo con object-cover
 * - Tamaños predefinidos y breakpoints por defecto
 * - Fallback con iniciales si la imagen falla
 */
const CircleProfile: React.FC<CircleProfileProps> = ({
    src,
    alt,
    size = "lg",
    className,
    ring = true,
    fallbackSrc
}) => {
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);
    const [triedFallback, setTriedFallback] = useState(false);

    // Al cambiar src desde fuera, resetear estado para intentar de nuevo
    useEffect(() => {
        setCurrentSrc(src);
        setHasError(false);
        setTriedFallback(false);
    }, [src]);

    const handleError = () => {
        if (fallbackSrc && !triedFallback) {
            setCurrentSrc(fallbackSrc);
            setTriedFallback(true);
        } else {
            setHasError(true);
        }
    };

    const sizeClasses = useMemo(() => {
        // Tamaños base; añadimos escalado responsivo por defecto
        const base: Record<CircleProfileSize, string> = {
            xs: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24",
            sm: "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28",
            md: "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32",
            lg: "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36",
            xl: "w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48"
        };
        return base[size];
    }, [size]);

    const initials = useMemo(() => {
        const words = alt.trim().split(/\s+/);
        const chars = words.slice(0, 2).map(w => w.charAt(0).toUpperCase());
        return chars.join("") || "?";
    }, [alt]);

    return (
        <div
            className={`relative inline-flex items-center justify-center rounded-full overflow-hidden bg-white/5 ${sizeClasses} ${ring ? "ring-2 ring-white/20" : ""} ${className || ""}`}
            role="img"
            aria-label={alt}
        >
            {!hasError ? (
                <img
                    src={currentSrc}
                    alt={alt}
                    className="w-full h-full object-cover select-none"
                    loading="lazy"
                    decoding="async"
                    onError={handleError}
                    draggable={false}
                />
            ) : (
                <span className="text-xs sm:text-sm md:text-base font-semibold text-white/90">
                    {initials}
                </span>
            )}
        </div>
    );
};

export default CircleProfile;
````

## File: src/shared/components/Input.tsx
````typescript
// Importación de React
import React from 'react';

interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Componente Input
// Este componente es reutilizable y se utiliza para crear campos de entrada con etiquetas asociadas.
const Input: React.FC<InputProps> = ({ label, name, type, placeholder, onChange }) => (
    <div className="relative">
        {/* Etiqueta para el campo de entrada */}
        <label htmlFor={name} className="text-[#f0f8ff] block mb-2">
            {label} {/* Texto de la etiqueta */}
        </label>

        {/* Campo de entrada */}
        <input
            type={type} // Tipo de entrada (texto, email, etc.)
            id={name} // ID único para asociar con la etiqueta
            name={name} // Nombre del campo (clave para manejar datos del formulario)
            onChange={onChange} // Función que se ejecuta al cambiar el valor del campo
            className="w-full px-3 py-2 text-[#f0f8ff] bg-[#3a3a3a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0f8ff] transition-all duration-300 ease-in-out"
            placeholder={placeholder} // Texto de marcador de posición
        />
    </div>
);

// Exportación del componente
// Esto permite que el componente sea utilizado en otros archivos.
export default Input;
````

## File: src/shared/components/MagneticBtn.tsx
````typescript
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';
import { trackButtonClick } from '../../utils/analytics';

/**
 * Propiedades para el componente MagneticBtn.
 * @interface MagneticBtnProps
 * @property {"link"} iconName - Nombre del icono de IonIcon a mostrar
 * @property {string} subtitle - Texto complementario debajo del icono
 */
interface MagneticBtnProps {
    iconName: "link";
    subtitle: string;
}

/**
 * Componente de botón interactivo con efecto magnético que redirige a la ruta '/informacion'
 * @component
 * @param {MagneticBtnProps} props - Propiedades del componente
 * @returns {JSX.Element} Elemento JSX del botón magnético
 */
const MagneticBtn: React.FC<MagneticBtnProps> = ({ iconName, subtitle }) => {
    const magneticBtnRef = useRef<HTMLButtonElement | null>(null);
    const magneticBtnTextRef = useRef<HTMLSpanElement | null>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const touchStartTime = useRef(0);
    const touchStartPos = useRef({ x: 0, y: 0 });
    const navigate = useNavigate();

    /**
     * Restablece la posición del botón y su texto usando animación elástica
     * @function resetPosition
     */
    const resetPosition = () => {
        gsap.to([magneticBtnRef.current, magneticBtnTextRef.current], {
            x: 0,
            y: 0,
            duration: 1.4,
            ease: "elastic.out(1.2, 0.4)"
        });
    };

    /**
     * Maneja el efecto magnético durante el movimiento del cursor/touch
     * @function handleMove
     * @param {number} clientX - Posición X del cursor
     * @param {number} clientY - Posición Y del cursor
     */
    const handleMove = (clientX: number, clientY: number) => {
        if (!magneticBtnRef.current) return;
        const bounds = magneticBtnRef.current.getBoundingClientRect();
        const strength = 40;
        const textStrength = 60;

        const relX = (clientX - bounds.left - bounds.width / 2) / bounds.width;
        const relY = (clientY - bounds.top - bounds.height / 2) / bounds.height;

        lastPosition.current.x = gsap.utils.interpolate(
            lastPosition.current.x,
            relX * strength,
            0.2
        );
        lastPosition.current.y = gsap.utils.interpolate(
            lastPosition.current.y,
            relY * strength,
            0.2
        );

        gsap.to(magneticBtnRef.current, {
            x: lastPosition.current.x,
            y: lastPosition.current.y,
            duration: 1.2,
            ease: "power4.out",
            overwrite: 'auto'
        });

        if (magneticBtnTextRef.current) {
            gsap.to(magneticBtnTextRef.current, {
                x: relX * textStrength,
                y: relY * textStrength,
                duration: 1.8,
                ease: "power4.out",
                overwrite: 'auto'
            });
        }
    };

    /**
     * Maneja la redirección a la página de información
     * @function handleRedirect
     */
    const handleRedirect = () => {
        trackButtonClick('Magnetic Button', 'Home Section');
        navigate('/informacion');
    };

    /**
     * Efecto para manejar eventos de interacción
     * @effect
     */
    useEffect(() => {
        const btn = magneticBtnRef.current;
        if (!btn) return;

        const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            handleMove(touch.clientX, touch.clientY);
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchStartTime.current = Date.now();
            touchStartPos.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        };

        const handleTouchEnd = () => {
            const timeDiff = Date.now() - touchStartTime.current;
            const dist = Math.hypot(
                lastPosition.current.x - touchStartPos.current.x,
                lastPosition.current.y - touchStartPos.current.y
            );

            if (timeDiff < 300 && dist < 10) {
                handleRedirect();
            }
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', resetPosition);
        btn.addEventListener('touchmove', handleTouchMove);
        btn.addEventListener('touchstart', handleTouchStart);
        btn.addEventListener('touchend', handleTouchEnd);

        return () => {
            btn.removeEventListener('mousemove', handleMouseMove);
            btn.removeEventListener('mouseleave', resetPosition);
            btn.removeEventListener('touchmove', handleTouchMove);
            btn.removeEventListener('touchstart', handleTouchStart);
            btn.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <button
            ref={magneticBtnRef}
            onClick={handleRedirect}
            className="group relative w-40 h-40 rounded-full bg-transparent backdrop-blur-lg border hover:bg-slate-100 transition-all duration-300 hover:scale-105 cursor-alias"
            aria-label="Ver información adicional"
            role="link"
        >
            <span
                ref={magneticBtnTextRef}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white hover:text-black group-hover:scale-110 transition-transform"
            >
                <IonIcon
                    name={iconName}
                    className="text-3xl motion-safe:animate-pulse"
                    aria-hidden="true"
                />
                <span className="text-sm font-medium">{subtitle}</span>
            </span>
        </button>
    );
};

export default MagneticBtn;

// ===========================================
// 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
// ===========================================
// 
// Este archivo es un COMPONENTE REACT AVANZADO que implementa un botón
// con efecto magnético usando GSAP y manejo de eventos complejos.
// Es un ejemplo perfecto de cómo crear interacciones sofisticadas
// que funcionan tanto en desktop como en móvil. Te explico paso a paso:
//
// 🎯 ¿QUÉ ES ESTE ARCHIVO?
// Es un componente que crea un botón circular que "atrae" al cursor/touch,
// creando un efecto magnético suave. Combina GSAP para animaciones,
// React Router para navegación, y analytics para tracking de eventos.
//
// 📋 DESGLOSE POR SECCIONES:
//
// 1. IMPORTS Y DEPENDENCIAS (líneas 1-5):
//    - React: useEffect, useRef para manejo de estado y referencias
//    - GSAP: Biblioteca de animaciones de alto rendimiento
//    - useNavigate: Hook de React Router para navegación
//    - IonIcon: Iconos de Ionicons
//    - trackButtonClick: Función de analytics personalizada
//    - ¿Por qué esta combinación? Cada herramienta tiene su propósito específico
//
// 2. INTERFACE Y TIPADO (líneas 7-16):
//    - MagneticBtnProps: Interface TypeScript para las props
//    - iconName: "link" - Tipo literal para el icono
//    - subtitle: string - Texto complementario
//    - JSDoc: Documentación completa de la interface
//    - ¿Por qué tipado fuerte? Previene errores y mejora la experiencia de desarrollo
//
// 3. REFS Y ESTADO (líneas 25-30):
//    - magneticBtnRef: Referencia al botón principal
//    - magneticBtnTextRef: Referencia al texto del botón
//    - lastPosition: Posición anterior para interpolación suave
//    - touchStartTime: Tiempo de inicio del touch para detección de tap
//    - touchStartPos: Posición inicial del touch
//    - navigate: Hook de React Router
//    - ¿Por qué múltiples refs? Permite animar elementos independientemente
//
// 4. FUNCIÓN RESET (líneas 36-43):
//    - resetPosition: Restablece la posición del botón y texto
//    - gsap.to(): Anima hacia x: 0, y: 0
//    - duration: 1.4s para animación suave
//    - ease: "elastic.out(1.2, 0.4)" para efecto elástico
//    - ¿Por qué elástico? Crea un efecto natural de "rebote"
//
// 5. FUNCIÓN MAGNÉTICA (líneas 51-88):
//    - handleMove: Función principal del efecto magnético
//    - getBoundingClientRect(): Obtiene posición y tamaño del botón
//    - strength: 40 para el botón, 60 para el texto
//    - Cálculo de posición relativa: relX, relY
//    - gsap.utils.interpolate(): Suaviza el movimiento
//    - Animaciones separadas: Botón y texto se mueven independientemente
//    - ¿Por qué interpolación? Evita movimientos bruscos y erráticos
//
// 6. MANEJO DE REDIRECCIÓN (líneas 94-97):
//    - handleRedirect: Función de navegación
//    - trackButtonClick: Registra el evento en analytics
//    - navigate('/informacion'): Redirige a la página de información
//    - ¿Por qué analytics? Permite medir la efectividad del botón
//
// 7. EVENT HANDLING (líneas 103-146):
//    - useEffect: Configura todos los event listeners
//    - handleMouseMove: Maneja el movimiento del mouse
//    - handleTouchMove: Maneja el movimiento del touch
//    - handleTouchStart: Registra el inicio del touch
//    - handleTouchEnd: Detecta taps vs swipes
//    - Cleanup: Remueve todos los event listeners
//    - ¿Por qué cleanup? Previene memory leaks
//
// 🎨 CONCEPTOS DE INTERACCIÓN:
//
// 1. MAGNETIC EFFECT:
//    - Cálculo de distancia: relX, relY basados en posición del cursor
//    - Fuerza magnética: strength controla la intensidad del efecto
//    - Interpolación: Suaviza el movimiento para evitar saltos
//    - ¿Por qué magnético? Crea una sensación de "atracción" natural
//
// 2. TOUCH DETECTION:
//    - TouchStart: Registra tiempo y posición inicial
//    - TouchEnd: Detecta si fue un tap (tiempo < 300ms, distancia < 10px)
//    - Math.hypot(): Calcula la distancia euclidiana
//    - ¿Por qué detección? Distingue entre taps y swipes
//
// 3. ANIMATION LAYERING:
//    - Botón: Se mueve con fuerza 40
//    - Texto: Se mueve con fuerza 60 (más exagerado)
//    - Duración diferente: 1.2s vs 1.8s
//    - ¿Por qué capas? Crea profundidad visual
//
// ⚡ OPTIMIZACIONES DE RENDIMIENTO:
//
// 1. GSAP BENEFITS:
//    - Hardware acceleration: Usa GPU automáticamente
//    - Batch updates: Agrupa cambios para mejor rendimiento
//    - overwrite: 'auto': Evita conflictos de animaciones
//    - ¿Por qué GSAP? Mejor rendimiento que CSS para animaciones complejas
//
// 2. EVENT OPTIMIZATION:
//    - Event delegation: Un solo listener por evento
//    - Cleanup automático: Previene memory leaks
//    - Touch vs mouse: Manejo diferenciado para cada dispositivo
//    - ¿Por qué optimización? Mejor experiencia de usuario
//
// 3. INTERPOLATION:
//    - gsap.utils.interpolate(): Suaviza el movimiento
//    - Factor 0.2: Controla la suavidad
//    - lastPosition: Mantiene la posición anterior
//    - ¿Por qué interpolación? Evita movimientos bruscos
//
// 🎯 PATRONES APLICADOS:
//
// 1. INTERACTIVE DESIGN:
//    - Magnetic effect: Crea sensación de atracción
//    - Touch detection: Distingue entre taps y swipes
//    - Visual feedback: Animaciones que responden al input
//    - ¿Por qué interactivo? Mejora la experiencia de usuario
//
// 2. RESPONSIVE INTERACTION:
//    - Mouse: Movimiento continuo
//    - Touch: Detección de taps
//    - Cursor: cursor-alias para indicar interactividad
//    - ¿Por qué responsive? Funciona en todos los dispositivos
//
// 3. ACCESSIBILITY:
//    - aria-label: Descripción para lectores de pantalla
//    - role="link": Indica que es un enlace
//    - aria-hidden: Oculta iconos decorativos
//    - ¿Por qué accesibilidad? Inclusión para todos los usuarios
//
// 🚀 FLUJO DE INTERACCIÓN:
// 1. Usuario mueve el cursor sobre el botón
// 2. handleMove calcula la posición relativa
// 3. GSAP anima el botón hacia la posición del cursor
// 4. El texto se mueve con mayor intensidad
// 5. Al salir del botón, resetPosition restablece la posición
// 6. Al hacer click/tap, handleRedirect navega a la página
//
// 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
// - Efectos magnéticos con GSAP
// - Detección de touch vs mouse
// - Interpolación para movimientos suaves
// - Event handling avanzado
// - Analytics integration
// - Accessibility patterns
// - Performance optimization
// - Cross-device compatibility
//
// ¡Es un ejemplo excelente de cómo crear interacciones sofisticadas y accesibles!
// ===========================================
````

## File: src/shared/components/SafeHtml.tsx
````typescript
import React from 'react';
import DOMPurify from 'dompurify';

const ALLOWED_TAGS = ['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'span'];

interface SafeHtmlProps {
  html: string;
  className?: string;
}

export const SafeHtml: React.FC<SafeHtmlProps> = ({ html, className }) => {
  const sanitized = DOMPurify.sanitize(html, { ALLOWED_TAGS });
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
};
````

## File: src/shared/config/webPlans.ts
````typescript
// types/webPlans.ts
/**
 * Interfaz que define la estructura de un plan de página web
 * @interface WebPlan
 * @property {string} header - Título del plan
 * @property {string} subtitle - Breve descripción del plan
 * @property {string[]} features - Lista de características/beneficios
 * @property {number} price - Precio del plan en dólares
 */
export interface WebPlan {
    header: string;
    subtitle: string;
    features: string[];
    price: number;
    paymentPlan: string;
}

//planes web competitivos en Venezuela
export const PLANS: WebPlan[] = [
    {
        header: "🚀 Básico Emprendedor",
        subtitle: "Presencia online esencial para startups y profesionales",
        features: [
            "1 página principal + 4 secciones",
            "Hosting + dominio ( 1 año GRATIS )",
            "Diseño 100% mobile-first",
            "SEO básico integrado",
            "Formulario de contacto",
            "Soporte técnico 3 meses"
        ],
        price: 150,
        paymentPlan: "40% / 40% / 20% Pagos distribuidos"
    },
    {
        header: "💼 Avanzado PYME",
        subtitle: "Solución completa para pequeñas y medianas empresas",
        features: [
            "Hasta 8 páginas personalizadas",
            "Tienda online básica",
            "Integración redes sociales",
            "SSL Certificado incluido",
            "Backups semanales",
            "Soporte prioritario 6 meses"
        ],
        price: 280,
        paymentPlan: "40% / 40% / 20% Pagos distribuidos"
    },
    {
        header: "🏆 Premium Corporativo",
        subtitle: "Potente solución para empresas establecidas",
        features: [
            "Web app personalizada",
            "Carrito de compras avanzado",
            "Panel administrativo",
            "Analítica de datos integrada",
            "Marketing automation básico",
            "Soporte 24/7 + mantenimiento anual"
        ],
        price: 550,
        paymentPlan: "40% / 40% / 20% Pagos distribuidos"
    },
    {
        header: "✨ Solución a Medida",
        subtitle: "Desarrollo personalizado para necesidades específicas",
        features: [
            "Arquitectura escalable",
            "Integración con APIs externas",
            "Diseño UX premium",
            "SEO técnico avanzado",
            "Sistema de reservas/pagos",
            "Garantía de rendimiento"
        ],
        price: 850,
        paymentPlan: "40% / 40% / 20% Pagos distribuidos"
    }
];
````

## File: src/shared/services/supabase/supabase.ts
````typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
````

## File: src/shared/services/supabase/supabaseStorage.ts
````typescript
import { supabase, isSupabaseConfigured } from './supabase';
import { STORAGE_BUCKET } from '../../../types/supabase';

export function getStoragePublicUrl(path: string): string {
  if (!isSupabaseConfigured || !path) return '';
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export function getStoragePublicUrlOrLocal(path: string, localFallback: string): string {
  if (isSupabaseConfigured && path) {
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }
  return localFallback.startsWith('http') ? localFallback : (localFallback.startsWith('/') ? localFallback : `/${localFallback}`);
}
````

## File: src/shared/utils/cardAnimations.ts
````typescript
// utils/cardAnimations.ts
import gsap from "gsap";

/**
 * Maneja el efecto de movimiento 3D en la tarjeta basado en la posición del mouse
 * @function handleMouseMove
 * @param {MouseEvent} e - Evento del mouse
 * @param {HTMLDivElement} card - Elemento DOM de la tarjeta
 * @param {HTMLDivElement} content - Elemento DOM del contenido interno
 * @param {number} [sensitivity=1] - Intensidad del efecto (0.5 = suave, 2 = intenso)
 * @description Calcula la posición relativa del mouse y aplica transformaciones 3D
 * 
 * @example
 * // Uso básico con sensibilidad predeterminada
 * handleMouseMove(event, cardElement, contentElement);
 * 
 * // Uso con sensibilidad personalizada
 * handleMouseMove(event, cardElement, contentElement, 1.5);
 */
export const handleMouseMove = (
    e: MouseEvent,
    card: HTMLDivElement,
    content: HTMLDivElement,
    sensitivity: number = 1
) => {
    // Configuración base del efecto
    const baseStrength = 25;
    const normalizedSensitivity = Math.min(Math.max(sensitivity, 0.1), 3); // Limitar rango 0.1-3

    // Cálculo de fuerza del movimiento
    const movementStrength = baseStrength * normalizedSensitivity;
    const heightRatio = movementStrength / card.offsetHeight;
    const widthRatio = movementStrength / card.offsetWidth;

    // Posición relativa del mouse
    const mouseX = e.pageX - card.offsetLeft - card.offsetWidth / 2;
    const mouseY = e.pageY - card.offsetTop - card.offsetHeight / 2;

    // Cálculo de valores transform
    const rotateX = (heightRatio * mouseY * -5) / (50 / normalizedSensitivity);
    const rotateY = (widthRatio * mouseX * 5) / (50 / normalizedSensitivity);
    const translateX = (widthRatio * mouseX * 5) / (10 / normalizedSensitivity);
    const translateY = (heightRatio * mouseY * -5) / (10 / normalizedSensitivity);

    // Animación suave usando GSAP
    gsap.to(card, {
        duration: 0.5,
        rotationY: rotateY,
        rotationX: rotateX,
        ease: "power2.out",
        overwrite: "auto"
    });

    gsap.to(content, {
        duration: 0.5,
        x: translateX,
        y: translateY,
        ease: "power2.out",
        overwrite: "auto"
    });
};

/**
 * Restablece la posición y rotación de la tarjeta a su estado inicial
 * @function resetCardPosition
 * @param {HTMLDivElement} card - Elemento DOM de la tarjeta
 * @param {HTMLDivElement} content - Elemento DOM del contenido interno
 * @description Aplica animación de reseteo usando GSAP con curva elástica
 */
export const resetCardPosition = (
    card: HTMLDivElement,
    content: HTMLDivElement
) => {
    // Animación de reset para la tarjeta
    gsap.to(card, {
        duration: 1.2,
        rotationY: 0,
        rotationX: 0,
        ease: "elastic.out(1.2, 0.4)",
        overwrite: "auto"
    });

    // Animación de reset para el contenido
    gsap.to(content, {
        duration: 1.4,
        x: 0,
        y: 0,
        ease: "elastic.out(1.2, 0.4)",
        overwrite: "auto"
    });
};
````

## File: src/shared/utils/infoHandler.ts
````typescript
// Función para mostrar la tarjeta de información contextual
export const showInfo = (button: HTMLElement, info: string) => {
    const infoCard = document.getElementById("infoCard") as HTMLElement;
    const infoText = document.getElementById("infoText") as HTMLElement;
    infoText.textContent = info;

    const rect = button.getBoundingClientRect();
    infoCard.style.display = "block";
    infoCard.style.top = `${rect.top - infoCard.offsetHeight - 20}px`;
    infoCard.style.left = `${rect.left + rect.width / 2 - infoCard.offsetWidth / 2}px`;
};

// Función para ocultar la tarjeta de información contextual
export const hideInfo = () => {
    const infoCard = document.getElementById("infoCard") as HTMLElement;
    infoCard.style.display = "none";
};
````

## File: src/shared/utils/validation.ts
````typescript
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
````

## File: src/shared/utils/variants.ts
````typescript
// ===========================================
// 🎬 Variantes de animación unificadas (Framer Motion)
// ===========================================
// Este módulo centraliza y documenta las variantes de animación utilizadas
// en la UI para mantener un solo punto de verdad, mejorar la mantenibilidad
// y evitar duplicación de código entre componentes.

// Sistema de timing escalable
export const atimationThemes = {
    sub: {
        stagger: 0.08, // El stagger distribuye los cálculos de animación en el tiempo
        delay: 0.1, // El delay define el tiempo de espera antes de que se inicie la animación
        ease: "easeOut" // La easing define la curva de la animación
    },
    Dramatic: {
        stagger: 0.15, // El stagger distribuye los cálculos de animación en el tiempo
        delay: 0.3, // El delay define el tiempo de espera antes de que se inicie la animación
        ease: "easeOut" // La easing define la curva de la animación
    },
    Smooth: {
        stagger: 0.03, // El stagger distribuye los cálculos de animación en el tiempo
        delay: 0.5, // El delay define el tiempo de espera antes de que se inicie la animación
        ease: "easeInOut" // La easing define la curva de la animación
    }
} as const;

/*
Efecto de aparición escalonada (stagger) con transiciones suaves.
Controla cómo los elementos hijos dentro de un contenedor se revelan
progresivamente con un delay entre cada uno.
*/
export const CONTAINERCARDS = {
    hidden: { opacity: 0 }, // estado inicial de opacidad 0 (invisible)
    visible: {
        opacity: 1, // estado final de opacidad 1 (visible)
        transition: {
            // Nota: usamos el tema de timing para controlar el stagger a nivel global
            staggerChildren: atimationThemes.sub.stagger, // delay entre cada elemento hijo
            delayChildren: atimationThemes.sub.delay, // delay inicial para el contenedor
            when: "beforeChildren" // asegura que los elementos hijos se rendericen antes del contenedor
        }
    }
} as const;

// Animación para las tarjetas individuales
export const CARDS = {
    hidden: {
        opacity: 0, // estado inicial de opacidad 0 (invisible)
        y: 30, // estado inicial de desplazamiento 30px hacia abajo
        scale: 0.95 // estado inicial de escala 0.95
    },
    visible: {
        opacity: 1, // estado final de opacidad 1 (visible)
        y: 0, // estado final de desplazamiento 0px
        scale: 1, // estado final de escala 1
        transition: {
            type: "spring",
            stiffness: 100, // rigidez de la animación
            damping: 15, // amortiguación de la animación
            duration: 0.6 // duración de la animación
        }
    }
} as const;

// Animación para las tarjetas individuales en línea
export const INLINECARDS = {
    hidden: {
        opacity: 0, // estado inicial de opacidad 0 (invisible)
        x: -20, // estado inicial de desplazamiento 20px hacia la izquierda
        scale: 0.98 // estado inicial de escala 0.98
    },
    visible: {
        opacity: 1, // estado final de opacidad 1 (visible)
        x: 0, // estado final de desplazamiento 0px
        scale: 1, // estado final de escala 1
        transition: {
            type: "spring",
            stiffness: 120, // rigidez de la animación
            damping: 14 // amortiguación de la animación
        }
    }
} as const;

// ===========================================
// 📦 Cómo usar
// import { CONTAINERCARDS, CARDS, INLINECARDS } from "../animations/variants";
// ===========================================
````

## File: src/main.tsx
````typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
````

## File: docs/componentes/about.md
````markdown
# About (informationContent)

## Ubicación

`src/components/about/informationContent.tsx`

## Propósito

Contenido de la sección “Información” del portfolio: habilidades (skills), lenguajes, frameworks y tecnologías/experiencia, organizados con un patrón tipo composite (grupos con título, color y items).

## Uso

Se usa en la página Information:

```tsx
<SkillSection />
<ExpAndTecnologies />
```

Ambos se exportan desde `informationContent.tsx` e importan variantes de `animations/variants.ts` (CONTAINERCARDS, CARDS, INLINECARDS).

## Datos internos

- **SKILLS**: Array de objetos con `title`, `color` ("blue" | "purple" | "green"), `items` (strings o objetos con name/experience). Incluye “Información”, “Lenguajes”, “Frameworks”, “MERN React”, “MERN Django”.
- **PROJECTS**: Array de objetos con `title`, `color` ("blue" | "purple"), `details` (array de strings). Incluye librerías React, ruteo, UI, formularios, testing, utilidades, etc.

## SkillSection

- Renderiza secciones basadas en SKILLS.
- Usa Framer Motion (motion.div con CONTAINERCARDS y CARDS o INLINECARDS para los ítems).
- Estilos según `color` (gradientes blue/purple/green).

## ExpAndTecnologies

- Similar estructura para PROJECTS: contenedor animado y tarjetas con `details`.
- Colores blue/purple.

## Tipos

- `ArrHabilities`: `{ name, experience? } | string`
- `Habilities`: `title`, `color`, `items`
- `Knowledges`: `title`, `color`, `details`
- Datos tipados con `as const satisfies readonly Habilities[]`.

## Props

Ninguno. Todo se deriva de las constantes SKILLS y PROJECTS dentro del archivo.

## Dependencias

- React, useEffect, useRef, useState (si se usa)
- framer-motion (delay, stagger, motion, AnimatePresence)
- ../animations/variants (CONTAINERCARDS, CARDS, INLINECARDS)

## Mejoras sugeridas

- Extraer SKILLS y PROJECTS a `config/skills.ts` y `config/technologies.ts` (o un solo config) para separar datos de presentación.
- Dividir en dos archivos: `SkillSection.tsx` y `ExpAndTecnologies.tsx`, importados desde `informationContent.tsx` o directamente en la página Information.
- Reducir tamaño del archivo para facilitar mantenimiento y pruebas.
````

## File: docs/componentes/animations.md
````markdown
# Animations

## Ubicación

- `src/components/animations/glitchPresentation.tsx` (Glitch)
- `src/components/animations/WordCloud.tsx`
- `src/components/animations/backgrounds/StarsBackground.tsx`
- `src/components/animations/glitch.css`
- `src/components/animations/variants.ts`

## Propósito

- **Glitch**: Efecto visual de texto glitch (título y subtítulo) en el hero, animado con GSAP.
- **WordCloud**: Nube de iconos (tecnologías) que reaccionan al movimiento del mouse (alejarse y escalar) con GSAP.
- **StarsBackground**: Fondo de estrellas 3D con Three.js, fijo detrás del contenido.
- **variants**: Variantes de Framer Motion reutilizables (CONTAINERCARDS, CARDS, INLINECARDS, temas de timing).

## Uso

- Glitch y WordCloud: en `pages/home.jsx` (Hero + nube de palabras).
- StarsBackground: en `App.tsx` a nivel global (junto a NavMenu y ResponsiveMenu).
- variants: importados en `about/informationContent.tsx` y potencialmente en otros componentes que usen stagger/cards.

## Glitch

- **Props**: `title`, `subtitle` (strings, por defecto "Hi, I'm Wilmer", "Web Developer").
- **Implementación**: Ref al contenedor, GSAP con `repeat: -1`, `yoyo: true`, pequeño desplazamiento x/y. Estilos del efecto en `glitch.css` (data-text, pseudo-elementos).
- **Responsive**: `clamp` en fontSize y maxWidth.

## WordCloud

- Lista fija de iconos (IonIcon): JavaScript, GitHub, SQL, Laravel, SASS, Python, CSS3, HTML5.
- **Refs**: `wordsRef` (array de refs a cada icono).
- **Eventos**: `handleMouseMove` (mueve cada icono en dirección opuesta al cursor), `handleMouseEnter`/`handleMouseLeave` (escala 2.5 / 1.5). Al salir de la ventana se resetean posiciones con GSAP.
- Sin props.

## StarsBackground

- **Three.js**: Scene, PerspectiveCamera, WebGLRenderer (alpha, antialias), Points con BufferGeometry (p. ej. 500 estrellas), material con tamaño y opacidad.
- **Refs**: containerRef, scene, camera, renderer, stars. En useEffect: montaje del canvas, resize listener, loop de render, cleanup (removeEventListener, dispose).
- Sin props.

## variants.ts

- **atimationThemes**: Objetos `sub`, `Dramatic`, `Smooth` con `stagger`, `delay`, `ease`.
- **CONTAINERCARDS**: opacity 0→1, staggerChildren y delayChildren.
- **CARDS**: hidden (opacity, y, scale) → visible con spring.
- **INLINECARDS**: hidden (opacity, x, scale) → visible con spring.
- Nota: typo en export `atimationThemes` (animation).

## Dependencias

- Glitch: React, useRef, useEffect, gsap, glitch.css
- WordCloud: React, useRef, useEffect, gsap, @reacticons/ionicons
- StarsBackground: React, useRef, useEffect, three
- variants: solo exportaciones (sin deps externas)

## Mejoras sugeridas

- Corregir nombre `atimationThemes` → `animationThemes`.
- En StarsBackground, valorar reducir partículas o calidad en viewports pequeños para rendimiento en móviles.
- Documentar en variants.ts el uso esperado (ej. con `variants` y `initial`/`animate` de Framer Motion).
````

## File: docs/componentes/cards.md
````markdown
# Cards (Grid, Card, CardDetails)

## Ubicación

- `src/components/cards/components_Grid.tsx` (Grid)
- `src/components/cards/components_Card.tsx` (Card)
- `src/components/cards/proyectPage.tsx` (CardDetails)

## Propósito

- **Grid**: Contenedor que renderiza una grilla responsiva de tarjetas de proyectos a partir de `config/cards`.
- **Card**: Tarjeta interactiva con efecto parallax al mover el mouse y navegación a la demo del proyecto.
- **CardDetails**: Página de detalle de un proyecto por ID (`/page/:id`): cabecera con imagen de fondo, botones “Código” y “Ver Proyecto”, y contenido dinámico del proyecto.

## Uso

- En la página Proyects se renderiza `<Grid />`. Cada tarjeta está envuelta en `<Link to={`/page/${card.id}`}>`.
- CardDetails se usa como `<Route path="/page/:id" element={<CardDetails />} />` en `App.tsx`.

## Grid

- Importa `cards` desde `config/cards` y `Card` desde `components_Card`.
- Layout: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6`.
- No recibe props.

## Card

- **Props**: `id`, `img`, `title`, `description`, `buttonText` (tipados en `types/types.ts` como `CardProps`).
- **Comportamiento**: Efecto 3D/parallax con `handleMouseMove` y `resetCardPosition` de `utils/cardAnimations.ts` (sensibilidad 1.15). Al hacer click navega a `/demos/${id}` (vía `navigate`) y hace scroll suave al inicio.
- **Refs**: `cardRef`, `contentRef` para el DOM usado en los listeners.

## CardDetails (proyectPage)

- **Hooks**: `useParams<{ id: string }>()`, `useNavigate()`.
- **Datos**: Busca el proyecto en `projects` (config/project) por `id`. Si no existe, muestra mensaje “Proyecto no encontrado”.
- **Cabecera**: Imagen de fondo `project.bgProyect`, botones “Código” (abre `project.codeUrl`) y “Ver Proyecto” (abre `project.demoUrl`). Tooltips con `showInfo`/`hideInfo` (utils/infoHandler) usando `getElementById("infoCard")` y posicionamiento inline.
- **Contenido**: Renderiza `project.content` (componente de demo) dentro de un contenedor con estilos de ancho máximo.

## Dependencias

- React, useRef, useEffect (Card); useParams, useNavigate (CardDetails)
- react-router-dom (Link, useNavigate, useParams)
- types/types (CardProps)
- config/cards, config/project
- components/utils/cardAnimations, components/utils/infoHandler

## Mejoras sugeridas

- Renombrar archivos a `Grid.tsx` y `Card.tsx` para consistencia.
- En CardDetails, sustituir tooltips por DOM por un componente Tooltip/Popover accesible (estado + posición o portal).
- Unificar nombre de prop `img` vs `imgSrc` en tipos y usos.
````

## File: docs/componentes/circle-profile.md
````markdown
# CircleProfile

## Ubicación

`src/components/CircleProfile.tsx`

## Propósito

Avatar circular responsivo con imagen o fallback de iniciales si la imagen falla al cargar. Pensado para el hero del portfolio (foto de perfil).

## Uso

En la página Home:

```tsx
<CircleProfile
  src="/profile.jpeg"
  alt="Wilmer Lynch"
  size="xl"
  ring={false}
/>
```

## Props

| Prop    | Tipo                | Por defecto | Descripción                                              |
|---------|---------------------|-------------|----------------------------------------------------------|
| src     | string              | —           | URL de la imagen                                         |
| alt     | string              | —           | Texto alternativo y base para iniciales si falla la img  |
| size    | "xs" \| "sm" \| "md" \| "lg" \| "xl" | "lg"  | Tamaño base del avatar (con breakpoints responsivos)     |
| className | string (opcional)  | —           | Clases adicionales en el contenedor                      |
| ring    | boolean             | true        | Muestra un anillo alrededor del avatar (ring-2 ring-white/20) |

## Comportamiento

- **Tamaños**: Mapa de clases Tailwind por breakpoint (sm, md) para cada `size` (ej. xl: `w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48`).
- **Fallback**: Si la imagen dispara `onError`, se muestra un span con las iniciales derivadas de `alt` (primeras letras de las dos primeras palabras, mayúsculas).
- **Accesibilidad**: Contenedor con `role="img"` y `aria-label={alt}`. Imagen con `loading="lazy"`, `decoding="async"`, `draggable={false}`.

## Dependencias

- React, useMemo, useState
- Sin dependencias externas de librerías

## Mejoras sugeridas

- Opcional: soporte para `sizes` y `srcSet` si se quieren imágenes responsivas.
- Mantener tipado exportado (`CircleProfileProps`, `CircleProfileSize`) para uso en otros módulos.
````

## File: docs/componentes/demos.md
````markdown
# Demos

## Ubicación

- `src/components/demos/` (múltiples componentes)
- `src/config/project.ts` (mapeo id → componente y metadatos)
- Ruta en App: `/demos/:projectId` con `ContentHandler` que resuelve el proyecto y renderiza `project.content`

## Propósito

Cada demo es un componente React que representa un proyecto real (e-commerce, barbería, auth, paleta de colores, etc.). Se usan en dos contextos:

1. **Página de detalle** (`/page/:id`): CardDetails muestra cabecera con imagen y botones “Código” / “Ver Proyecto”, y debajo el contenido del proyecto (`project.content`). El `id` en la URL aquí es el de la tarjeta (page), no necesariamente el mismo que `projectId` de demos.
2. **Ruta de demo embebida** (`/demos/:projectId`): ContentHandler busca el proyecto por `projectId` y renderiza solo `project.content` o NotFound.

La relación entre `config/cards` (galería en Proyects) y `config/project` (lista de proyectos con content) puede ser por id: en Grid se enlaza a `/page/${card.id}`; los proyectos en project.ts tienen `id` ("1", "2", …) y un componente `content`.

## Componentes en demos/

| Archivo        | Descripción breve (inferida por nombre)     |
|----------------|----------------------------------------------|
| authSystem.tsx | Sistema de autenticación / formulario        |
| barberia.tsx   | Barbería / agendado de citas                 |
| colorPalette.tsx | Generador de paleta de colores            |
| crudNode.tsx   | CRUD o documentación con Node                |
| ecomerce.tsx   | Página de e-commerce                         |
| futureCart.tsx | Carrito de compras                           |
| headphones.tsx | Página de producto (auriculares)             |

Cada uno se importa en `config/project.ts` y se asigna al campo `content` de un proyecto.

## config/project.ts

- **Project**: interface con `id`, `content` (React.ComponentType), `bgProyect`, `codeUrl`, `demoUrl`.
- **projects**: array de proyectos. Cada elemento tiene un `id` único y un componente de demo asignado.
- ContentHandler en App hace: `const project = projects.find(p => p.id === projectId)`; si existe y tiene `content`, renderiza `<project.content />`, si no `<NotFound />`.

## Uso

- Desde la galería: el usuario hace click en una Card y navega a `/page/:id` (CardDetails). CardDetails usa `projects` por `id` para mostrar cabecera y contenido; el contenido es el mismo componente que en demos.
- Acceso directo a demo: `/demos/1`, `/demos/2`, etc., para ver solo el contenido del proyecto sin la cabecera de CardDetails.

## Dependencias

Cada demo puede tener sus propias dependencias (estilos, iconos, estado local). Los proyectos se cargan todos en el bundle al importar `config/project.ts` (no hay lazy loading por defecto).

## Mejoras sugeridas

- Usar `React.lazy()` para cada `content` y `<Suspense>` en ContentHandler y CardDetails para reducir el bundle inicial.
- Documentar cada demo en su propio archivo (por ejemplo en `docs/componentes/demos/`) con props, estado y propósito del proyecto.
- Unificar criterio de ids entre `cards` y `projects` para que un solo id sirva para página de detalle y demo embebida sin confusión.
````

## File: docs/componentes/footer.md
````markdown
# Footer

## Ubicación

`src/components/footer/footer.tsx`

## Propósito

Pie de página reutilizable con datos de contacto (email, teléfono), enlaces a redes sociales y tracking de analytics al hacer click en contacto.

## Uso

Se incluye al final de varias páginas: Home, Information, Proyects, Contact.

```tsx
<Footer />
```

## Configuración

Constante local `CONTACT_INFO`:

- `email`, `phone`
- `socialMedia`: github, instagram, linkedin, whatsapp (cada uno con `url` y `label`).

Los clicks en enlaces de contacto llaman a `trackContactAttempt(platform)` desde `utils/analytics`.

## Estructura

- Bloque "Contacto" con email y teléfono (mailto, tel).
- Bloque de redes con iconos e enlaces (GitHub, Instagram, LinkedIn, WhatsApp).
- Estilos: `backdrop-blur-lg`, `bg-white/5`, gradientes en títulos, hover en enlaces.

## Props

Ninguno. El componente es presentacional y toma todo de `CONTACT_INFO`.

## Dependencias

- React
- `../../utils/analytics` (trackContactAttempt)

## Mejoras sugeridas

- Mover `CONTACT_INFO` a `config/contact.ts` o `config/social.ts` y reutilizar en el formulario de contacto para evitar duplicar URLs y labels.
- Asegurar que los iconos tengan `aria-hidden` donde corresponda y que los enlaces tengan `aria-label` si el texto visible no es suficiente.
````

## File: docs/componentes/form.md
````markdown
# Form (ContactForm)

## Ubicación

`src/components/form.tsx`

## Propósito

Formulario de contacto con validación en cliente, envío a Firebase Firestore, animaciones (Framer Motion) y enlaces a redes sociales. Incluye subcomponentes internos para campos animados.

## Uso

Se usa en la página Contact:

```tsx
<ContactForm />
```

## Estructura del archivo

- **Tipos**: `FormData`, `FormField`, `SocialLink`.
- **Constantes**: `SOCIAL_LINKS`, `SOCIAL_ITEMS` (whatsapp, instagram, github) con iconos IonIcon y estilos hover.
- **Variantes de animación**: `containerVariants`, `itemVariants`, `buttonVariants`, `messageVariants` (Framer Motion).
- **Subcomponentes internos**:
  - `AnimatedInput`: input con label, estado de foco y error, variante `itemVariants`.
  - `AnimatedTextarea`: textarea con label y error, misma línea de variantes.
- **Componente principal**: `ContactForm` con estado (`formData`, `fieldErrors`, `isSubmitting`, `responseMessage`, `error`), `handleChange`, `handleSubmit`, y render del form + mensajes + iconos sociales.

## Validación

- Campos requeridos: nombre, email, mensaje (trim).
- Email: `isValidEmail()` desde `./utils/validation`.
- Teléfono opcional: si se envía, debe tener 11 dígitos (`/^\d{11}$/`).
- Errores por campo en `fieldErrors` y mensaje global en `error`.

## Envío

- `handleSubmit`: previene default, valida, llama a `addDoc(collection(db, "contactFormSubmissions"), formData)` (Firebase). En éxito limpia el form y muestra `responseMessage`; en error muestra `error`. `trackContactAttempt` se usa al hacer click en redes, no en el submit del form.

## Props

Ninguno. Todo el estado y la configuración son internos.

## Dependencias

- React, useState
- @reacticons/ionicons
- framer-motion (motion, AnimatePresence)
- firebase/firestore (collection, addDoc), config/firebase (db)
- ./utils/validation (isValidEmail)
- utils/analytics (trackContactAttempt)

## Mejoras sugeridas

- Extraer `AnimatedInput` y `AnimatedTextarea` a archivos separados (p. ej. en `components/form/` o `components/inputs/`).
- Mover variantes del form a `animations/variants.ts` o a un módulo `formVariants.ts`.
- Centralizar enlaces sociales en `config/social.ts` y reutilizar en Footer y Form.
- Considerar feedback de éxito/error accesible (live region, roles).
````

## File: docs/componentes/input.md
````markdown
# Input (inpput.jsx)

## Ubicación

`src/components/inpput.jsx`

## Propósito

Componente de campo de entrada reutilizable con etiqueta. Versión simple (sin animaciones ni validación visual) para formularios. Nota: el nombre del archivo tiene un typo (“inpput” en lugar de “input”).

## Uso

No se usa en el formulario principal de contacto; el formulario en `form.tsx` usa su propio `AnimatedInput` y `AnimatedTextarea`. Este Input podría usarse en otros formularios o demos.

```tsx
<Input
  label="Nombre"
  name="name"
  type="text"
  placeholder="Tu nombre"
  onChange={handleChange}
/>
```

## Props

| Prop        | Tipo     | Descripción                                      |
|-------------|----------|--------------------------------------------------|
| label       | string   | Texto de la etiqueta                             |
| name        | string   | name e id del input                              |
| type        | string   | type del input (text, email, etc.)               |
| placeholder | string   | Placeholder del campo                            |
| onChange    | function | Callback al cambiar el valor                      |

No maneja `value` (no es controlado); sería controlado desde el padre pasando `value` y `onChange` si se extiende el componente.

## Estilos

- Label: `text-[#f0f8ff] block mb-2`
- Input: `w-full px-3 py-2 text-[#f0f8ff] bg-[#3a3a3a] rounded-md focus:ring-2 focus:ring-[#f0f8ff]`

## Dependencias

- Solo React

## Mejoras sugeridas

- Renombrar archivo a `Input.jsx` o `Input.tsx` y corregir imports.
- Añadir props `value`, `error` y `disabled` para uso controlado y consistencia con AnimatedInput.
- Migrar a TypeScript y exportar tipo de props.
- Si se unifica con los campos del form, considerar un único componente Input configurable (animado opcional, textarea opcional).
````

## File: docs/componentes/magnetic-btn.md
````markdown
# MagneticBtn

## Ubicación

`src/components/buttons/magneticBtn.tsx`

## Propósito

Botón con efecto “magnético”: el cursor atrae ligeramente el botón (y su texto) mediante animaciones GSAP. Al hacer click navega a `/informacion` y registra el evento en analytics.

## Uso

Actualmente no se usa en la UI (en Home está comentado: `//import MagneticBtn`). Pensado para un CTA hacia la sección de información.

```tsx
<MagneticBtn iconName="link" subtitle="Ver más" />
```

## Props

| Prop      | Tipo        | Descripción                          |
|-----------|-------------|--------------------------------------|
| iconName  | "link"      | Nombre del icono IonIcon a mostrar   |
| subtitle  | string      | Texto debajo del icono                |

## Comportamiento

- **Refs**: `magneticBtnRef`, `magneticBtnTextRef`, `lastPosition`, `touchStartTime`, `touchStartPos` (para touch).
- **Efecto magnético**: En mousemove/touchmove calcula la distancia al centro del botón y aplica desplazamiento con GSAP (elastic.out). Al soltar o salir se llama `resetPosition()`.
- **Navegación**: `onClick` → `navigate('/informacion')` y `trackButtonClick` (utils/analytics).
- **Accesibilidad**: Incluye manejo de teclado (Enter/Space) y consideraciones para touch.

## Dependencias

- React, useRef, useEffect
- gsap
- react-router-dom (useNavigate)
- @reacticons/ionicons
- utils/analytics (trackButtonClick)

## Mejoras sugeridas

- Hacer `iconName` más genérico (union type de iconos permitidos) si se quieren más CTAs.
- Añadir prop opcional `to` para que la ruta sea configurable en lugar de fija `/informacion`.
- Si se reactiva en Home, asegurar que no duplique el mismo CTA que el menú.
````

## File: docs/componentes/navbar.md
````markdown
# Navbar

## Ubicación

- `src/components/navbar/navMenu.tsx`
- `src/components/navbar/menuResponsive.tsx`
- `src/components/navbar/navMenu.css` (si se usa)

## Propósito

Proporcionar la navegación principal de la aplicación en dos variantes:

- **NavMenu**: Barra fija superior centrada, visible en viewports `sm` y mayores, con cambio de estilo al hacer scroll.
- **menuResponsive**: Menú tipo hamburguesa/sidebar para móviles, animado con GSAP.

## Uso

Ambos se renderizan a nivel global en `App.tsx` (dentro de `RouterWrapper`), no dentro de cada página.

```tsx
<NavMenu />
<ResponsiveMenu />
```

## NavMenu

- **Estado**: `isScrolled` (boolean) según `window.scrollY > 10`.
- **Comportamiento**: Fondo transparente por defecto; al hacer scroll pasa a `bg-gray-200/90 backdrop-blur-sm` y texto a `text-gray-800`.
- **Items**: Array local `navItems = ['Inicio', 'Informacion', 'Proyectos', 'Contacto', 'Planes']`. Rutas derivadas con `item.toLowerCase()` (ej. `/inicio`, `/informacion`).
- **Clases**: `fixed top-4 left-1/2 -translate-x-1/2 z-50`, `rounded-full`, `hidden sm:block`.

## menuResponsive

- **Estado**: `isOpen` para abrir/cerrar el panel.
- **Refs**: `sidebarRef` (contenedor), `animationRef` (timeline GSAP).
- **Animaciones**: GSAP timeline: al abrir, desplaza el panel a `x: 0` y hace stagger de `.nav-item`; al cerrar, invierte y al final vuelve a `x: '100%'`.
- **Items**: Mismo array `navItems` que NavMenu (duplicado). Cierra el menú al hacer click en un `NavLink`.
- **Icono**: IonIcon (menú / cerrar) según `isOpen`.

## Props

Ninguno; ambos componentes no reciben props.

## Dependencias

- React, useState, useEffect, useRef
- react-router-dom (NavLink)
- GSAP (solo menuResponsive)
- @reacticons/ionicons (solo menuResponsive)

## Mejoras sugeridas

- Extraer `navItems` a `config/nav.ts` (o similar) y importar en ambos para una sola fuente de verdad.
- Añadir ruta `/planes` en `App.tsx` o eliminar "Planes" del menú.
- Considerar `aria-expanded` y `aria-label` en el botón del menú responsivo para accesibilidad.
````

## File: docs/componentes/README.md
````markdown
# Documentación del portfolio

## 1. Propósito de la página

Este proyecto es un **portfolio personal** (SPA) que sirve como:

- **Presentación profesional**: Muestra el perfil del desarrollador (Wilmer Lynch), rol (Web Developer) y avatar.
- **Vitrina de proyectos**: Galería de proyectos con tarjetas interactivas, enlaces a código (GitHub) y demos en vivo.
- **Información y habilidades**: Sección “Información” con skills, frameworks, tecnologías y experiencia (composite pattern para agrupar datos).
- **Canal de contacto**: Formulario de contacto que persiste en **Firebase Firestore** y enlaces a redes (WhatsApp, Instagram, GitHub, etc.).
- **Analytics**: Integración con **Google Analytics 4** (vistas de página, navegación entre secciones, intentos de contacto).

Está orientado a captar oportunidades laborales o de colaboración y dar visibilidad al trabajo del desarrollador.

---

## 2. Arquitectura

### 2.1 Stack

| Capa        | Tecnología                          |
|------------|--------------------------------------|
| Framework  | React 18                             |
| Build      | Vite 6                               |
| Estilos    | Tailwind CSS                         |
| Animaciones| Framer Motion, GSAP, Three.js        |
| Enrutado   | React Router v6                      |
| Backend/DB | Firebase (Firestore)                 |
| Analytics  | react-ga4 (GA4)                      |
| Iconos     | @reacticons/ionicons                 |

### 2.2 Estructura de carpetas (src)

```
src/
├── App.tsx                 # Router, GA4, layout global (NavMenu, BackgroundStars, ResponsiveMenu)
├── main.jsx
├── pages/                  # Vistas por ruta
│   ├── home.jsx            # Hero + CircleProfile + Glitch + WordCloud + Footer
│   ├── information.tsx     # SkillSection + ExpAndTecnologies + Footer
│   ├── proyects.jsx        # Grid de cards + Footer
│   ├── contact.jsx         # ContactForm + Footer
│   ├── 404.jsx
│   └── demos.tsx           # Contenido dinámico por projectId
├── components/
│   ├── navbar/             # navMenu.tsx, menuResponsive.tsx
│   ├── footer/             # footer.tsx
│   ├── cards/              # components_Card, components_Grid, proyectPage (CardDetails)
│   ├── form.tsx            # Formulario de contacto (Firestore + validación)
│   ├── about/              # informationContent.tsx (SkillSection, ExpAndTecnologies)
│   ├── animations/         # glitchPresentation, WordCloud, StarsBackground, variants.ts
│   ├── buttons/            # magneticBtn.tsx
│   ├── demos/              # Componentes de demo por proyecto (ecomerce, barberia, etc.)
│   └── utils/              # cardAnimations, infoHandler, validation
├── config/                 # project.ts, cards.ts, firebase.js, webPlans.ts
├── hooks/                  # useAnalytics, useGsapAnimation
├── utils/                  # analytics.ts
└── types/                  # types.ts
```

### 2.3 Flujo de datos y rutas

- **Rutas**: `/`, `/inicio` → Home; `/informacion` → Information; `/proyectos` → Proyects; `/contacto` → Contact; `/page/:id` → detalle de proyecto (CardDetails); `/demos/:projectId` → demo embebida. No existe ruta `/planes` aunque el menú la muestra.
- **Datos**: Proyectos desde `config/project.ts` (id, content, bgProyect, codeUrl, demoUrl). Tarjetas de la galería desde `config/cards.ts`. Formulario → Firestore.
- **Analytics**: Inicialización GA4 en `App`; `trackPageView`, `trackSectionNavigation` y `trackContactAttempt` desde `utils/analytics.ts` y hook `useAnalytics`.

### 2.4 Patrones usados

- **Container/Presentational**: Grid (contenedor) + Card (presentacional).
- **Composición**: Páginas = secciones + Footer; Information = SkillSection + ExpAndTecnologies.
- **Data-driven**: Listas de nav, cards y proyectos desde config/arrays.
- **Variantes centralizadas**: `animations/variants.ts` para Framer Motion (CONTAINERCARDS, CARDS, INLINECARDS).

---

## 3. Propuestas de refactorización

### 3.1 Rutas y navegación

- **Ruta “Planes”**: El menú (navMenu y menuResponsive) incluye “Planes” pero no hay `<Route path="/planes" />` en `App.tsx`. Opciones: añadir la ruta y una página (por ejemplo con `config/webPlans.ts`) o quitar “Planes” del menú para evitar 404.

### 3.2 Consistencia de nombres y tipos

- **Nombres de archivos**: Unificar criterio (ej. `components_Card.tsx` → `Card.tsx`, `components_Grid.tsx` → `Grid.tsx`). Corregir typo `inpput.jsx` → `Input.jsx` (o `Input.tsx`).
- **Extensiones**: Mezcla de `.jsx` y `.tsx`. Ir migrando páginas y componentes a `.tsx` y tipado para mejor mantenimiento y DX.
- **CardProps**: En `types/types.ts` está `img`; en algunos usos se menciona `imgSrc`. Estandarizar un solo nombre en tipos y componentes.

### 3.3 Componentes y responsabilidades

- **Form (form.tsx)**: Archivo largo (~400 líneas) con variantes de animación, subcomponentes (AnimatedInput, AnimatedTextarea) y lógica de submit. Propuesta: extraer variantes a `animations/variants.ts` o a un archivo local de variantes del formulario; extraer `AnimatedInput` y `AnimatedTextarea` a componentes en `components/form/` o `components/inputs/`; dejar en `form.tsx` solo composición y submit.
- **informationContent.tsx**: Muy largo (skills + proyectos + secciones). Valorar dividir en `SkillSection.tsx`, `ExpAndTecnologies.tsx` y mover datos a `config/skills.ts` / `config/technologies.ts`.
- **CardDetails (proyectPage.tsx)**: Usa `showInfo`/`hideInfo` con `getElementById` y estilos inline. Valorar un componente Tooltip/Popover reactivo en lugar de manipulación directa del DOM.

### 3.4 Configuración y duplicación

- **Enlaces sociales**: Aparecen en `form.tsx` (SOCIAL_LINKS/SOCIAL_ITEMS) y en `footer.tsx` (CONTACT_INFO.socialMedia). Centralizar en algo como `config/social.ts` o `config/contact.ts` y reutilizar en ambos.
- **navItems**: Duplicado en `navMenu.tsx` y `menuResponsive.tsx`. Extraer a `config/nav.ts` o constante compartida y importar en ambos.

### 3.5 Accesibilidad y UX

- **Footer/Form**: Revisar contraste y focus visible en enlaces y botones.
- **CardDetails**: Los botones “Código” y “Ver Proyecto” usan tooltips con `showInfo`/`hideInfo`; asegurar que la información sea accesible por teclado y lectores de pantalla (por ejemplo con un tooltip accesible o `aria-describedby`).

### 3.6 Rendimiento y bundle

- **Demos**: Los componentes en `components/demos/` se cargan desde `config/project.ts`. Valorar `React.lazy` + `Suspense` por ruta `/demos/:projectId` para no cargar todos los demos en el bundle inicial.
- **Three.js (StarsBackground)**: Ya se usa ref y cleanup; revisar si el número de partículas (p. ej. 500) es adecuado en móviles y si conviene reducir o degradar en viewports pequeños.

### 3.7 Testing y calidad

- Añadir tests unitarios para: `utils/validation.js` (isValidEmail, etc.), `utils/analytics.ts` (mocks de GA4), y componentes críticos (Form, Card).
- Revisar reglas de ESLint y asegurar que no queden `console.log` o código comentado innecesario en producción.

---

## 4. Índice de documentación por componente

Cada componente tiene su propia ficha en esta carpeta:

| Documento | Componente(s) |
|-----------|----------------|
| [navbar.md](navbar.md) | NavMenu, menuResponsive |
| [footer.md](footer.md) | Footer |
| [cards.md](cards.md) | Card, Grid, CardDetails (proyectPage) |
| [form.md](form.md) | ContactForm, AnimatedInput, AnimatedTextarea |
| [animations.md](animations.md) | Glitch, WordCloud, StarsBackground, variants |
| [about.md](about.md) | informationContent (SkillSection, ExpAndTecnologies) |
| [circle-profile.md](circle-profile.md) | CircleProfile |
| [magnetic-btn.md](magnetic-btn.md) | MagneticBtn |
| [input.md](input.md) | Input (inpput.jsx) |
| [utils.md](utils.md) | cardAnimations, infoHandler, validation |
| [demos.md](demos.md) | Demos (crudNode, authSystem, ecomerce, etc.) |
````

## File: docs/componentes/utils.md
````markdown
# Utils (componentes)

## Ubicación

- `src/components/utils/cardAnimations.ts`
- `src/components/utils/infoHandler.ts`
- `src/components/utils/validation.js`

## Propósito

Funciones auxiliares usadas por componentes: animaciones 3D de tarjetas, tooltips por DOM en CardDetails, y validación de formularios.

---

## cardAnimations.ts

### handleMouseMove

Aplica efecto parallax/3D a una tarjeta según la posición del mouse.

- **Parámetros**: `e: MouseEvent`, `card: HTMLDivElement`, `content: HTMLDivElement`, `sensitivity: number = 1`.
- **Lógica**: Calcula posición relativa del mouse respecto al centro de la tarjeta; aplica `rotateX`, `rotateY` y desplazamiento al contenido. Sensibilidad normalizada entre 0.1 y 3.
- **Uso**: En `components_Card.tsx` con sensibilidad 1.15, en listeners `mousemove`/`mouseleave`.

### resetCardPosition

Vuelve la tarjeta y el contenido a la transformación inicial (sin rotación ni desplazamiento).

- **Parámetros**: `card: HTMLDivElement`, `content: HTMLDivElement`.
- **Uso**: En el listener `mouseleave` de Card.

**Dependencias**: gsap (para `gsap.to`).

---

## infoHandler.ts

### showInfo(button, info)

Muestra un tooltip con texto `info` encima del elemento `button`.

- Busca en el DOM `getElementById("infoCard")` y `getElementById("infoText")`.
- Asigna `infoText.textContent = info`, posiciona `infoCard` según `button.getBoundingClientRect()` y pone `display: "block"`.
- **Limitación**: Depende de que existan elementos con esos ids en el DOM (probablemente en CardDetails o layout). No es un componente React.

### hideInfo()

Oculta el tooltip poniendo `infoCard.style.display = "none"`.

**Dependencias**: Ninguna (DOM puro).

**Mejora sugerida**: Sustituir por un componente Tooltip/Popover con estado y portal para no depender de ids globales y mejorar accesibilidad.

---

## validation.js

### isValidEmail

Valida formato de email (expresión regular o lógica equivalente).

- **Uso**: En `form.tsx` antes de enviar el formulario.
- **Export**: Función que recibe un string y devuelve boolean.

**Dependencias**: Ninguna (o dependencia mínima).

**Mejora sugerida**: Migrar a `validation.ts` y añadir tests unitarios; documentar el formato aceptado (ej. RFC 5322 simplificado).
````

## File: src/vite-env.d.ts
````typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
````

## File: supabase/migrations/20250228000002_storage.sql
````sql
-- Storage bucket and RLS for portfolio-assets
-- Create bucket in Dashboard if not exists: Storage -> New bucket -> id: portfolio-assets, Public: yes
-- Then run this to allow: public read, authenticated (admin) write

insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do update set public = true;

-- Anyone can read (public bucket)
create policy "Public read portfolio-assets"
  on storage.objects for select
  using (bucket_id = 'portfolio-assets');

-- Only authenticated users (admin list checked in app or add same admin_emails check via custom claim) can upload
-- Using authenticated role: any logged-in user can upload; restrict to admin in app by only allowing admin UI to call upload
create policy "Authenticated upload portfolio-assets"
  on storage.objects for insert
  with check (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');

create policy "Authenticated update portfolio-assets"
  on storage.objects for update
  using (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');

create policy "Authenticated delete portfolio-assets"
  on storage.objects for delete
  using (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');
````

## File: supabase/migrations/20250228000003_unify_projects.sql
````sql
-- Unify cards + projects_meta into a single "cards" table
-- Adds project metadata columns to cards so everything lives in one place.

ALTER TABLE public.cards
  ADD COLUMN IF NOT EXISTS code_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS demo_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS bg_image_path text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "order" smallint NOT NULL DEFAULT 0;

-- Migrate existing projects_meta data into cards
UPDATE public.cards c
SET
  code_url    = pm.code_url,
  demo_url    = pm.demo_url,
  bg_image_path = pm.bg_image_path,
  "order"     = pm."order"
FROM public.projects_meta pm
WHERE c.id = pm.id;
````

## File: supabase/migrations/20250228000004_project_content.sql
````sql
-- Project content blocks: text, images (.webp), videos (.gif) per project
create table if not exists public.project_content (
  id uuid primary key default gen_random_uuid(),
  project_id text not null references public.cards(id) on delete cascade,
  type text not null check (type in ('text', 'image', 'video')),
  content text not null,
  caption text default '',
  "order" smallint not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.project_content enable row level security;

create policy "Public read project_content"
  on public.project_content for select
  using (true);

create policy "Admin write project_content"
  on public.project_content for all
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

create index if not exists idx_project_content_project_id
  on public.project_content (project_id, "order");
````

## File: supabase/migrations/20250228000005_info_sections.sql
````sql
-- Info sections: editable skill groups and knowledge/technology cards
-- Replaces hardcoded SKILLS and PROJECTS arrays in informationContent.tsx

create table if not exists public.info_sections (
  id uuid primary key default gen_random_uuid(),
  section_type text not null check (section_type in ('skill', 'knowledge')),
  title text not null,
  color text not null default 'blue' check (color in ('blue', 'purple', 'green')),
  items jsonb not null default '[]'::jsonb,
  "order" smallint not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.info_sections enable row level security;

create policy "Public read info_sections"
  on public.info_sections for select
  using (true);

create policy "Admin write info_sections"
  on public.info_sections for all
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

-- Seed: current SKILLS data (section_type = 'skill')
insert into public.info_sections (section_type, title, color, items, "order") values
  ('skill', 'Información', 'blue', '["Wilmer Lynch - Programador Full Stack"]', 0),
  ('skill', 'Lenguajes', 'purple', '["JavaScript", "Python"]', 1),
  ('skill', 'Frameworks', 'green', '["React", "Django", "PHP", "Next.js"]', 2),
  ('skill', 'MERN de React', 'blue', '["MongoDB", "Express.js", "React", "Node.js"]', 3),
  ('skill', 'MERN de Django', 'blue', '["MongoDB + Express + React + Node.js", "Alternativa con Django: PostgreSQL + Django + React"]', 4);

-- Seed: current PROJECTS/knowledge data (section_type = 'knowledge')
insert into public.info_sections (section_type, title, color, items, "order") values
  ('knowledge', '📚 Librerías para React (4 años) — Estado y Gestión', 'blue', '["Redux — Gestión de estado predecible", "Zustand — Gestión de estado minimalista", "React Query / TanStack Query — Estado del servidor"]', 0),
  ('knowledge', '🧭 Ruteo', 'purple', '["React Router — Ruteo para SPA", "Next.js Router — Ruteo por file-system"]', 1),
  ('knowledge', '🎨 UI Components y Styling', 'blue', '["Material-UI (MUI)", "Ant Design", "Chakra UI", "Tailwind CSS", "Styled Components"]', 2),
  ('knowledge', '📝 Formularios', 'purple', '["React Hook Form", "Formik"]', 3),
  ('knowledge', '🧪 Testing', 'blue', '["Jest", "React Testing Library"]', 4),
  ('knowledge', '🧰 Utilidades', 'purple', '["Axios", "React Spring / Framer Motion", "React Icons", "date-fns"]', 5),
  ('knowledge', '⚙️ Librerías Django (4 años) — APIs REST', 'blue', '["Django REST Framework (DRF)"]', 6),
  ('knowledge', '🔐 Autenticación y Autorización', 'purple', '["Django Allauth", "DRF Simple JWT", "Django Cors Headers"]', 7),
  ('knowledge', '🗄️ Bases de Datos y ORM', 'blue', '["Django Debug Toolbar", "Django Extensions", "Django Filter"]', 8),
  ('knowledge', '📋 Formularios y UI', 'purple', '["Django Crispy Forms"]', 9),
  ('knowledge', '🛡️ Seguridad', 'blue', '["Django Guardian"]', 10),
  ('knowledge', '🚀 Desarrollo y Deployment', 'purple', '["Django Environ", "WhiteNoise", "Django Storages"]', 11),
  ('knowledge', '🧪 Testing (Django)', 'blue', '["pytest-django"]', 12),
  ('knowledge', '🔧 Otras Utilidades (Django)', 'purple', '["Celery", "Django Redis"]', 13),
  ('knowledge', '💼 ¿A qué me dedico?', 'purple', '["Creación de páginas web", "Administrador de servidores", "Creación de bots de Telegram", "Automatización de procesos (n8n)", "Integraciones: web + automatización + feedback por Telegram"]', 14),
  ('knowledge', '📖 ¿Cómo aprendí?', 'blue', '["Autodidacta: videos, libros y práctica", "Canales: HolaMundoDev, mouredev, ProgramadorX, soydalto, Platzi, FaztTech"]', 15),
  ('knowledge', '📚 Libros', 'purple', '["Patterns of Enterprise Application Architecture — Martin Fowler", "JavaScript: The Good Parts — Douglas Crockford", "Clean Architecture — Robert C. Martin", "The Clean Coder — Robert C. Martin", "Atomic Habits — James Clear", "The Linux Programming Interface — Michael Kerrisk", "Clean Code — Robert C. Martin"]', 16),
  ('knowledge', '✍️ ¿Cómo me gusta escribir el código?', 'blue', '["Entender primero el problema", "Definir los requisitos", "Planificar la solución", "Aplicar Principios SOLID y Clean Code", "Practicar patrones de diseño", "Manejo de errores robusto"]', 17),
  ('knowledge', '🎯 ¿A dónde quiero llegar? (Especialización)', 'purple', '["Creación de E-commerce", "Frameworks: React (conocimientos), Next.js (conocimientos)", "Frameworks: Vue.js + Nuxt.js (sin conocimientos)", "Frameworks: Angular (sin conocimientos)", "Frameworks: Svelte + SvelteKit (sin conocimientos)"]', 18),
  ('knowledge', '🛒 Librerías específicas e-commerce', 'blue', '["Shopify Storefront API (para React) — con conocimientos", "Commerce.js — sin conocimientos"]', 19);
````

## File: supabase/ejemplo_contenido.sql
````sql
-- Ejemplo: Agregar contenido de prueba para el proyecto "E-Commerce" (id: 1)
-- Ejecuta esto en Supabase SQL Editor DESPUÉS de ejecutar la migración 20250228000004_project_content.sql

-- Bloque 1: Título y descripción
INSERT INTO public.project_content (project_id, type, content, caption, "order") VALUES
('1', 'text', '<h2 class="text-3xl font-bold mb-4">E-Commerce con React y Redux</h2><p class="text-lg text-gray-700 leading-relaxed">Este proyecto es una aplicación de comercio electrónico completa construida con React, Redux y la FakeStore API. Implementa gestión de estado global, carrito de compras persistente y una interfaz de usuario moderna y responsiva.</p>', '', 0);

-- Bloque 2: Características principales
INSERT INTO public.project_content (project_id, type, content, caption, "order") VALUES
('1', 'text', '<h3 class="text-2xl font-bold mb-3">Características principales</h3><ul class="list-disc list-inside space-y-2 text-gray-700"><li>Gestión de estado con Redux Toolkit</li><li>Carrito de compras con persistencia en localStorage</li><li>Integración con FakeStore API</li><li>Diseño responsivo con Tailwind CSS</li><li>Filtrado y búsqueda de productos</li></ul>', '', 1);

-- Bloque 3: Stack tecnológico
INSERT INTO public.project_content (project_id, type, content, caption, "order") VALUES
('1', 'text', '<h3 class="text-2xl font-bold mb-3">Stack Tecnológico</h3><div class="flex flex-wrap gap-2"><span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React 18</span><span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Redux Toolkit</span><span class="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">Tailwind CSS</span><span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">FakeStore API</span></div>', '', 2);

-- Nota: Para agregar imágenes o videos, debes subirlos desde el admin (/admin/content)
-- porque necesitan subirse a Supabase Storage primero.

-- Verifica que se insertaron correctamente:
SELECT * FROM public.project_content WHERE project_id = '1' ORDER BY "order";
````

## File: .firebaserc
````
{
  "projects": {
    "default": "portafolio-56d5e"
  }
}
````

## File: .gitattributes
````
# Auto detect text files and perform LF normalization
* text=auto
````

## File: .gitignore
````
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
````

## File: DOCUMENTATION.md
````markdown
# Documentación Técnica del Portfolio

## 📚 Índice
1. [Arquitectura](#arquitectura)
2. [Patrones de Diseño](#patrones-de-diseño)
3. [Estructura de Directorios](#estructura-de-directorios)
4. [Componentes](#componentes)
5. [Configuración](#configuración)
6. [Mejoras Futuras](#mejoras-futuras)
7. [Limitaciones](#limitaciones)
8. [Solución de Problemas](#solución-de-problemas)

## 🏗️ Arquitectura

### Arquitectura General
El proyecto sigue una arquitectura modular basada en componentes, utilizando React como framework principal. La arquitectura se divide en las siguientes capas:

1. **Capa de Presentación**: Componentes React en `/components`
2. **Capa de Lógica**: Hooks personalizados en `/hook`
3. **Capa de Servicios**: Servicios y APIs en `/services`
4. **Capa de Configuración**: Configuraciones en `/config`
5. **Capa de Utilidades**: Funciones utilitarias en `/utils`

### Flujo de Datos
- Los datos fluyen de manera unidireccional
- El estado global se maneja a través de React Context y hooks personalizados
- Las animaciones se controlan mediante GSAP
- La persistencia de datos se maneja con localStorage y Firebase

## 🎨 Patrones de Diseño

### Patrones Implementados
1. **Component Pattern**
   - Componentes funcionales con TypeScript
   - Props tipadas con interfaces
   - Memoización selectiva con React.memo

2. **Custom Hook Pattern**
   - Lógica reutilizable encapsulada en hooks
   - Separación de preocupaciones
   - Reutilización de lógica entre componentes

3. **Factory Pattern**
   - Creación de componentes de tarjetas
   - Generación de animaciones
   - Instanciación de servicios

4. **Observer Pattern**
   - Sistema de eventos para animaciones
   - Suscripciones a cambios de estado
   - Manejo de efectos secundarios

## 📁 Estructura de Directorios

### /components
- **demos/**: Demos interactivos de proyectos
  - Cada demo es un componente independiente
  - Sigue una estructura consistente
  - Incluye documentación y tipos

- **cards/**: Componentes de tarjetas reutilizables
  - Tarjetas de proyectos
  - Tarjetas de precios
  - Tarjetas de eficiencia
  - Tarjetas de guía

- **utils/**: Componentes utilitarios
  - Animaciones
  - Validaciones
  - Manejadores de información

### /config
- **project.ts**: Configuración de proyectos
- **webPlans.ts**: Configuración de planes web
- **cards.ts**: Configuración de tarjetas
- **firebase.js**: Configuración de Firebase

### /hook
- **useGsapAnimation.js**: Hook personalizado para animaciones GSAP

### /utils
- **analytics.ts**: Utilidades para análisis
- **cardAnimations.ts**: Utilidades para animaciones
- **validation.js**: Utilidades para validación
- **infoHandler.ts**: Manejador de información

### /types
- **types.ts**: Definiciones de tipos TypeScript

## 🎯 Componentes

### Demos
Cada demo en `/components/demos` debe seguir esta estructura:

```typescript
import React from 'react';

interface DemoProps {
  // Props específicas del demo
}

const DemoComponent: React.FC<DemoProps> = () => {
  // Lógica del componente
  return (
    // JSX del componente
  );
};

export default DemoComponent;
```

### Tarjetas
Las tarjetas en `/components/cards` deben:
- Ser componentes funcionales
- Implementar TypeScript
- Incluir animaciones GSAP
- Ser responsivas
- Seguir el patrón de diseño establecido

## ⚙️ Configuración

### Firebase
```javascript
// src/config/firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Configuración de Firebase
};

export const app = initializeApp(firebaseConfig);
```

### Animaciones
```typescript
// src/components/utils/cardAnimations.ts
export const cardAnimations = {
  // Configuraciones de animación
};
```

## 🔮 Mejoras Futuras

### Corto Plazo
1. Implementación de pruebas unitarias
2. Optimización de rendimiento
3. Mejora de accesibilidad
4. Internacionalización

### Mediano Plazo
1. Integración con CMS
2. Sistema de temas
3. PWA
4. Optimización de SEO

### Largo Plazo
1. Microfrontends
2. IA para recomendaciones
3. Sistema de análisis avanzado
4. Integración con más servicios

## ⚠️ Limitaciones

### Técnicas
1. Dependencia de Firebase
2. Limitaciones de GSAP en dispositivos móviles
3. Tamaño del bundle
4. Rendimiento en navegadores antiguos

### Funcionales
1. Número limitado de demos
2. Complejidad de animaciones
3. Requisitos de navegador
4. Dependencias externas

## 🔧 Solución de Problemas

### Problemas Comunes
1. **Animaciones no funcionan**
   - Verificar GSAP importado
   - Comprobar selectores
   - Revisar dependencias

2. **Firebase no conecta**
   - Verificar credenciales
   - Comprobar reglas de seguridad
   - Revisar configuración

3. **Errores de TypeScript**
   - Actualizar tipos
   - Verificar interfaces
   - Comprobar importaciones

### Mejores Prácticas
1. Seguir la estructura de archivos
2. Mantener tipos actualizados
3. Documentar cambios
4. Probar en múltiples navegadores

## 📝 Guía de Contribución

### Creación de Demos
1. Crear archivo en `/components/demos`
2. Implementar interfaz TypeScript
3. Agregar animaciones GSAP
4. Documentar componente
5. Actualizar configuración

### Creación de Tarjetas
1. Crear archivo en `/components/cards`
2. Implementar props tipadas
3. Agregar estilos Tailwind
4. Implementar animaciones
5. Documentar uso

## 🔍 Monitoreo y Análisis

### Métricas
- Rendimiento
- Accesibilidad
- SEO
- Experiencia de usuario

### Herramientas
- Google Analytics
- Lighthouse
- React DevTools
- Chrome DevTools
````

## File: eslint.config.js
````javascript
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
````

## File: INSTRUCCIONES_ADMIN_CONTENIDO.md
````markdown
# Instrucciones: Sistema de Contenido de Proyectos

## 1. Ejecutar la migración SQL

Primero, debes ejecutar la migración SQL en Supabase:

1. Ve a tu proyecto en [https://supabase.com](https://supabase.com)
2. Ve a **SQL Editor**
3. Copia y pega el contenido del archivo `supabase/migrations/20250228000004_project_content.sql`
4. Ejecuta el SQL

## 2. Cómo usar el editor de contenido

### Acceder al editor

1. Ve a `/admin/login` e inicia sesión
2. En el menú lateral, haz clic en **"Contenido"**
3. Selecciona un proyecto del dropdown

### Agregar contenido

1. Haz clic en **"Agregar bloque"**
2. Elige el tipo de bloque:
   - **Texto**: Para escribir descripciones, explicaciones (soporta HTML)
   - **Imagen**: Para subir imágenes (.webp, .jpg, .png)
   - **Video**: Para subir GIFs o videos (.gif, .mp4, .webm)

### Editar bloques

- **Texto**: Escribe directamente en el textarea (puedes usar HTML básico)
- **Imagen/Video**: 
  - Haz clic en "Choose File" para subir
  - Agrega un caption opcional (pie de foto/video)
- **Reordenar**: Usa las flechas ↑ ↓ en cada bloque
- **Eliminar**: Haz clic en el ícono de basura

### Guardar cambios

1. Haz clic en **"Guardar todo"** al final
2. Los archivos se suben a Supabase Storage
3. El contenido se guarda en la tabla `project_content`

## 3. Ver el contenido en la página pública

1. Ve a `/proyectos` en la página pública
2. Haz clic en cualquier proyecto
3. El contenido que agregaste en el admin se mostrará automáticamente

## 4. Flujo de datos

```
Admin → Agregar bloques → Guardar → Supabase (project_content + Storage)
                                              ↓
                                    Página pública (/page/:id)
                                              ↓
                                    Renderiza contenido dinámico
```

## 5. Fallback

Si un proyecto NO tiene contenido en la base de datos, se mostrará el componente React hardcodeado de `src/components/demos/` (comportamiento anterior).

## 6. Verificar que funciona

### En el admin:

1. Ve a `/admin/content`
2. Selecciona "E-Commerce" (proyecto 1)
3. Agrega un bloque de texto con: `<h2>Descripción del proyecto</h2><p>Este es un e-commerce...</p>`
4. Agrega un bloque de imagen
5. Haz clic en "Guardar todo"
6. Deberías ver la vista previa al final

### En la página pública:

1. Ve a `/proyectos`
2. Haz clic en "E-Commerce"
3. Deberías ver el contenido que agregaste en el admin

## 7. Troubleshooting

### "No se muestra el contenido"

1. Verifica que ejecutaste la migración SQL en Supabase
2. Abre las DevTools del navegador (F12)
3. Ve a la pestaña **Console**
4. Busca errores relacionados con `project_content`
5. Ve a la pestaña **Network** y busca la petición a `project_content`

### "Error al guardar"

1. Verifica que tu usuario está en la tabla `admin_emails` de Supabase
2. Verifica que el bucket `portfolio-assets` existe en Supabase Storage
3. Verifica que las políticas RLS están correctamente configuradas

### "Las imágenes no se ven"

1. Ve a Supabase → Storage → `portfolio-assets`
2. Verifica que existen las carpetas `project-images/` y `project-videos/`
3. Verifica que las políticas de Storage permiten lectura pública

## 8. Estructura de la base de datos

### Tabla `project_content`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | uuid | ID único del bloque |
| project_id | text | ID del proyecto (referencia a `cards.id`) |
| type | text | Tipo: 'text', 'image', 'video' |
| content | text | Contenido (texto HTML o path en storage) |
| caption | text | Pie de imagen/video (opcional) |
| order | smallint | Orden de visualización |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Fecha de actualización |

### Storage paths

- Imágenes de proyecto: `project-images/{project_id}-{index}-{timestamp}.{ext}`
- Videos de proyecto: `project-videos/{project_id}-{index}-{timestamp}.{ext}`
````

## File: postcss.config.js
````javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
````

## File: README_SISTEMA_ADMIN.md
````markdown
# Sistema Administrativo - Portfolio

## Resumen de mejoras implementadas

### 1. Sistema CRUD de Proyectos
- **Crear, editar y eliminar** proyectos desde `/admin/projects`
- **Reordenar** proyectos con flechas arriba/abajo
- **Upload** de imágenes de card e imágenes de fondo
- **Vista previa** en tiempo real
- UI con **glassmorphism** consistente

### 2. Editor de Contenido por Proyecto
- **Bloques editables** de texto, imágenes (.webp, .jpg, .png) y videos (.gif, .mp4)
- **Reordenar bloques** con flechas
- **Captions** opcionales para imágenes y videos
- **Vista previa** del contenido completo
- Contenido se renderiza en la página pública del proyecto

### 3. Panel Admin Responsivo
- **Sidebar colapsable** en móvil con botón hamburger
- **Glassmorphism** en todas las secciones
- **Layout adaptativo** para todas las pantallas

## Pasos para usar el sistema

### Paso 1: Ejecutar migraciones SQL

Ve a [Supabase SQL Editor](https://supabase.com) y ejecuta estos archivos en orden:

1. `supabase/migrations/20250228000001_initial_schema.sql` (si no lo hiciste)
2. `supabase/migrations/20250228000002_storage.sql` (si no lo hiciste)
3. `supabase/migrations/20250228000003_unify_projects.sql` ✅ **NUEVO**
4. `supabase/migrations/20250228000004_project_content.sql` ✅ **NUEVO**

### Paso 2: Configurar admin

1. Crea una cuenta en `/admin/login` (modo "Registrarse")
2. En Supabase SQL Editor, ejecuta:
   ```sql
   INSERT INTO public.admin_emails (email) VALUES ('tu@email.com');
   ```
3. Inicia sesión en `/admin/login`

### Paso 3: Gestionar proyectos

#### Crear proyecto nuevo
1. Ve a `/admin/projects`
2. Clic en **"Nuevo proyecto"**
3. Rellena el formulario:
   - Título (requerido)
   - Descripción (requerido)
   - Texto del botón (default: "Ver más...")
   - Imagen de card (opcional)
   - Imagen de fondo (opcional)
   - URL del código (GitHub, etc.)
   - URL del demo
   - Orden (número)
4. Clic en **"Crear proyecto"**

#### Editar proyecto existente
1. Ve a `/admin/projects`
2. Clic en **"Editar"** en cualquier card
3. Modifica los campos
4. Clic en **"Actualizar"**

#### Eliminar proyecto
1. Ve a `/admin/projects`
2. Clic en el ícono de **basura**
3. Confirma con **"Sí"**

#### Reordenar proyectos
1. Usa las **flechas ↑ ↓** en cada card (aparecen al hacer hover)
2. El orden se guarda automáticamente

### Paso 4: Agregar contenido a proyectos

#### Acceder al editor
1. Ve a `/admin/content`
2. Selecciona un proyecto del dropdown

#### Agregar bloques

**Bloque de texto:**
1. Clic en **"Agregar bloque"** → **"Texto"**
2. Escribe en el textarea (soporta HTML)
3. Ejemplo:
   ```html
   <h2>Título de sección</h2>
   <p>Descripción del proyecto...</p>
   <ul>
     <li>Característica 1</li>
     <li>Característica 2</li>
   </ul>
   ```

**Bloque de imagen:**
1. Clic en **"Agregar bloque"** → **"Imagen"**
2. Clic en **"Choose File"** y selecciona una imagen
3. (Opcional) Agrega un caption
4. La imagen se sube a Supabase Storage automáticamente

**Bloque de video:**
1. Clic en **"Agregar bloque"** → **"Video"**
2. Clic en **"Choose File"** y selecciona un .gif o .mp4
3. (Opcional) Agrega un caption
4. El video se sube a Supabase Storage automáticamente

#### Reordenar y eliminar
- **Reordenar**: Usa las flechas ↑ ↓ en cada bloque
- **Eliminar**: Clic en el ícono de basura

#### Guardar cambios
1. Clic en **"Guardar todo"** al final
2. Espera a que termine de subir los archivos
3. Verifica en la **vista previa** al final

### Paso 5: Ver el resultado

1. Ve a `/proyectos` en la página pública
2. Clic en cualquier proyecto
3. El contenido que agregaste se mostrará automáticamente

## Estructura de archivos

```
portfolio/
├── supabase/
│   └── migrations/
│       ├── 20250228000003_unify_projects.sql      ← Unifica cards + projects_meta
│       ├── 20250228000004_project_content.sql     ← Tabla de contenido por proyecto
│       └── ejemplo_contenido.sql                  ← Datos de ejemplo
├── src/
│   ├── pages/admin/
│   │   ├── AdminLayout.tsx                        ← Layout responsivo con sidebar
│   │   ├── AdminLogin.tsx                         ← Login con glassmorphism
│   │   └── sections/
│   │       ├── AdminProjects.tsx                  ← CRUD de proyectos
│   │       ├── AdminContent.tsx                   ← Editor de contenido
│   │       ├── AdminHero.tsx                      ← Editor de hero
│   │       └── AdminMessages.tsx                  ← Mensajes de contacto
│   ├── hooks/
│   │   ├── useCards.ts                            ← Hook de proyectos (extendido)
│   │   └── useProjectContent.ts                   ← Hook de contenido por proyecto
│   ├── components/cards/
│   │   └── proyectPage.tsx                        ← Página de proyecto (renderiza contenido dinámico)
│   └── types/
│       └── supabase.ts                            ← Tipos extendidos
├── INSTRUCCIONES_ADMIN_CONTENIDO.md               ← Guía detallada
└── README_SISTEMA_ADMIN.md                        ← Este archivo
```

## Tablas de Supabase

### `cards` (proyectos unificados)
- `id`, `title`, `description`, `button_text`, `image_path`
- `code_url`, `demo_url`, `bg_image_path`, `order` ← **NUEVOS**
- `created_at`, `updated_at`

### `project_content` (contenido por proyecto)
- `id`, `project_id` (FK a `cards.id`)
- `type` ('text' | 'image' | 'video')
- `content` (texto HTML o path en storage)
- `caption` (opcional)
- `order` (para ordenar bloques)
- `created_at`, `updated_at`

## Storage en Supabase

Bucket: `portfolio-assets`

Carpetas:
- `cards/` - Imágenes de cards de proyectos
- `projects-bg/` - Imágenes de fondo de proyectos
- `project-images/` - Imágenes del contenido de proyectos
- `project-videos/` - Videos/GIFs del contenido de proyectos
- `avatars/` - Foto de perfil del hero

## Troubleshooting

### "No veo el contenido en la página pública"

1. Verifica que ejecutaste la migración `20250228000004_project_content.sql`
2. Abre DevTools (F12) → Console y busca logs de `[useProjectContent]`
3. Verifica que guardaste los bloques con "Guardar todo"
4. Verifica en Supabase → Table Editor → `project_content` que hay datos

### "Error al subir imágenes"

1. Verifica que el bucket `portfolio-assets` existe en Supabase Storage
2. Verifica que las políticas de Storage permiten:
   - Lectura pública
   - Escritura para usuarios autenticados

### "No puedo editar nada"

1. Verifica que tu email está en la tabla `admin_emails`
2. Ejecuta en SQL Editor:
   ```sql
   SELECT * FROM public.admin_emails;
   ```
3. Si no está, agrégalo:
   ```sql
   INSERT INTO public.admin_emails (email) VALUES ('tu@email.com');
   ```

## Características técnicas

- **React 18** con TypeScript
- **Supabase** para backend (PostgreSQL + Storage + Auth)
- **TanStack Query** para cache y sincronización
- **Tailwind CSS** para estilos
- **Glassmorphism** (`bg-white/5 backdrop-blur-xl border border-white/10`)
- **Responsive design** (mobile-first)
- **RLS (Row Level Security)** para seguridad
- **Cascade delete** (al eliminar proyecto, se elimina su contenido)

## Próximas mejoras sugeridas

- [ ] Editor WYSIWYG para bloques de texto (TipTap, Quill)
- [ ] Drag & drop para reordenar bloques
- [ ] Previsualización en tiempo real del proyecto público
- [ ] Versionado de contenido
- [ ] Importar/exportar proyectos
- [ ] Búsqueda y filtrado de proyectos
- [ ] Estadísticas de visualizaciones
````

## File: storage.rules
````
rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
````

## File: tailwind.config.js
````javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
````

## File: .github/workflows/firebase-hosting-pull-request.yml
````yaml
# This file was auto-generated by the Firebase CLI
# https://github.com/firebase/firebase-tools

name: Deploy to Firebase Hosting on PR
on: pull_request
permissions:
  checks: write
  contents: read
  pull-requests: write
jobs:
  build_and_preview:
    if: ${{ github.event.pull_request.head.repo.full_name == github.repository }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: (npm ci && npm run build)
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_PORTAFOLIO_56D5E }}
          projectId: portafolio-56d5e

# ===========================================
# 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
# ===========================================
# 
# Este archivo es un WORKFLOW de GitHub Actions que crea una VISTA PREVIA
# de tu sitio web cuando alguien crea un Pull Request. Te explico qué hace cada parte:
#
# 🎯 ¿QUÉ ES ESTE ARCHIVO?
# Es diferente al archivo anterior. Este crea una versión temporal de tu sitio
# (preview) cuando alguien quiere hacer cambios. Es como un "borrador" que
# puedes ver y probar antes de decidir si aceptar los cambios o no.
#
# 📋 DESGLOSE POR SECCIONES:
#
# 1. INFORMACIÓN BÁSICA (líneas 1-9):
#    - name: "Deploy to Firebase Hosting on PR"
#    - Es como un título que dice "Despliega cuando hay un Pull Request"
#
# 2. CUÁNDO SE EJECUTA (línea 5):
#    on: pull_request
#    - Se activa cuando alguien crea un Pull Request (PR)
#    - NO se activa cuando haces push normal
#    - "Cada vez que alguien proponga cambios, crea una vista previa"
#
# 3. PERMISOS (líneas 6-9):
#    permissions:
#      checks: write      - Puede escribir resultados de pruebas
#      contents: read     - Puede leer el código
#      pull-requests: write - Puede comentar en el Pull Request
#    - Le dice a GitHub qué puede y qué no puede hacer este workflow
#
# 4. CONDICIÓN DE SEGURIDAD (línea 12):
#    if: ${{ github.event.pull_request.head.repo.full_name == github.repository }}
#    - Solo funciona si el PR viene del mismo repositorio
#    - Evita que extraños usen tu Firebase con PRs maliciosos
#    - "Solo haz esto si confías en el origen del cambio"
#
# 5. LOS PASOS (líneas 14-21):
#    PASO 1 (línea 15): actions/checkout@v4
#    - Descarga el código del Pull Request (no el código principal)
#
#    PASO 2 (línea 16): npm ci && npm run build
#    - Instala dependencias y construye el proyecto
#    - NOTA: Más compacto que el otro archivo, sin nombres detallados
#
#    PASO 3 (líneas 17-21): Deploy a Firebase Hosting
#    - Sube el sitio construido a Firebase como PREVIEW
#    - channelId NO especificado = usa canal automático para previews
#    - projectId: tu proyecto Firebase
#
# 🔄 DIFERENCIAS CON EL ARCHIVO ANTERIOR:
# 1. Trigger diferente: pull_request vs push to main
# 2. No especifica channelId (Firebase crea automáticamente previews)
# 3. Tiene validación de seguridad adicional
# 4. Permisos más específicos para PRs
#
# 🎯 ¿PARA QUÉ SIRVE?
# Cuando alguien (o tú mismo) hace un Pull Request:
# 1. ✅ Se construye una versión temporal de tu sitio
# 2. ✅ Se despliega como preview en Firebase
# 3. ✅ Puedes ver un link de vista previa en el PR
# 4. ✅ Puedes probar los cambios ANTES de aceptarlos
#
# 🚀 FLUJO COMPLETO:
# 1. Haces cambios en una rama
# 2. Creas Pull Request
# 3. Este workflow crea preview automáticamente
# 4. Revisas el preview
# 5. Si te gusta, aceptas el PR
# 6. El otro workflow (merge) despliega a producción
#
# ¡Es como tener una "zona de pruebas" antes de publicar!
# ===========================================
````

## File: src/types/types.ts
````typescript
export interface CardProps {
  id: string;
  title: string;
  description: string;
  img: string;
  problem_solved: string;
  architectural_doc: string;
  buttonText?: string;
  codeUrl?: string;
  demoUrl?: string;
  bgImage?: string;
  order?: number;
}
````

## File: supabase/migrations/20250228000001_initial_schema.sql
````sql
-- Portfolio Supabase: schema + RLS
-- Run this in Supabase SQL Editor or via supabase db push

-- Admin: only users whose email is in this table can write
create table if not exists public.admin_emails (
  email text primary key,
  created_at timestamptz default now()
);

alter table public.admin_emails enable row level security;

create policy "Only existing admins can read admin_emails"
  on public.admin_emails for select
  using (auth.jwt() ->> 'email' = email);

-- Hero (single row, fixed id for upsert)
create table if not exists public.hero_content (
  id text primary key default 'default',
  title text not null default 'Wilmer Lynch',
  subtitle text not null default 'Web Developer',
  profile_image_path text not null default 'avatars/profile.jpeg',
  updated_at timestamptz default now()
);

alter table public.hero_content enable row level security;

create policy "Public read hero_content"
  on public.hero_content for select
  using (true);

create policy "Admin write hero_content"
  on public.hero_content for all
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

-- Cards (gallery)
create table if not exists public.cards (
  id text primary key,
  title text not null,
  description text not null,
  button_text text not null default 'Ver más...',
  image_path text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.cards enable row level security;

create policy "Public read cards"
  on public.cards for select
  using (true);

create policy "Admin write cards"
  on public.cards for all
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

-- Projects metadata (bg image, urls; React content stays in code)
create table if not exists public.projects_meta (
  id text primary key,
  bg_image_path text not null,
  code_url text not null,
  demo_url text not null,
  "order" smallint default 0,
  updated_at timestamptz default now()
);

alter table public.projects_meta enable row level security;

create policy "Public read projects_meta"
  on public.projects_meta for select
  using (true);

create policy "Admin write projects_meta"
  on public.projects_meta for all
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

-- Content blocks (about, footer, nav: html or json)
create table if not exists public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  content text not null,
  type text not null check (type in ('html', 'json')),
  updated_at timestamptz default now()
);

alter table public.content_blocks enable row level security;

create policy "Public read content_blocks"
  on public.content_blocks for select
  using (true);

create policy "Admin write content_blocks"
  on public.content_blocks for all
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

-- Contact form submissions (Option A: migrate from Firebase)
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz default now()
);

alter table public.contact_submissions enable row level security;

create policy "Anyone can insert contact_submissions"
  on public.contact_submissions for insert
  with check (true);

create policy "Admin read contact_submissions"
  on public.contact_submissions for select
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

create policy "Admin delete contact_submissions"
  on public.contact_submissions for delete
  using (exists (select 1 from public.admin_emails where email = auth.jwt() ->> 'email'));

-- Seed single hero row
insert into public.hero_content (id, title, subtitle, profile_image_path)
values ('default', 'Wilmer Lynch', 'Web Developer', 'avatars/profile.jpeg')
on conflict (id) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  profile_image_path = excluded.profile_image_path,
  updated_at = now();

-- Seed cards (ids 1-7 to match existing routes)
insert into public.cards (id, title, description, button_text, image_path) values
  ('1', 'E-Commerce', 'Aplicacion de React con Redux y FakeStore API para crea un E-commerce', 'Ver mas...', 'cards/web7.webp'),
  ('2', 'FutureCart', 'E-commerce de teclados gaming', 'Ver más...', 'cards/web2.webp'),
  ('3', 'Barberia', 'Interfaz de reserva - Selección de servicios y barberos.', 'Ver más...', 'cards/web3.webp'),
  ('4', 'Formulario', 'Sistema de autenticación con login y registro', 'Ver más...', 'cards/web4.webp'),
  ('5', 'Paleta de colores', 'Aplicacion de react que genera 21 tonalidades de cualquier color', 'Ver mas...', 'cards/web5.webp'),
  ('6', 'CRUD/Rest API', 'CRUD de NodeJS con rest API para login con seguridad hash y manejo de errores', 'Ver mas...', 'cards/web6.webp'),
  ('7', 'HP Headphones', 'Landing Page de Auriculares', 'Ver más...', 'cards/web1.webp')
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  button_text = excluded.button_text,
  image_path = excluded.image_path,
  updated_at = now();

-- Seed projects_meta
insert into public.projects_meta (id, bg_image_path, code_url, demo_url, "order") values
  ('1', 'projects-bg/bg-proyecto2.jpg', 'https://github.com/Will855/fakeStore', 'https://fakestore-edf2003.web.app/', 1),
  ('2', 'projects-bg/bg-proyecto2.jpg', 'https://github.com/Will855/Carrito-de-Compras-JavaScript', 'https://will855.github.io/Carrito-de-Compras-JavaScript/', 2),
  ('3', 'projects-bg/bg-proyecto2.jpg', 'https://github.com/Will855/Barberia--Agendado-de-citas-', 'https://will855.github.io/Barberia--Agendado-de-citas-/#servicios', 3),
  ('4', 'projects-bg/bg-proyecto2.jpg', 'https://github.com/Will855/formulario', 'https://will855.github.io/formulario/', 4),
  ('5', 'projects-bg/bg-proyecto2.jpg', 'https://github.com/Will855/paleta-de-colores', 'https://will855.github.io/paleta-de-colores/', 5),
  ('6', 'projects-bg/bg-proyecto2.jpg', 'https://github.com/Will855/CRUD-NodeJS', '/page/6', 6),
  ('7', 'projects-bg/bg-proyecto1.jpg', 'https://github.com/Will855/HeadPhones', 'https://will855.github.io/HeadPhones/', 7)
on conflict (id) do update set
  bg_image_path = excluded.bg_image_path,
  code_url = excluded.code_url,
  demo_url = excluded.demo_url,
  "order" = excluded."order",
  updated_at = now();

-- Seed content_blocks: nav items (editable from admin)
insert into public.content_blocks (key, content, type) values
  ('nav_items', '["Inicio","Proyectos"]', 'json')
on conflict (key) do update set content = excluded.content, type = excluded.type, updated_at = now();
````

## File: supabase/README.md
````markdown
# Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. In Supabase SQL Editor, run the migrations in order:
   - `migrations/20250228000001_initial_schema.sql`
   - `migrations/20250228000002_storage.sql`
   - `migrations/20250228000003_unify_projects.sql` (añade code_url, demo_url, bg_image_path, order a cards)
   - `migrations/20250228000004_project_content.sql` (tabla de bloques de contenido por proyecto)
4. **Registro admin**: En la app ve a `/admin/login` y usa la pestaña "Registrarse" para crear tu cuenta. Si en Supabase está activada la confirmación de email, confirma el enlace que te llegue.
5. **Permisos de admin**: Tras registrarte, añade tu email a la tabla de admins en Supabase → SQL Editor:
   ```sql
   insert into public.admin_emails (email) values ('tu@email.com');
   ```
   (Sustituye por el email con el que te registraste.) Sin este paso podrás iniciar sesión pero no editar contenido (RLS bloquea escritura).
6. Opcional: en Authentication > Providers > Email puedes desactivar "Confirm email" para no tener que confirmar el correo al registrarte.
7. **Probar la base de datos**: En `/admin/login` la app hace una prueba de conexión (lectura de `hero_content`). Si falla, verás un mensaje en rojo: revisa que las migraciones se hayan ejecutado y que la URL y la anon key en `.env` sean correctas.

8. Storage: create bucket `portfolio-assets` as **Public** (Dashboard > Storage > New bucket). Then upload files:
   - `public/profile.jpeg` → `avatars/profile.jpeg`
   - `public/images/bg-proyecto1.jpg` → `projects-bg/bg-proyecto1.jpg`
   - `public/images/bg-proyecto2.jpg` → `projects-bg/bg-proyecto2.jpg`
   - `public/assets/web1.webp` … `web7.webp` → `cards/web1.webp` … `cards/web7.webp`
   - `public/assets/qrWhatsApp.webp` → `footer/qrWhatsApp.webp` (if you use it from content later)

Until uploads are done, the site falls back to local asset paths when Supabase URLs are missing.

**Probar peticiones a Supabase por proyecto:** En la web pública, entra en Proyectos y haz clic en una card: irás a `/page/:id`. Esa página lee `cards` (título, descripción, codeUrl, demoUrl, bgImage) y `project_content` (bloques de texto/imagen/video). Si no hay bloques, verás "Sin contenido para este proyecto. Añade bloques desde Admin → Contenido."

**Probar el CRUD de contenido en /admin:** Inicia sesión en `/admin/login`, ve a **Contenido**, elige un proyecto en el desplegable, pulsa "Agregar bloque" → Texto, escribe algo (p. ej. `<p>Hola</p>`), "Guardar todo". Abre en otra pestaña `/page/1` (o el id que elegiste): debe aparecer el bloque. Editar y eliminar bloques también se guarda en Supabase (`project_content`).
````

## File: README.md
````markdown
# Portfolio Personal - React + Vite

## 🚀 Descripción
Este es un portfolio personal desarrollado con React y Vite, que muestra una colección de proyectos y demos interactivos. El proyecto implementa una arquitectura moderna y modular, utilizando las mejores prácticas de desarrollo web.

## 🛠️ Tecnologías Principales
- React 18
- TypeScript
- Vite
- Tailwind CSS
- GSAP (Animaciones)
- Firebase (Configuración)

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── cards/         # Componentes de tarjetas reutilizables
│   ├── demos/         # Demos interactivos de proyectos
│   └── utils/         # Componentes utilitarios
├── config/            # Configuraciones y constantes
├── hook/              # Custom hooks
├── services/          # Servicios y APIs
├── types/             # Definiciones de tipos TypeScript
└── utils/             # Utilidades generales
```

## 🎯 Características Principales

### Demos Interactivos
- Sistema de autenticación
- E-commerce con carrito de compras
- Generador de paleta de colores
- Sistema CRUD con Node.js
- Tienda de auriculares
- Sistema de barbería premium
- Carrito de compras futurista

### Componentes Reutilizables
- Tarjetas de proyectos
- Tarjetas de precios
- Tarjetas de eficiencia
- Tarjetas de guía de sección
- Tarjetas de planes web

## 🚀 Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## 📝 Guía de Uso

### Creación de Nuevos Demos
1. Crear un nuevo archivo en `src/components/demos/`
2. Implementar el componente siguiendo el patrón de los demos existentes
3. Agregar la configuración en `src/config/project.ts`

### Uso de Componentes de Tarjetas
Los componentes de tarjetas están diseñados para ser reutilizables y personalizables. Cada tarjeta acepta props específicas que pueden ser configuradas según las necesidades.

## 🔧 Configuración

### Firebase
El proyecto utiliza Firebase para algunas funcionalidades. Configura tus credenciales en `src/config/firebase.js`.

### Animaciones
Las animaciones están manejadas por GSAP y pueden ser configuradas en `src/components/utils/cardAnimations.ts`.

## 🤝 Contribuciones
Las contribuciones son bienvenidas. Por favor, asegúrate de:
1. Hacer fork del proyecto
2. Crear una rama para tu feature
3. Hacer commit de tus cambios
4. Hacer push a la rama
5. Abrir un Pull Request

## 📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👤 Autor
Will855

## 🙏 Agradecimientos
- React Team
- Vite Team
- Tailwind CSS Team
- GSAP Team
````

## File: src/types/supabase.ts
````typescript
export interface HeroContent {
  id: string;
  title: string;
  subtitle: string;
  profile_image_path: string;
  updated_at: string;
}

export interface CardRow {
  id: string;
  title: string;
  description: string;
  button_text: string;
  image_path: string;
  code_url: string;
  demo_url: string;
  bg_image_path: string;
  order: number;
  problem_solved: string;
  architectural_doc: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectMetaRow {
  id: string;
  bg_image_path: string;
  code_url: string;
  demo_url: string;
  order: number;
  updated_at: string;
}

export interface ContentBlockRow {
  id: string;
  key: string;
  content: string;
  type: 'html' | 'json';
  updated_at: string;
}

export interface ContactSubmissionRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
}

export interface ProjectContentRow {
  id: string;
  project_id: string;
  type: 'text' | 'image' | 'video';
  content: string;
  caption: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface InfoSectionRow {
  id: string;
  section_type: 'skill' | 'knowledge';
  title: string;
  color: 'blue' | 'purple' | 'green';
  items: string[];
  order: number;
  created_at: string;
  updated_at: string;
}

export const STORAGE_BUCKET = 'portfolio-assets';
````

## File: firebase.json
````json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
````

## File: .github/workflows/firebase-hosting-merge.yml
````yaml
# This file was auto-generated by the Firebase CLI
# https://github.com/firebase/firebase-tools

name: Deploy to Firebase Hosting on merge

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      # 1. Checkout the repository
      - name: Checkout code
        uses: actions/checkout@v4

      # 2. Setup Node.js environment
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20.15.0' 

      # 3. Install dependencies and build the project
      - name: Install dependencies and build
        run: npm ci && npm run build

      # 4. Deploy to Firebase Hosting
      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_PORTAFOLIO_56D5E }}
          channelId: live
          projectId: portafolio-56d5e

# ===========================================
# 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
# ===========================================
# 
# Este archivo es un WORKFLOW de GitHub Actions que automatiza el despliegue
# de tu portfolio a Firebase Hosting. Te explico paso a paso qué hace cada parte:
#
# 🎯 ¿QUÉ ES ESTE ARCHIVO?
# Es una "receta" que le dice a GitHub: "cada vez que hago cambios en mi código, 
# haz estas tareas automáticamente". Es como tener un asistente que construye 
# y publica tu sitio web sin que tengas que hacerlo manualmente.
#
# 📋 DESGLOSE POR SECCIONES:
#
# 1. INFORMACIÓN BÁSICA (líneas 1-9):
#    - name: Le da un nombre al workflow para identificarlo
#    - Es como el título de una lista de tareas
#
# 2. CUÁNDO SE EJECUTA (líneas 6-9):
#    - on: push branches: main
#    - Solo cuando haces 'git push' a la rama 'main'
#    - "Cada vez que subas código a la rama principal, haz todo esto"
#
# 3. EL TRABAJO PRINCIPAL (líneas 11-36):
#    - jobs: build_and_deploy
#    - runs-on: ubuntu-latest (servidor Ubuntu gratuito)
#
# 4. LOS PASOS:
#    PASO 1 (líneas 16-17): Checkout code
#    - Descarga tu código desde GitHub al servidor
#    - "Trae mi código aquí para poder trabajar con él"
#
#    PASO 2 (líneas 20-23): Setup Node.js
#    - Instala Node.js versión '20.15.0'
#    - Tu proyecto React necesita Node.js para funcionar
#    - "Instala la herramienta necesaria para ejecutar mi código JavaScript"
#
#    PASO 3 (líneas 26-27): Install dependencies and build
#    - npm ci: Instala todas las dependencias (librerías)
#    - npm run build: Compila tu código React para producción
#    - "Descarga herramientas y convierte mi código en versión optimizada"
#
#    PASO 4 (líneas 30-36): Deploy to Firebase Hosting
#    - Sube tu sitio web construido a Firebase Hosting
#    - repoToken: Token para acceder a tu repositorio
#    - firebaseServiceAccount: Credenciales secretas de Firebase
#    - channelId: live (sitio web público)
#    - projectId: ID de tu proyecto Firebase
#
# 🔐 CONCEPTOS IMPORTANTES:
# - Secrets: Variables secretas para contraseñas y tokens API
# - Actions: Acciones predefinidas reutilizables
# - Pipeline CI/CD: Integración Continua/Despliegue Continuo
#
# 🎯 RESUMEN:
# Este archivo crea un flujo automático que cada vez que subes código:
# 1. ✅ Descarga tu código
# 2. ✅ Instala Node.js  
# 3. ✅ Construye tu proyecto React
# 4. ✅ Lo publica automáticamente en Firebase Hosting
#
# ¡Es como tener un asistente automático que actualiza tu portfolio!
# ===========================================
````

## File: index.html
````html
<!doctype html>
<html lang="es">

<head>
  <!-- Codificación de caracteres -->
  <meta charset="UTF-8" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="#" />

  <!-- Configuración de la vista para dispositivos móviles -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Título de la página -->
  <title>Portafolio</title>

  <!-- Meta descripción (muy importante para SEO) -->
  <meta name="description"
    content="Portafolio profesional que muestra proyectos, habilidades y experiencia en desarrollo web y diseño." />

  <!-- Meta palabras clave (menos relevante hoy en día, pero puede ser útil en algunos casos) -->
  <meta name="keywords" content="portafolio, desarrollo web, diseño, proyectos, habilidades, experiencia" />

  <!-- Meta autor -->
  <meta name="author" content="Tu Nombre" />

  <!-- Meta robots (controla cómo los motores de búsqueda indexan la página) -->
  <meta name="robots" content="index, follow" />


  <!-- Meta para idioma -->
  <meta name="language" content="es" />

  <!-- Meta para región geográfica (opcional) -->
  <meta name="geo.region" content="ES" />
  <meta name="geo.placename" content="España" />

  <!-- Meta tema de color para navegadores móviles -->
  <meta name="theme-color" content="#ffffff" />

  <!-- Fuentes de Google -->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap');
  </style>
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>

</html>
````

## File: src/App.css
````css
/* Importación de fuentes desde Google Fonts */


/* Variables CSS globales */
:root {
  --fs-small: clamp(1rem, (1rem + 1vw), 1.5rem); /* Tamaño de fuente adaptable */
  --clr-text: hsl(0, 0%, 20%); /* Color del texto principal */
  --clr-text-magnetic-btn: hsl(0, 0%, 80%); /* Color del texto en botones magnéticos */
  --clr-magnetic-btn-bg: hsl(0, 0%, 10%); /* Color de fondo de botones magnéticos */
}

/* Estilos generales para todos los elementos */
* {
  margin: 0; /* Eliminar márgenes */
  padding: 0; /* Eliminar rellenos */
  box-sizing: border-box; /* Incluir padding y border en el tamaño total */
  font-family: "Montserrat", serif; /* Fuente principal */
}

*::-webkit-scrollbar {
  display: none; /* Oculta la barra de desplazamiento */
}

/* Integración de Tailwind CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Estilos base personalizados */
@layer base {
  body {
    @apply bg-[#000000]; /* Color de fondo del cuerpo */
  }
}

/* Estilos para botones magnéticos */
.magnetic-btn {
  border-radius: 50%; /* Bordes redondeados */
  color: var(--clr-text-magnetic-btn); /* Color del texto */
  cursor: pointer; /* Cambiar cursor al pasar el mouse */
  overflow: hidden; /* Ocultar contenido que desborda */
  position: relative; /* Necesario para el pseudo-elemento */
  transition: color 0.2s ease-out; /* Transición suave para el color del texto */
}

/* Pseudo-elemento para el efecto de fondo en el botón magnético */
.magnetic-btn::before {
  content: ''; /* Contenido vacío para el pseudo-elemento */
  position: absolute; /* Posicionamiento absoluto */
  top: 0; /* Alinear al top */
  left: 0; /* Alinear a la izquierda */
  right: 100%; /* Comienza fuera del botón */
  bottom: 0; /* Alinear al bottom */
  background-color: white; /* Color de fondo que aparecerá */
  transition: right 0.4s ease-out; /* Transición para mover el fondo */
  z-index: 0; /* Asegura que el pseudo-elemento esté detrás del texto */
}

/* Efecto al pasar el mouse sobre el botón magnético */
.magnetic-btn:hover::before {
  right: 0; /* Mueve el fondo para cubrir todo el botón */
}

.word-cloud-icon {
  transition: filter 0.3s ease;
}

.word-cloud-icon:hover {
  filter: drop-shadow(0 4px 8px rgba(255,255,255,0.15));
}

/* Estilos para el texto dentro del botón magnético */
.text {
  display: block; /* Mostrar como bloque */
  font-weight: 500; /* Peso de la fuente */
  position: relative; /* Necesario para que el texto esté por encima del pseudo-elemento */
  z-index: 1; /* Asegura que el texto esté por encima del fondo */
}

/* Cambiar color del texto al pasar el mouse sobre el botón */
.magnetic-btn:hover .text {
  color: black; /* Cambia el color del texto al pasar el mouse */
}

/* Estilos para iconos */
ion-icon {
  color: aliceblue; /* Color de los iconos */
}

/* Estilos para el contenedor con efecto de vidrio */
#glass {
  background: #1f1f1f; /* Fondo semitransparente */
  box-shadow: 0 8px 32px 0 rgba(55, 55, 58, 0.137); /* Sombra del contenedor */
  backdrop-filter: blur(0.5px); /* Efecto de desenfoque de fondo */
  -webkit-backdrop-filter: blur(1.5px); /* Efecto de desenfoque para navegadores WebKit */
  border-radius: 10px; /* Bordes redondeados */
  border: 1px solid rgba(250, 247, 247, 0.18); /* Borde semitransparente */
}

.code {
  background-color: #1f1f1f;
  width: auto;
  overflow-x: scroll;
  padding: 8px;
  margin: 8px 0 8px;
  color: aliceblue;
}

/* Estilos para documentación técnica y bloques de código markdown */
.prose pre {
  background-color: #0f172a;
  border-radius: 12px;
  padding: 16px;
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 16px 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.prose code {
  background-color: rgba(15, 23, 42, 0.05);
  color: #c084fc;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 0.9em;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.prose pre code {
  background-color: transparent;
  color: #e2e8f0;
  padding: 0;
  border-radius: 0;
  font-size: 0.875rem;
}

.prose ul {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 12px;
}

.prose ol {
  list-style-type: decimal;
  padding-left: 20px;
  margin-bottom: 12px;
}

.prose li {
  margin-bottom: 4px;
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-top: 24px;
  margin-bottom: 12px;
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #334155;
  margin-top: 18px;
  margin-bottom: 8px;
}
````

## File: vite.config.js
````javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Puerto personalizado
    open: true, // Abre navegador automáticamente
    cors: true, // Habilitar CORS en desarrollo
    proxy: { // Configurar proxy para API
      '/api': {
        target: 'http://localhost:4000', // Tu backend
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist', // Directorio de build
    emptyOutDir: true // Limpiar directorio en cada build
  },
  optimizeDeps: {
    include: [
      'three/examples/jsm/postprocessing/EffectComposer',  
      'three',
      'three/addons/postprocessing/EffectComposer.js',
      'three/addons/geometries/TextGeometry.js'
    ]
  }
});
````

## File: package.json
````json
{
  "name": "portfolio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@reacticons/ionicons": "^7.1.0",
    "@supabase/supabase-js": "^2.98.0",
    "@tanstack/react-query": "^5.90.21",
    "dompurify": "^3.3.1",
    "framer-motion": "^11.9.0",
    "gsap": "^3.12.7",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-ga4": "^2.1.0",
    "react-router-dom": "^6.26.1",
    "three": "^0.175.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.0",
    "@types/dompurify": "^3.0.5",
    "@types/node": "^22.12.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.9.0",
    "eslint-plugin-react": "^7.35.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.2.1"
  }
}
````

## File: .firebase/hosting.ZGlzdA.cache
````
profile.jpeg,1761071772391,77462a465ea660c0f14dfbdd3380815b6458427c212cafb3b57df12b8c5568b5
index.html,1761071773041,6cbf479881897d16070afb5f1f05b35d97d158ad7deb3364457fb55b7dbb15ec
assets/web7.webp,1761071772391,a1fd62e0d5ddcf4546d23644ec6144f5c2117a6a50e97716f569a0d34a981056
assets/web6.webp,1761071772391,f933591ffd5c9f73fe1ae6c2a2c6f15f7403dab6c6a496abccaa9f8c6e106c37
assets/web5.webp,1761071772390,1b70e823bafa0c8dfedd864ef4049d6b6a1f3ce396761076b6e94261db6b351f
assets/web4.webp,1761071772390,e248aaa7ddbf96b747f3c90179d9b810b383fcfe73bfd403ae9fc887bb29fe9e
assets/web3.webp,1761071772390,18ef2f305b0a50a2e5f92a32b78f5b346b1d99d14b7bdc3f11b49a622208809f
assets/web2.webp,1761071772390,c02c06c9b3004c6e847c1b99028cead36ea2a653ecff8232e1c92ebd389d8c5c
assets/web1.webp,1761071772357,21fc2d3794ca1ad815b4d25aef117787759a8bc6b0b85370ccf534b28aae2bda
assets/video3.gif,1761071772357,d64ef67bfde3c789363a1c895ca0c63c1cf1d0cef231bedd2943170ef0a9e470
assets/video2.gif,1761071772355,58028aa68ba6d0458866a65d260a28902733241cb678247ef344e8f2827ee810
assets/video.gif,1761071772353,5bfe40e5879c9f28889fb9736b7de8e3c2971d931bb8fe135b503df71bb82b88
assets/qrWhatsapp.webp,1761071772350,4eb57c248fd03fb275105894a6fa2e1adb5227adaab1bc0efd8dc10f043b5b4a
assets/index-CHN0Pr5N.css,1761071773040,1007e5c30e7ca07e7fbb0ec0d2b0d3f6bae10adfc2795ba91115ff5f5a75920e
assets/index-BF29Sklx.js,1761071773042,036f22f0dbe1169dfd225e574669ef6e96e0e590e5f8d327357eeb384cb0a612
````

## File: src/App.tsx
````typescript
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GA4 from 'react-ga4';
import { useAnalytics } from './core/hooks/useAnalytics';
import { trackPageView, trackSectionNavigation } from './core/utils/analytics';
import { PublicLayout } from './core/components/PublicLayout';
import { AdminLogin } from './modules/auth/pages/AdminLogin';
import { AdminLayout } from './core/components/admin/AdminLayout';
import { AdminDashboard } from './core/components/admin/AdminDashboard';
import { AdminHero } from './modules/profile/admin/AdminHero';
import { AdminProjects } from './modules/projects/admin/AdminProjectsCRUD';
import { AdminContent } from './modules/projects/admin/AdminContentEditor';
import { AdminInfoSections } from './modules/projects/admin/AdminInfoSections';
import { AdminMessages } from './modules/contact/admin/AdminMessages';

const GA4_ID = 'G-HL1MY2MS9S';

/**
 * Componente principal de la aplicación
 * @function App
 * @returns {JSX.Element} Estructura principal de la aplicación con enrutamiento y tracking analítico
 * @description Configura el enrutamiento principal y la estructura común de la aplicación
 * 
 * @example
 * <App /> // Renderiza la aplicación completa con el enrutamiento y analytics configurados
 * 
 * @typedef {Object} RouteConfig
 * @property {string} path - Ruta URL
 * @property {JSX.Element} element - Componente a renderizar
 * 
 * @notes
 * - Usa React Router v6 para el enrutamiento
 * - Incluye tracking de Google Analytics 4 para todas las rutas
 * - Componentes comunes: NavMenu, BackgroundStars, ResponsiveMenu
 * - Maneja rutas estáticas y dinámicas con seguimiento analítico
 * - Proporciona un fallback 404 para rutas no encontradas
 */
/**
 * Componente wrapper para manejar el tracking analítico
 * @function RouterWrapper
 * @description Envuelve las rutas y maneja el tracking de navegación
 */
const RouterWrapper = () => {
  const location = useLocation();
  const previousPath = React.useRef(location.pathname);
  
  useAnalytics(); // Implementa el tracking de tiempo y scroll
  
  useEffect(() => {
    GA4.initialize(GA4_ID);
  }, []);

  useEffect(() => {
    // Tracking de vista de página
    trackPageView(location.pathname + location.search);
    
    // Tracking de navegación entre secciones
    if (previousPath.current !== location.pathname) {
      trackSectionNavigation(previousPath.current, location.pathname);
      previousPath.current = location.pathname;
    }
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="hero" element={<AdminHero />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="content" element={<AdminContent />} />
        <Route path="info" element={<AdminInfoSections />} />
        <Route path="messages" element={<AdminMessages />} />
      </Route>
      <Route path="*" element={<PublicLayout />} />
    </Routes>
  );
};

/**
 * Componente principal de la aplicación
 * @function App
 * @returns {JSX.Element} Estructura principal de la aplicación
 */
function App() {
  return (
    <Router>
      <RouterWrapper /> {/* Todos los componentes con hooks de routing están dentro de Router */}
    </Router>
  );
}

export default App;
````
