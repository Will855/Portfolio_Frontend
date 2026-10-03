"use client";

import React, { useState } from 'react';
import { useSkillSections, useKnowledgeSections } from '../hooks/useInfoSections';
import { MarkdownRenderer } from '../../../shared/components/MarkdownRenderer';
import { Input } from '../../../shared/components/Input';
import { Textarea } from '../../../shared/components/Textarea';
import { useAdminSectionsEditor, SectionType, ColorOption } from './hooks/useAdminSectionsEditor';

const COLOR_OPTIONS: { value: ColorOption; label: string; cls: string }[] = [
  { value: 'blue', label: 'Azul', cls: 'bg-blue-400' },
  { value: 'purple', label: 'Morado', cls: 'bg-purple-400' },
  { value: 'green', label: 'Verde', cls: 'bg-green-400' },
];

export const AdminInfoSections: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SectionType>('skill');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white">Secciones de información</h2>
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-300">
            <strong>Habilidades:</strong> Tarjetas compactas que se muestran en la sección &quot;Información&quot; del home.
            <br />
            <strong>Carrera y Experiencia:</strong> Trayectorias o hitos de tu carrera profesional en &quot;Carrera y Experiencia&quot;.
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('skill')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'skill'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
              : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          Habilidades
        </button>
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'knowledge'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
              : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          Carrera y Experiencia
        </button>
      </div>

      <SectionEditor key={activeTab} sectionType={activeTab} />
    </div>
  );
};

const SectionEditor: React.FC<{ sectionType: SectionType }> = ({ sectionType }) => {
  const { skills, isLoading: skillsLoading, refetch: refetchSkills } = useSkillSections();
  const { knowledges, isLoading: knowledgesLoading, refetch: refetchKnowledges } = useKnowledgeSections();

  const sourceData = sectionType === 'skill' ? skills : knowledges;
  const isLoading = sectionType === 'skill' ? skillsLoading : knowledgesLoading;
  const refetch = sectionType === 'skill' ? refetchSkills : refetchKnowledges;

  const {
    sections,
    saving,
    error,
    success,
    addSection,
    removeSection,
    moveSection,
    updateSection,
    addItem,
    updateItem,
    removeItem,
    saveAll
  } = useAdminSectionsEditor(sectionType, sourceData as any, isLoading, refetch);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-slate-400">Cargando secciones...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
      )}
      {success && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">{success}</div>
      )}

      {sections.length === 0 && (
        <div className="text-center py-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <p className="text-slate-400">No hay secciones de este tipo</p>
          <p className="text-slate-500 text-sm mt-1">Crea una nueva sección para empezar</p>
        </div>
      )}

      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div
            key={section.id ?? `new-${idx}`}
            className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
          >
            {/* Section header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
              <div className={`w-3 h-3 rounded-full ${COLOR_OPTIONS.find(c => c.value === section.color)?.cls ?? 'bg-blue-400'}`} />
              <span className="text-sm font-medium text-white truncate flex-1">
                {section.title || '(sin título)'}
              </span>
              <span className="text-xs text-slate-500">#{idx + 1}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveSection(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Subir"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => moveSection(idx, 'down')}
                  disabled={idx === sections.length - 1}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Bajar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => removeSection(idx)}
                  className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  title="Eliminar sección"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Section body */}
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                <Input
                  label="Título de la sección"
                  name={`title-${idx}`}
                  value={section.title}
                  onChange={(e) => updateSection(idx, { title: e.target.value })}
                  placeholder="Título de la sección"
                  animate={false}
                />
                <div className="space-y-1.5 mb-[1.4rem]">
                  <label className="block text-slate-200 font-medium mb-2">Color</label>
                  <div className="flex gap-2">
                    {COLOR_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => updateSection(idx, { color: opt.value })}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          section.color === opt.value
                            ? 'bg-white/15 text-white border border-white/20'
                            : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
                        }`}
                      >
                        <div className={`w-2.5 h-2.5 rounded-full ${opt.cls}`} />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Items list */}
              <div className="space-y-3">
                <label className="block text-slate-200 font-medium">
                  {sectionType === 'skill' ? 'Habilidades (Elementos)' : 'Carrera y Experiencia (Hitos)'}
                </label>
                
                {sectionType === 'skill' ? (
                  <div className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex gap-2 items-center">
                        <span className="text-xs text-slate-500 w-5 text-right shrink-0">{itemIdx + 1}.</span>
                        <div className="flex-1">
                          <Input
                            label=""
                            name={`item-${idx}-${itemIdx}`}
                            value={item as string}
                            onChange={(e) => updateItem(idx, itemIdx, e.target.value)}
                            placeholder={`Habilidad ${itemIdx + 1}`}
                            animate={false}
                          />
                        </div>
                        <button
                          onClick={() => removeItem(idx, itemIdx)}
                          disabled={section.items.length <= 1}
                          className="p-1 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0 -mt-2"
                          title="Eliminar elemento"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(section.items as { title: string; body: string }[]).map((item, itemIdx) => (
                      <div key={itemIdx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3 relative group/item">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-slate-400 font-semibold">Hito / Puesto #{itemIdx + 1}</span>
                          <button
                            onClick={() => removeItem(idx, itemIdx)}
                            disabled={section.items.length <= 1}
                            className="p-1 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
                            title="Eliminar elemento"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <Input
                          label="Puesto / Título *"
                          name={`job-title-${idx}-${itemIdx}`}
                          value={item.title || ''}
                          onChange={(e) => updateItem(idx, itemIdx, { ...item, title: e.target.value })}
                          placeholder="Ej: Programador Senior, Certificación AWS, etc."
                          animate={false}
                        />
                        
                        <Textarea
                          label="Cuerpo / Descripción de Logros *"
                          name={`job-body-${idx}-${itemIdx}`}
                          value={item.body || ''}
                          onChange={(e) => updateItem(idx, itemIdx, { ...item, body: e.target.value })}
                          placeholder="Logros clave, tecnologías usadas, responsabilidades..."
                          rows={3}
                          animate={false}
                        />
                        
                        {item.body && (
                          <div className="mt-1.5 p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300">
                            <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Vista Previa (Markdown)</span>
                            <div className="prose prose-invert prose-xs max-w-none font-sans">
                              <MarkdownRenderer markdown={item.body} />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <button
                  onClick={() => addItem(idx)}
                  className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors mt-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  {sectionType === 'skill' ? 'Agregar habilidad' : 'Agregar experiencia'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={addSection}
          className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nueva sección
        </button>
        <button
          onClick={saveAll}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center gap-2 w-fit"
        >
          {saving && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {saving ? 'Guardando...' : 'Guardar todo'}
        </button>
      </div>
    </div>
  );
};
