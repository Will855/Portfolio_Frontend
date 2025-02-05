import React from "react";

const HeadPhones: React.FC = () => {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-12 font-sans">
      {/* Nombre del Proyecto */}
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-gray-700 to-gray-950 bg-clip-text text-transparent"
      >
        HP Headphones
      </h2>

      {/* Imagen o GIF */}
      <div className="mb-8">
        <p className="text-gray-500 text-sm text-center">
          Demo interactivo - Cambio de colores y animaciones
        </p>
      </div>

      {/* Descripción */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
        <div className="space-y-4 border-l-4 border-green-500 pl-4">
          <h3 className="text-lg sm:text-xl font-semibold">Qué es</h3>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Landing page interactiva para auriculares premium con visualizador 3D
            dinámico y personalización en tiempo real.
          </p>
        </div>

        <div className="space-y-4 border-l-4 border-blue-500 pl-4">
          <h3 className="text-lg sm:text-xl font-semibold">Diferenciales</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
            <li>Sistema de cambio de color en tiempo real</li>
            <li>Animaciones coordinadas con GSAP</li>
            <li>Diseño mobile-first</li>
          </ul>
        </div>
      </div>

      {/* Tecnologías */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
          Tecnologías
        </h2>
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          <span
            className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs sm:text-sm"
          >
            HTML5
          </span>
          <span
            className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm"
          >
            CSS3
          </span>
          <span
            className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs sm:text-sm"
          >
            JavaScript
          </span>
          <span
            className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs sm:text-sm"
          >
            GSAP
          </span>
        </div>
      </div>

      {/* Detalles Técnicos */}
      <div className="border-t pt-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
          Implementación Responsive
        </h2>
        <div className="bg-black rounded-xl p-4 sm:p-6 overflow-x-auto">
          <pre className="text-blue-400 text-xs sm:text-sm">
            <code>
              {`/* Mobile First */
@media (max-width: 768px) {
    .content h1 { font-size: 4em; }
    img { 
        transform: rotate(0deg);
        width: 80%; 
    }
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HeadPhones;