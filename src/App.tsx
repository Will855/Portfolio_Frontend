import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import NavMenu from "./components/navbar/navMenu";
import Home from './pages/home';
import Information from './pages/information';
import { Proyects } from './pages/proyects';
import { Contact } from './pages/contact';
import BackgroundStars from './components/animations/backgrounds/bgStars';
import ResponsiveMenu from './components/navbar/menuResponsive';
import CardDetails from './components/cards/proyectPage';
import NotFound from './pages/404';
import { projects } from './config/project';

/**
 * Componente para manejar la carga dinámica de contenido de proyectos
 * @function ContentHandler
 * @returns {JSX.Element} Componente del proyecto o página 404
 * @description Maneja la carga dinámica de contenido basado en el parámetro de URL
 */
const ContentHandler = () => {
  const { projectId } = useParams();
  const project = projects.find(p => p.id === projectId);

  return project?.content ?
    <project.content /> :
    <NotFound />;
};

/**
 * Componente principal de la aplicación
 * @function App
 * @returns {JSX.Element} Estructura principal de la aplicación con enrutamiento
 * @description Configura el enrutamiento principal y la estructura común de la aplicación
 * 
 * @example
 * <App /> // Renderiza la aplicación completa con el enrutamiento configurado
 * 
 * @typedef {Object} RouteConfig
 * @property {string} path - Ruta URL
 * @property {JSX.Element} element - Componente a renderizar
 * 
 * @notes
 * - Usa React Router v6 para el enrutamiento
 * - Incluye componentes comunes en todas las rutas (NavMenu, BackgroundStars)
 * - Maneja rutas estáticas y dinámicas (/demos/:projectId, /page/:id)
 * - Proporciona un fallback 404 para rutas no encontradas
 */
function App() {
  return (
    <Router>
      <NavMenu />
      <BackgroundStars />
      <ResponsiveMenu />
      <Routes>
        {/* Ruta principal y alternativa */}
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />

        {/* Rutas estáticas */}
        <Route path="/informacion" element={<Information />} />
        <Route path="/proyectos" element={<Proyects />} />
        <Route path="/contacto" element={<Contact />} />

        {/* Rutas dinámicas */}
        <Route path="/page/:id" element={<CardDetails />} />
        <Route path="/demos/:projectId" element={<ContentHandler />} />

        {/* Ruta catch-all para 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;