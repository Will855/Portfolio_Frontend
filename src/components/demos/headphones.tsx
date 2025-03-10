import React from "react";

/**
 * Componente reutilizable para encabezados de sección
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido del encabezado
 */
const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
    {children}
  </h2>
);

/**
 * Componente para mostrar tecnologías en formato de píldora
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.colorClass - Clases de Tailwind para el color
 * @param {React.ReactNode} props.children - Contenido de la píldora
 */
const TechPill: React.FC<{ colorClass: string; children: React.ReactNode }> = ({
  colorClass,
  children
}) => (
  <span className={`px-3 py-1 rounded-full text-xs sm:text-sm ${colorClass}`}>
    {children}
  </span>
);

/**
 * Componente principal para la landing page de auriculares
 * @component
 * @description Página interactiva con visualizador 3D y personalización en tiempo real
 * @returns {JSX.Element} Componente React con todas las secciones técnicas
 */
const HeadPhones: React.FC = () => {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-12 font-sans">
      {/* Encabezado oculto para SEO */}
      <h1 className="sr-only">Landing page interactiva para HP Headphones</h1>

      {/* Título principal */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-gray-700 to-gray-950 bg-clip-text text-transparent">
        HP Headphones
      </h2>

      {/* Descripción del producto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
        {/* Bloque: Propósito del sistema */}
        <div className="space-y-4 border-l-4 border-green-500 pl-4">
          <h3 className="text-lg sm:text-xl font-semibold">Qué es</h3>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Landing page interactiva para auriculares premium con visualizador 3D
            dinámico y personalización en tiempo real.
          </p>
        </div>

        {/* Bloque: Características diferenciadoras */}
        <div className="space-y-4 border-l-4 border-blue-500 pl-4">
          <h3 className="text-lg sm:text-xl font-semibold">Diferenciales</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
            <li>Sistema de cambio de color en tiempo real</li>
            <li>Animaciones coordinadas con GSAP</li>
            <li>Diseño mobile-first</li>
            <li>Renderizado 3D optimizado</li>
            <li>Interacción táctil completa</li>
          </ul>
        </div>
      </div>

      {/* Sección de tecnologías */}
      <div className="mb-8">
        <SectionHeader>Tecnologías</SectionHeader>
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          <TechPill colorClass="bg-green-100 text-green-800">HTML5</TechPill>
          <TechPill colorClass="bg-blue-100 text-blue-800">CSS3</TechPill>
          <TechPill colorClass="bg-yellow-100 text-yellow-800">JavaScript</TechPill>
          <TechPill colorClass="bg-gray-100 text-gray-800">GSAP</TechPill>
        </div>
      </div>

      {/* Sección de implementación técnica */}
      <div className="border-t pt-6">
        <SectionHeader>Implementación Responsive</SectionHeader>
        <div className="bg-black rounded-xl p-4 sm:p-6 overflow-x-auto">
          <pre className="text-blue-400 text-xs sm:text-sm">
            <code>
              {`/* Estrategia Mobile-First */
@media (max-width: 768px) {
  .content h1 { 
    font-size: 2.5rem;
    line-height: 1.2;
  }
  
  .product-viewer {
    width: 100%;
    height: 300px;
  }
  
  .color-picker {
    grid-template-columns: repeat(3, 1fr);
  }
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HeadPhones);