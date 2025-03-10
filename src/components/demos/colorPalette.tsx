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
 * Componente principal generador de paletas de colores
 * @component
 * @description Herramienta profesional para generación y gestión de paletas cromáticas
 * @returns {JSX.Element} Componente React con todas las secciones de funcionalidad
 */
const ColorPaletteGenerator: React.FC = () => {
    return (
        <div className="bg-white p-4 sm:p-6 md:p-12 font-sans">
            {/* Encabezado oculto para SEO */}
            <h1 className="sr-only">Generador de Paletas Cromáticas ChromaGen Pro</h1>

            {/* Título principal */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-purple-700 to-indigo-950 bg-clip-text text-transparent">
                ChromaGen Pro
            </h2>

            {/* Sección de descripción */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                {/* Bloque: Propósito del sistema */}
                <div className="space-y-4 border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Qué es</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        Herramienta profesional para diseñadores que genera 21 tonalidades
                        de cualquier color HEX, con sistema inteligente de copiado y previsualización
                        en tiempo real.
                    </p>
                </div>

                {/* Bloque: Características diferenciadoras */}
                <div className="space-y-4 border-l-4 border-indigo-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Diferenciales</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                        <li>Generación de 10 tintes y 10 sombras + color base</li>
                        <li>Validación en tiempo real de códigos HEX</li>
                        <li>Sistema de notificaciones integrado</li>
                        <li>Diseño responsive con Grid CSS</li>
                    </ul>
                </div>
            </div>

            {/* Sección de tecnologías */}
            <div className="mb-8">
                <SectionHeader>Tecnologías</SectionHeader>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <TechPill colorClass="bg-purple-100 text-purple-800">React 18</TechPill>
                    <TechPill colorClass="bg-indigo-100 text-indigo-800">Values.js</TechPill>
                    <TechPill colorClass="bg-blue-100 text-blue-800">Hooks</TechPill>
                    <TechPill colorClass="bg-gray-100 text-gray-800">Clipboard API</TechPill>
                </div>
            </div>

            {/* Sección de implementación técnica */}
            <div className="border-t pt-6">
                <SectionHeader>Lógica Central</SectionHeader>
                <div className="bg-black rounded-xl p-4 sm:p-6 overflow-x-auto">
                    <pre className="text-blue-400 text-xs sm:text-sm">
                        <code>
                            {`// Generación de tonalidades
const generatePalette = (baseColor) => {
  try {
    const base = new Values(baseColor);
    return [
      ...base.tints(10), // 10 tintes claros
      base,              // Color base
      ...base.shades(10) // 10 sombras oscuras
    ];
  } catch (error) {
    showError('Color inválido');
    return defaultPalette;
  }
};

// Copiado avanzado con feedback
const copyToClipboard = (hex) => {
  navigator.clipboard.writeText(\`#\${hex}\`)
    .then(() => showNotification('¡Copiado!'))
    .catch(() => showNotification('Error al copiar'));
};`}
                        </code>
                    </pre>
                </div>
            </div>

            {/* Sección de casos de uso */}
            <div className="border-t pt-6">
                <SectionHeader>Implementación Clave</SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700">Flujo de trabajo:</h4>
                        <ul className="list-disc pl-6 text-gray-600 text-sm border-l-4 border-purple-300">
                            <li>Validación del color inicial</li>
                            <li>Generación de escala cromática</li>
                            <li>Renderizado optimizado</li>
                            <li>Gestión de errores</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700">Optimizaciones:</h4>
                        <ul className="list-disc pl-6 text-gray-600 text-sm border-l-indigo-800 border-l-4">
                            <li>Memoización de componentes</li>
                            <li>Debounce en entradas</li>
                            <li>Web Workers para cálculos</li>
                            <li>Lazy loading de imágenes</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ColorPaletteGenerator);