'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useGithubNotesTree, useGithubNoteContent } from '../hooks/useGithubNotes';
import { MarkdownRenderer } from '../../../shared/components/MarkdownRenderer';
import Footer from '../../../core/components/footer/Footer';

export const NotesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const currentPath = searchParams.get('path') || '';
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  // Si el path termina en .md, es un archivo. Si no, asumimos que es una carpeta.
  const isFile = currentPath.endsWith('.md');
  
  // Calcular el folderPath (si es archivo, quitamos el nombre del archivo para pedir la carpeta)
  const pathParts = currentPath.split('/').filter(Boolean);
  const folderPath = isFile ? pathParts.slice(0, -1).join('/') : currentPath;

  const { data: tree, isLoading: treeLoading, error: treeError } = useGithubNotesTree(folderPath);
  const { data: content, isLoading: contentLoading } = useGithubNoteContent(isFile ? currentPath : '');

  // Render principal del contenido
  const MainContent = (
    <div className="relative w-full h-full">
      {!isFile ? (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-4 pt-10">
          <span className="text-6xl" role="img" aria-label="Directorio">📂</span>
          <div>
            <h2 className="text-xl text-slate-200 font-semibold mb-2">Base de conocimiento</h2>
            <p>Selecciona un apunte del menú lateral para explorar mi base de conocimiento técnica.</p>
          </div>
        </div>
      ) : contentLoading ? (
        <div className="flex items-center justify-center h-full min-h-[300px]">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : content ? (
        <div className="prose prose-invert prose-blue max-w-none break-words pt-4">
          <MarkdownRenderer markdown={content} />
        </div>
      ) : (
        <p className="text-red-400 pt-10">Error al cargar el documento.</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-12 bg-[#000000] text-slate-200">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col md:flex-row gap-8 relative">
        
        {/* Sidebar: Explorador de Archivos */}
        <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
          <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 sticky top-28">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent flex items-center gap-2">
              <span className="text-xl" role="img" aria-label="Conocimiento">📚</span>
              Conocimiento
            </h3>
            
            {/* Botón para subir un nivel si estamos en una subcarpeta */}
            {folderPath !== '' && (
              <Link 
                href={`/notas?path=${pathParts.slice(0, isFile ? -2 : -1).join('/')}`}
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4 transition-colors"
              >
                <span className="text-sm" role="img" aria-label="Atrás">⬅️</span>
                Atrás
              </Link>
            )}

            {treeLoading ? (
              <div className="animate-pulse flex flex-col gap-3">
                {[1,2,3,4].map(i => <div key={i} className="h-5 bg-white/10 rounded w-full"></div>)}
              </div>
            ) : treeError ? (
              <p className="text-red-400 text-sm">Repositorio no encontrado o privado.</p>
            ) : (
              <ul className="space-y-2">
                {tree?.map((node) => {
                  const nodeUrl = `/notas?path=${node.path}`;
                  const isActive = currentPath === node.path;
                  
                  return (
                    <li key={node.path}>
                      <Link 
                        href={nodeUrl}
                        className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-blue-500/20 text-blue-300 font-medium' 
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {node.type === 'dir' ? (
                          <span className="text-base" role="img" aria-label="Carpeta">📁</span>
                        ) : (
                          <span className="text-base" role="img" aria-label="Archivo">📄</span>
                        )}
                        <span className="truncate flex-1">{node.name.replace('.md', '')}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>

        {/* Main Content: Vista normal */}
        <main className="flex-1 min-w-0 bg-slate-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl min-h-[600px] overflow-x-auto relative">
          {!isExpanded && MainContent}
        </main>
      </div>

      {/* Overlay: Vista Expandida (100vh) */}
      {isExpanded && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md p-4 sm:p-8 flex justify-center items-start overflow-y-auto">
          <div className="w-full max-w-7xl bg-slate-900/90 border border-white/10 rounded-2xl p-6 sm:p-12 shadow-2xl relative mt-2 sm:mt-4 mb-8 min-h-[90vh]">
            {MainContent}
          </div>
        </div>
      )}
      
      <div className="mt-16 w-full">
        <Footer />
      </div>
    </div>
  );
};
