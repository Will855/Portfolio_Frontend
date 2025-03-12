import React, { useRef, useEffect } from "react";
import { CardProps } from "../../types/types";
import { handleMouseMove, resetCardPosition } from "./../utils/cardAnimations";
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
    navigate(`/demos/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
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