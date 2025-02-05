import React from "react";

const ColorPaletteGenerator: React.FC = () => {
    return (
        <div className="bg-white p-4 sm:p-6 md:p-12 font-sans">
            {/* Nombre del Proyecto */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-purple-700 to-indigo-950 bg-clip-text text-transparent">
                ChromaGen Pro
            </h2>

            {/* Imagen o GIF */}
            <div className="mb-8">
                <p className="text-gray-500 text-sm text-center">
                    Demo interactivo - Generación y copiado de tonalidades
                </p>
            </div>

            {/* Descripción */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                <div className="space-y-4 border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Qué es</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        Herramienta profesional para diseñadores que genera 21 tonalidades
                        de cualquier color HEX, con sistema inteligente de copiado y previsualización
                        en tiempo real.
                    </p>
                </div>

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

            {/* Tecnologías */}
            <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Tecnologías
                </h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs sm:text-sm">
                        React 18
                    </span>
                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs sm:text-sm">
                        Values.js
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm">
                        Hooks
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs sm:text-sm">
                        Clipboard API
                    </span>
                </div>
            </div>

            {/* Detalles Técnicos */}
            <div className="border-t pt-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Lógica Central
                </h2>
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

            {/* Casos de Uso */}
            <div className="border-t pt-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Implementación Clave
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700">Flujo de trabajo:</h4>
                        <ul className="list-disc pl-6 text-gray-600 text-sm">
                            <li>Validación del color inicial</li>
                            <li>Generación de escala cromática</li>
                            <li>Renderizado optimizado</li>
                            <li>Gestión de errores</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700">Optimizaciones:</h4>
                        <ul className="list-disc pl-6 text-gray-600 text-sm">
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

export default ColorPaletteGenerator;