'use client';

import React from 'react';
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
  return (
    <div  // Contenedor principal
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