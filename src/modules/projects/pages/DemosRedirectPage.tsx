import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { projectIds } from "../config/project";

/**
 * Redirige /demos/:projectId a /page/:id.
 * Los proyectos ya no tienen contenido embebido; el contenido viene de Supabase (project_content).
 */
const Demo: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  if (projectId && projectIds.includes(projectId)) {
    return <Navigate to={`/page/${projectId}`} replace />;
  }
  return <Navigate to="/proyectos" replace />;
};

export default Demo;
