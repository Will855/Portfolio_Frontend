'use client';

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { projectIds } from "../config/project";

/**
 * Redirige /demos/:projectId a /page/:id.
 * Los proyectos ya no tienen contenido embebido; el contenido viene de Supabase (project_content).
 */
const Demo: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.projectId as string;

  useEffect(() => {
    if (projectId && projectIds.includes(projectId)) {
      router.replace(`/page/${projectId}`);
    } else {
      router.replace("/proyectos");
    }
  }, [projectId, router]);

  return null;
};

export default Demo;
