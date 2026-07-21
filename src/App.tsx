import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GA4 from 'react-ga4';
import { useAnalytics } from './core/hooks/useAnalytics';
import { trackPageView, trackSectionNavigation } from './core/utils/analytics';
import { PublicLayout } from './core/components/PublicLayout';
import { AdminLogin } from './modules/auth/pages/AdminLogin';
import { AdminLayout } from './core/components/admin/AdminLayout';
import { AdminDashboard } from './core/components/admin/AdminDashboard';
import { AdminHero } from './modules/profile/admin/AdminHero';
import { AdminProjects } from './modules/projects/admin/AdminProjectsCRUD';
import { AdminContent } from './modules/projects/admin/AdminContentEditor';
import { AdminInfoSections } from './modules/projects/admin/AdminInfoSections';
import { AdminCertificates } from './modules/projects/admin/AdminCertificates';
import { AdminMessages } from './modules/contact/admin/AdminMessages';

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

  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="hero" element={<AdminHero />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="content" element={<AdminContent />} />
        <Route path="info" element={<AdminInfoSections />} />
        <Route path="certificates" element={<AdminCertificates />} />
        <Route path="messages" element={<AdminMessages />} />
      </Route>
      <Route path="*" element={<PublicLayout />} />
    </Routes>
  );
};

/**
 * Componente principal de la aplicación
 * @function App
 * @returns {JSX.Element} Estructura principal de la aplicación
 */
function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <RouterWrapper /> {/* Todos los componentes con hooks de routing están dentro de Router */}
    </Router>
  );
}

export default App;