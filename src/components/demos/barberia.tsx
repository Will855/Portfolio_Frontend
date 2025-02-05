import React from "react";

const BarberiaPremium: React.FC = () => {
    return (
        <div className="bg-white p-4 sm:p-6 md:p-12 font-sans">
            {/* Nombre del Proyecto */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-gray-700 to-gray-950 bg-clip-text text-transparent">
                Barberia EliteCuts
            </h2>

            {/* Imagen o GIF */}
            <div className="mb-8">
                <p className="text-gray-500 text-sm text-center">
                    Interfaz de reserva - Selección de servicios y barberos
                </p>
            </div>

            {/* Descripción */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                <div className="space-y-4 border-l-4 border-amber-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Qué es</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        Plataforma integral de gestión para barberías premium que combina reserva de citas,
                        selección de servicios en tiempo real y sistema de pagos integrado.
                    </p>
                </div>

                <div className="space-y-4 border-l-4 border-gray-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Diferenciales</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                        <li>Sistema de citas inteligente con recordatorios</li>
                        <li>Cálculo automático de precios en múltiples monedas</li>
                        <li>Perfiles personalizados de barberos con portafolio</li>
                        <li>Integración con métodos de pago locales</li>
                    </ul>
                </div>
            </div>

            {/* Tecnologías */}
            <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Tecnologías
                </h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs sm:text-sm">
                        JavaScript ES6
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs sm:text-sm">
                        Tailwind CSS
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm">
                        Web Storage
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs sm:text-sm">
                        Responsive Design
                    </span>
                </div>
            </div>

            {/* Detalles Técnicos */}
            <div className="border-t pt-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Lógica de Citas
                </h2>
                <div className="bg-black rounded-xl p-4 sm:p-6 overflow-x-auto">
                    <pre className="text-blue-400 text-xs sm:text-sm">
                        <code>
                            {`class CitaBarberia {
  constructor(barbero, servicio, horario) {
    this.barbero = barbero;
    this.servicio = servicio;
    this.horario = horario;
    this.precio = this.calcularPrecio();
  }

  calcularPrecio() {
    const precios = {
      'Corte Clásico': 20,
      'Corte Barba': 15,
      'Completo': 30
    };
    return precios[this.servicio] * 53.85; // Conversión a Bolívares
  }

  generarResumen() {
    return \`\${this.servicio} con \${this.barbero} a las \${this.horario}\`;
  }
}

// Gestión de estado
const gestionarCita = (tipo, valor) => {
  const estadoActual = JSON.parse(localStorage.getItem('cita'));
  const nuevoEstado = { ...estadoActual, [tipo]: valor };
  localStorage.setItem('cita', JSON.stringify(nuevoEstado));
  actualizarUI(nuevoEstado);
};`}
                        </code>
                    </pre>
                </div>
            </div>

            {/* Casos de Uso */}
            <div className="border-t pt-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Flujo Completo
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700">Funcionalidades Clave:</h4>
                        <ul className="list-disc pl-6 text-gray-600 text-sm">
                            <li>Selección interactiva de barberos</li>
                            <li>Visualización de horarios disponibles</li>
                            <li>Cálculo de precios en tiempo real</li>
                            <li>Confirmación por WhatsApp</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700">Optimizaciones:</h4>
                        <ul className="list-disc pl-6 text-gray-600 text-sm">
                            <li>Carga diferida de imágenes</li>
                            <li>Validación de formularios en tiempo real</li>
                            <li>Animaciones CSS personalizadas</li>
                            <li>Almacenamiento local de citas</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarberiaPremium;