This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
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
- Only files matching these patterns are included: src/core/**/*, package.json, vite.config.js, tailwind.config.js, index.html, Dockerfile, .dockerignore, nginx.conf
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
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
.dockerignore
Dockerfile
index.html
nginx.conf
package.json
tailwind.config.js
vite.config.js
```

# Files

## File: .dockerignore
```
node_modules
dist
.git
.github
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
Dockerfile
.dockerignore
nginx.conf
```

## File: Dockerfile
```dockerfile
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_N8N_WEBHOOK_URL

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_N8N_WEBHOOK_URL=$VITE_N8N_WEBHOOK_URL

RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## File: nginx.conf
```ini
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

## File: src/core/components/admin/AdminDashboard.tsx
```typescript
import React from 'react';
import { Navigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  return <Navigate to="/admin/hero" replace />;
};
```

## File: src/core/components/navbar/menuResponsive.tsx
```typescript
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
```

## File: src/core/components/navbar/navMenu.css
```css
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
```

## File: src/core/components/navbar/navMenu.tsx
```typescript
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
```

## File: src/core/components/LoadingScreen.tsx
```typescript
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
```

## File: src/core/components/StarsBackground.tsx
```typescript
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
```

## File: src/core/hooks/useAnalytics.ts
```typescript
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
```

## File: src/core/hooks/useNavItems.ts
```typescript
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
```

## File: tailwind.config.js
```javascript
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
```

## File: src/core/components/admin/AdminLayout.tsx
```typescript
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
```

## File: src/core/components/NotFoundPage.tsx
```typescript
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
```

## File: src/core/components/PublicLayout.tsx
```typescript
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
```

## File: src/core/hooks/useAppDataReady.ts
```typescript
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
```

## File: src/core/hooks/useContentBlock.ts
```typescript
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
```

## File: src/core/hooks/useGsapAnimation.ts
```typescript
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
```

## File: src/core/utils/analytics.ts
```typescript
import GA4 from 'react-ga4';

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

async function sendToN8n(eventType: string, payload: object) {
  if (!N8N_WEBHOOK_URL) return;
  try {
    await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        ...payload,
      }),
    });
  } catch (error) {
    // Fallar silenciosamente para no romper la navegación o experiencia
    console.warn('Analytics webhook failed to send:', error);
  }
}


// Eventos de navegación
export const trackPageView = (path: string) => {
  GA4.send({
    hitType: 'pageview',
    page: path
  });
  sendToN8n('page_view', { path, timestamp: new Date().toISOString() });
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
  sendToN8n('contact_click', { method });
};

// Eventos de navegación entre secciones
export const trackSectionNavigation = (fromSection: string, toSection: string) => {
  GA4.event({
    category: 'Navigation',
    action: 'Section Change',
    label: `${fromSection} to ${toSection}`
  });
  sendToN8n('section_navigation', { from: fromSection, to: toSection });
};

// Eventos de búsqueda de proyectos
export const trackSearchExecution = (query: string, category: string) => {
  sendToN8n('project_search', { query, category, timestamp: new Date().toISOString() });
};
```

## File: src/core/utils/testSupabaseConnection.ts
```typescript
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
```

## File: src/core/components/footer/Footer.tsx
```typescript
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
            
            {/* Admin Link (Premium Glassmorphic) */}
            <div className="mt-6 flex justify-center">
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-br from-white/10 to-white/[0.02] hover:from-white/15 hover:to-white/5 border border-white/10 hover:border-blue-400/50 shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 backdrop-blur-md group hover:scale-[1.03] active:scale-95 cursor-pointer"
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-pink-300 transition-colors">
                  Acceso Administrador
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

## File: index.html
```html
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
```

## File: vite.config.js
```javascript
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
```

## File: package.json
```json
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
    "@gsap/react": "^2.1.2",
    "@reacticons/ionicons": "^7.1.0",
    "@supabase/supabase-js": "^2.98.0",
    "@tanstack/react-query": "^5.90.21",
    "dompurify": "^3.3.1",
    "gsap": "^3.15.0",
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
```
