import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GA4 from 'react-ga4';
import NavMenu from "./components/navbar/navMenu";
import Home from './pages/home';
import { Proyects } from './pages/proyects';
import BackgroundStars from './components/animations/backgrounds/StarsBackground';
import ResponsiveMenu from './components/navbar/menuResponsive';
import CardDetails from './components/cards/proyectPage';
import NotFound from './pages/404';
import Demo from './pages/demos';
import { useAnalytics } from './hooks/useAnalytics';
import { trackPageView, trackSectionNavigation } from './utils/analytics';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminHero } from './pages/admin/sections/AdminHero';
import { AdminProjects } from './pages/admin/sections/AdminProjects';
import { AdminContent } from './pages/admin/sections/AdminContent';
import { AdminInfoSections } from './pages/admin/sections/AdminInfoSections';
import { AdminMessages } from './pages/admin/sections/AdminMessages';

const GA4_ID = 'G-HL1MY2MS9S';

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
/**
 * Componente wrapper para manejar el tracking analítico
 * @function RouterWrapper
 * @description Envuelve las rutas y maneja el tracking de navegación
 */
const RouterWrapper = () => {
  const location = useLocation();
  const previousPath = React.useRef(location.pathname);
  
  useAnalytics(); // Implementa el tracking de tiempo y scroll
  
  useEffect(() => {
    GA4.initialize(GA4_ID);
  }, []);

  useEffect(() => {
    // Tracking de vista de página
    trackPageView(location.pathname + location.search);
    
    // Tracking de navegación entre secciones
    if (previousPath.current !== location.pathname) {
      trackSectionNavigation(previousPath.current, location.pathname);
      previousPath.current = location.pathname;
    }
  }, [location.pathname, location.search]);

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && (
        <>
          <NavMenu />
          <BackgroundStars />
          <ResponsiveMenu />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/proyectos" element={<Proyects />} />
        <Route path="/page/:id" element={<CardDetails />} />
        <Route path="/demos/:projectId" element={<Demo />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="hero" element={<AdminHero />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="info" element={<AdminInfoSections />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

/**
 * Componente principal de la aplicación
 * @function App
 * @returns {JSX.Element} Estructura principal de la aplicación
 */
function App() {
  return (
    <Router>
      <RouterWrapper /> {/* Todos los componentes con hooks de routing están dentro de Router */}
    </Router>
  );
}

export default App;