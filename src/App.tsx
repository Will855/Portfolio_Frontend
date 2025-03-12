import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import  GA4  from 'react-ga4';
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

const GA4_ID = 'G-HL1MY2MS9S'; // Reemplazar con tu Measurement ID

/**
 * Hook personalizado para el tracking analítico de rutas
 * @function useRouteTracker
 * @description Maneja la inicialización de GA4 y el tracking de cambios de ruta
 */
const useRouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    GA4.initialize(GA4_ID);
  }, []);

  useEffect(() => {
    GA4.send({
      hitType: 'pageview',
      page: location.pathname + location.search
    });
  }, [location.pathname, location.search]);
};

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
 * @returns {JSX.Element} Estructura principal de la aplicación con enrutamiento y tracking analítico
 * @description Configura el enrutamiento principal y la estructura común de la aplicación
 * 
 * @example
 * <App /> // Renderiza la aplicación completa con el enrutamiento y analytics configurados
 * 
 * @typedef {Object} RouteConfig
 * @property {string} path - Ruta URL
 * @property {JSX.Element} element - Componente a renderizar
 * 
 * @notes
 * - Usa React Router v6 para el enrutamiento
 * - Incluye tracking de Google Analytics 4 para todas las rutas
 * - Componentes comunes: NavMenu, BackgroundStars, ResponsiveMenu
 * - Maneja rutas estáticas y dinámicas con seguimiento analítico
 * - Proporciona un fallback 404 para rutas no encontradas
 */
function App() {
  useRouteTracker();

  return (
    <Router>
      <NavMenu />
      <BackgroundStars />
      <ResponsiveMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/informacion" element={<Information />} />
        <Route path="/proyectos" element={<Proyects />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/page/:id" element={<CardDetails />} />
        <Route path="/demos/:projectId" element={<ContentHandler />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;