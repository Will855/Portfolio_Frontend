// Importación de React
import React from 'react';

// Componente Input
// Este componente es reutilizable y se utiliza para crear campos de entrada con etiquetas asociadas.
const Input = ({ label, name, type, placeholder, onChange }) => (
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