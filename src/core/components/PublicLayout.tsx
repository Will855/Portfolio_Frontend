import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDataReady } from '../hooks/useAppDataReady';
import { LoadingScreen } from './LoadingScreen';
import NavMenu from './navbar/navMenu';
import BackgroundStars from './StarsBackground';
import ResponsiveMenu from './navbar/menuResponsive';
import Home from '../../pages/Home';
import { Proyects } from '../../modules/projects/pages/ProjectsPage';
import CardDetails from '../../modules/projects/pages/ProjectDetailsPage';
import NotFound from './NotFoundPage';
import Demo from '../../modules/projects/pages/DemosRedirectPage';

/**
 * Layout del sitio público. Muestra pantalla de carga hasta que hero, nav, cards,
 * projects_meta y secciones de información estén cargados desde Supabase.
 */
export const PublicLayout: React.FC = () => {
  const ready = useAppDataReady();

  if (!ready) return <LoadingScreen />;

  return (
    <>
      <NavMenu />
      <BackgroundStars />
      <ResponsiveMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/proyectos" element={<Proyects />} />
        <Route path="/page/:id" element={<CardDetails />} />
        <Route path="/demos/:projectId" element={<Demo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
