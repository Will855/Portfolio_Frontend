import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../config/supabase';
import { useContentBlock } from '../../../hooks/useContentBlock';

const BLOCK_KEYS = [
  { key: 'nav_items', label: 'Nav (ítems)', type: 'json' as const },
  { key: 'about_skills', label: 'About - Skills (JSON)', type: 'json' as const },
  { key: 'about_technologies', label: 'About - Tecnologías (JSON)', type: 'json' as const },
  { key: 'footer_contact', label: 'Footer - Contacto (HTML)', type: 'html' as const },
];

export const AdminContent: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string | null>('nav_items');
  const blockConfig = BLOCK_KEYS.find((b) => b.key === activeKey);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Contenido</h2>
      <div className="flex gap-2 flex-wrap">
        {BLOCK_KEYS.map((b) => (
          <button
            key={b.key}
            onClick={() => setActiveKey(b.key)}
            className={`px-3 py-2 rounded ${activeKey === b.key ? 'bg-slate-700' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            {b.label}
          </button>
        ))}
      </div>
      {blockConfig && <BlockEditor key={blockConfig.key} blockKey={blockConfig.key} type={blockConfig.type} />}
    </div>
  );
};

const BlockEditor: React.FC<{ blockKey: string; type: 'json' | 'html' }> = ({ blockKey, type }) => {
  const { block, isLoading } = useContentBlock(blockKey);
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    setContent(block?.content ?? '');
  }, [blockKey, block?.content]);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from('content_blocks').upsert(
      { key: blockKey, content, type, updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    );
    if (!error) queryClient.invalidateQueries({ queryKey: ['content_block', blockKey] });
    setSaving(false);
  };

  if (isLoading && content === '' && !block) {
    return <p className="text-slate-400">Cargando bloque...</p>;
  }

  return (
    <div className="space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full min-h-[200px] px-3 py-2 rounded bg-slate-800 border border-slate-600 font-mono text-sm"
        placeholder={type === 'json' ? '["Item1","Item2"]' : '<p>Contenido HTML</p>'}
      />
      <button onClick={save} disabled={saving} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50">
        {saving ? 'Guardando...' : 'Guardar'}
      </button>
    </div>
  );
};
