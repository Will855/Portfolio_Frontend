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
- Only files matching these patterns are included: src/shared/**/*, src/types/**/*
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
src/
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
  types/
    supabase.ts
    types.ts
```

# Files

## File: src/shared/components/CircleProfile.tsx
```typescript
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
```

## File: src/shared/components/MagneticBtn.tsx
```typescript
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
```

## File: src/shared/components/SafeHtml.tsx
```typescript
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
```

## File: src/shared/config/webPlans.ts
```typescript
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
```

## File: src/shared/services/supabase/supabase.ts
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
```

## File: src/shared/utils/infoHandler.ts
```typescript
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
```

## File: src/shared/components/Input.tsx
```typescript
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
```

## File: src/shared/services/supabase/supabaseStorage.ts
```typescript
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
```

## File: src/shared/utils/cardAnimations.ts
```typescript
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

    // ponytail: clientX/Y y getBoundingClientRect previene desajustes de scroll/posicionamiento
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

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
```

## File: src/shared/utils/validation.ts
```typescript
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
```

## File: src/types/supabase.ts
```typescript
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
  category: string;
  tags: string[];
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
  items: any[];
  order: number;
  created_at: string;
  updated_at: string;
}

export const STORAGE_BUCKET = 'portfolio-assets';
```

## File: src/types/types.ts
```typescript
import type { CardRow, InfoSectionRow } from './supabase';

export interface CardProps extends Omit<CardRow, 'image_path' | 'button_text' | 'code_url' | 'demo_url' | 'bg_image_path' | 'created_at' | 'updated_at'> {
  img: string;
  buttonText?: string;
  codeUrl?: string;
  demoUrl?: string;
  bgImage?: string;
}

export interface SkillGroup extends Omit<InfoSectionRow, 'section_type' | 'order' | 'created_at' | 'updated_at'> {
  items: string[];
}

export interface CareerItem {
  title: string;
  body: string;
}

export interface CareerGroup extends Omit<InfoSectionRow, 'section_type' | 'order' | 'created_at' | 'updated_at'> {
  items: CareerItem[];
}
```
