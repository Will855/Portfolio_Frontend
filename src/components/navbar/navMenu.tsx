import React, { useState, useEffect } from 'react'; // Importar React y hooks
import { NavLink } from 'react-router-dom'; // Importar NavLink para la navegación

// Componente funcional NavMenu
function NavMenu() {
  const [isScrolled, setIsScrolled] = useState(false); // Estado para verificar si se ha desplazado la página

  useEffect(() => {
    // Función para manejar el evento de desplazamiento
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Cambiar el estado si se ha desplazado más de 10px
    };

    // Agregar el listener de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup: eliminar el listener al desmontar el componente
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Dependencias vacías para ejecutar solo al montar

  // Elementos del menú de navegación
  const navItems = ['Inicio', 'Informacion', 'Proyectos', 'Contacto', 'Planes'];

  return (
    <nav className={`
      fixed top-4 left-1/2 transform -translate-x-1/2 z-50
      max-w-2xl mx-auto px-4
      transition-colors duration-200 ease-in-out
      rounded-full hidden sm:block
      ${isScrolled ? 'bg-gray-200/90 backdrop-blur-sm' : 'bg-transparent'}
    `}>
      <ul className="flex justify-between items-center py-2">
        {navItems.map((item) => (
          <li key={item}>
            <NavLink 
              to={`/${item.toLowerCase()}`} // Enlace a la ruta correspondiente
              className={({ isActive }) => `
                px-4 py-2 mx-2 rounded-full
                text-md md:text-lg font-medium
                transition-colors duration-200
                hover:bg-gray-300/50
                ${isScrolled ? 'text-gray-800' : 'text-white'}
                ${isActive ? 'bg-gray-300/50' : ''}
              `}
            >
              {item} {/* Renderizar el nombre del elemento */}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavMenu;