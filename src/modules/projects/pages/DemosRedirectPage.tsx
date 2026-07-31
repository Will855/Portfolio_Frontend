'use client';

import React from "react";
import { useParams, redirect } from "next/navigation";
import { projectIds } from "../config/project";

/**
 * Redirige /demos/:projectId a /page/:id.
 * Los proyectos ya no tienen contenido embebido; el contenido viene de Supabase (project_content).
 */
const Demo: React.FC = () => {
  const params = useParams();
  const projectId = params?.projectId as string;
  if (projectId && projectIds.includes(projectId)) {
    redirect(`/page/${projectId}`);
  }
  redirect("/proyectos");
  return null;
};

export default Demo;
