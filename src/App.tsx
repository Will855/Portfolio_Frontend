import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import NavMenu from "./components/navbar/navMenu";
import Home  from './pages/home';
import Information from './pages/information';
import { Proyects } from './pages/proyects';
import { Contact } from './pages/contact';
import BackgroundStars from './components/animations/backgrounds/bgStars';
import BackgroundNodes from './components/animations/backgrounds/bgNodes';
import ResponsiveMenu from './components/navbar/menuResponsive';
import CardDetails from './components/cards/proyectPage';
import NotFound from './pages/404';
import { projects } from './config/project';

// Componente manejador de demos
const ContentHandler = () => {
  const { projectId } = useParams();
  const project = projects.find(p => p.id === projectId);

  return project?.content ? 
    <project.content /> : 
    <NotFound />;
};

function App() {
  return (
    <Router>
      <NavMenu />
      <BackgroundNodes />
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