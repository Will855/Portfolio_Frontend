import { NotesPage } from '../../../modules/notes/pages/NotesPage';
import { Suspense } from 'react';

export const metadata = {
  title: 'Notas y Conocimiento | Wilmer Lynch',
  description: 'Explora mis apuntes técnicos, guías y base de conocimiento sobre desarrollo Full Stack.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#000000]"></div>}>
      <NotesPage />
    </Suspense>
  );
}
