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
  
  // Si el path termina en .md, es un archivo. Si no, asumimos que es una carpeta.
  const isFile = currentPath.endsWith('.md');
  
  // Calcular el folderPath (si es archivo, quitamos el nombre del archivo para pedir la carpeta)
  const pathParts = currentPath.split('/').filter(Boolean);
  const folderPath = isFile ? pathParts.slice(0, -1).join('/') : currentPath;

  const { data: tree, isLoading: treeLoading, error: treeError } = useGithubNotesTree(folderPath);
  const { data: content, isLoading: contentLoading } = useGithubNoteContent(isFile ? currentPath : '');

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-12 bg-[#000000] text-slate-200">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar: Explorador de Archivos */}
        <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
          <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 sticky top-28">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Conocimiento
            </h3>
            
            {/* Botón para subir un nivel si estamos en una subcarpeta */}
            {folderPath !== '' && (
              <Link 
                href={`/notas?path=${pathParts.slice(0, isFile ? -2 : -1).join('/')}`}
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
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
                          <svg className="w-4 h-4 text-purple-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        <span className="truncate">{node.name.replace('.md', '')}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>

        {/* Main Content: Markdown */}
        <main className="flex-1 bg-slate-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl min-h-[600px] overflow-hidden">
          {!isFile ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
              <svg className="w-16 h-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              <div>
                <h2 className="text-xl text-slate-200 font-semibold mb-2">Base de conocimiento</h2>
                <p>Selecciona un apunte del menú lateral para explorar mi base de conocimiento técnica.</p>
              </div>
            </div>
          ) : contentLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : content ? (
            <div className="prose prose-invert prose-blue max-w-none overflow-x-auto break-words">
              <MarkdownRenderer content={content} />
            </div>
          ) : (
            <p className="text-red-400">Error al cargar el documento.</p>
          )}
        </main>

      </div>
      
      <div className="mt-16 w-full">
        <Footer />
      </div>
    </div>
  );
};
