import React from "react";

const BarberiaPremium: React.FC = () => {
    return (
        <div className="bg-white p-4 sm:p-6 md:p-12 font-sans">
            {/* Nombre del Proyecto */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-gray-700 to-gray-950 bg-clip-text text-transparent">
                GM Studio Barbería
            </h2>

            {/* Imagen o GIF */}
            <div className="mb-8">
                <p className="text-gray-500 text-sm text-center">
                    Interfaz completa - Desde selección de barbero hasta confirmación de pago
                </p>
            </div>

            {/* Descripción */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                <div className="space-y-4 border-l-4 border-amber-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Qué es</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        Plataforma web moderna para gestión integral de barberías que combina reserva de citas,
                        selección de servicios en tiempo real, gestión de pagos y seguimiento de clientes.
                        Sistema 100% responsive con enfoque en experiencia de usuario y conversiones.
                    </p>
                </div>

                <div className="space-y-4 border-l-4 border-gray-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Diferenciales</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                        <li>Conversión automática USD/Bs. con tasa actualizada</li>
                        <li>Selección interactiva de barberos con portafolio</li>
                        <li>Validación en tiempo real de datos y horarios</li>
                        <li>Integración con APIs de pago seguras</li>
                        <li>Sistema de notificaciones integrado</li>
                    </ul>
                </div>
            </div>

            {/* Tecnologías */}
            <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Tecnologías Clave
                </h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs sm:text-sm">
                        Javascript
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs sm:text-sm">
                        Tailwind CSS
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm">
                        LocalStorage API
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs sm:text-sm">
                        Responsive Design
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs sm:text-sm">
                        Google Fonts
                    </span>
                </div>
            </div>

            {/* Detalles Técnicos */}
            <div className="border-t pt-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Lógica de Citas Mejorada
                </h2>
                <div className="bg-black rounded-xl p-4 sm:p-6 overflow-x-auto">
                    <pre className="text-blue-400 text-xs sm:text-sm">
                        <code>
                            {`class CitaBarberia {
  constructor(barbero, servicio, horario) {
    this.barbero = barbero;
    this.servicio = servicio;
    this.horario = this.formatearHora(horario);
    this.precio = this.calcularPrecio();
  }

  formatearHora(hora) {
    const hora12 = hora % 12 === 0 ? 12 : hora % 12;
    return \`\${hora12}:00 \${hora >= 12 ? 'PM' : 'AM'}\`;
  }

  calcularPrecio() {
    const precios = {
      'Clásico': 300,
      'Premium': 500,
      'Completo': 700
    };
    return {
      USD: precios[this.servicio],
      Bs: (precios[this.servicio] * 53.85).toFixed(2)
    };
  }

  validarTelefono(telefono) {
    return /^04\\d{9}$/.test(telefono);
  }
}

// Gestión de estado segura
const gestionarCita = (tipo, valor) => {
  try {
    const estadoActual = JSON.parse(localStorage.getItem('cita')) || {};
    const nuevoEstado = { ...estadoActual, [tipo]: valor };
    
    if(nuevoEstado.telefono && !validarTelefono(nuevoEstado.telefono)) {
      throw new Error('Formato de teléfono inválido');
    }
    
    localStorage.setItem('cita', JSON.stringify(nuevoEstado));
    actualizarUI(nuevoEstado);
  } catch (error) {
    mostrarError(error.message);
  }
};`}
                        </code>
                    </pre>
                </div>
            </div>

            {/* Casos de Uso */}
            <div className="border-t pt-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Flujo Completo Optimizado
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700">Funcionalidades Clave:</h4>
                        <ul className="list-disc pl-6 text-gray-600 text-sm border-l-4 border-orange-300">
                            <li>Selección interactiva de barberos con especialidades</li>
                            <li>Generación dinámica de horarios disponibles</li>
                            <li>Conversión monetaria en tiempo real</li>
                            <li>Integración con APIs de pago seguras</li>
                            <li>Validación de datos en cliente y servidor</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700">Optimizaciones:</h4>
                        <ul className="list-disc pl-6 text-gray-600 text-sm border-l-yellow-800 border-l-4">
                            <li>Lazy loading para imágenes de barberos</li>
                            <li>Animaciones CSS con cubic-bezier</li>
                            <li>Persistencia de estado con Web Storage</li>
                            <li>Manejo de errores en tiempo real</li>
                            <li>Sanitización de inputs de usuario</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarberiaPremium;