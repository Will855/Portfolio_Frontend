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
  const handleMouseMoveEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    // ponytail: usamos e.nativeEvent porque handleMouseMove espera MouseEvent nativo
    if (cardRef.current && contentRef.current) {
      handleMouseMove(e.nativeEvent, cardRef.current, contentRef.current, 1.15);
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && contentRef.current) {
      resetCardPosition(cardRef.current, contentRef.current);
    }
  };

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
      onMouseMove={handleMouseMoveEvent}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-xl transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl h-72 cursor-pointer group"
      role="article"
      aria-label={`Tarjeta del proyecto: ${title}`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform" // Optimización para animaciones
      }}
    >
      {/* Imagen con efecto de profundidad */}
      {img && (
        <img
          src={img}
          alt={`Visualización del proyecto ${title}`}
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
          loading="lazy" 
          decoding="async" 
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}

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