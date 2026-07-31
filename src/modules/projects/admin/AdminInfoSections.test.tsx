import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminInfoSections } from './AdminInfoSections';

// Mock Supabase
const mockDelete = jest.fn().mockReturnThis();
const mockIn = jest.fn().mockResolvedValue({ error: null });
const mockUpdate = jest.fn().mockReturnThis();
const mockEq = jest.fn().mockResolvedValue({ error: null });
const mockInsert = jest.fn().mockResolvedValue({ error: null });

jest.mock('../../../shared/services/supabase/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      delete: mockDelete,
      in: mockIn,
      update: mockUpdate,
      eq: mockEq,
      insert: mockInsert,
    })),
  },
  isSupabaseConfigured: true,
}));

// Mock custom hooks to return empty data initially
jest.mock('../hooks/useInfoSections', () => ({
  useSkillSections: jest.fn(() => ({
    skills: [],
    isLoading: false,
    refetch: jest.fn(),
  })),
  useKnowledgeSections: jest.fn(() => ({
    knowledges: [],
    isLoading: false,
    refetch: jest.fn(),
  })),
}));

const queryClient = new QueryClient();

describe('AdminInfoSections Monolith', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <AdminInfoSections />
      </QueryClientProvider>
    );
  };

  it('renders correctly and shows empty state', () => {
    renderComponent();
    expect(screen.getByText('Secciones de información')).toBeInTheDocument();
    expect(screen.getByText('No hay secciones de este tipo')).toBeInTheDocument();
  });

  it('adds a new section, modifies it and saves', async () => {
    const user = userEvent.setup();
    renderComponent();

    const addSectionBtn = screen.getByRole('button', { name: /Nueva sección/i });
    await user.click(addSectionBtn);

    expect(screen.getByPlaceholderText('Título de la sección')).toBeInTheDocument();
    
    // Modify section title
    const titleInput = screen.getByPlaceholderText('Título de la sección');
    await user.type(titleInput, 'Test Skill Section');
    
    // Modify the first item
    const itemInput = screen.getByPlaceholderText('Habilidad 1');
    await user.type(itemInput, 'React Testing');

    // Save
    const saveBtn = screen.getByRole('button', { name: /Guardar todo/i });
    await user.click(saveBtn);

    await waitFor(() => {
      expect(screen.getByText('Guardado correctamente')).toBeInTheDocument();
    });

    const { supabase } = await import('../../../shared/services/supabase/supabase');
    expect(supabase.from).toHaveBeenCalledWith('info_sections');
    expect(mockInsert).toHaveBeenCalledWith({
      section_type: 'skill',
      title: 'Test Skill Section',
      color: 'blue',
      items: ['React Testing'],
      order: 0,
    });
  });

  it('switches to knowledge tab and adds a section', async () => {
    const user = userEvent.setup();
    renderComponent();

    // Switch tab
    const knowledgeTab = screen.getByRole('button', { name: /Carrera y Experiencia/i });
    await user.click(knowledgeTab);

    const addSectionBtn = screen.getByRole('button', { name: /Nueva sección/i });
    await user.click(addSectionBtn);

    // Enter title
    const titleInput = screen.getByPlaceholderText('Título de la sección');
    await user.type(titleInput, 'Test Knowledge');

    // Enter job title and description
    const jobTitleInput = screen.getByPlaceholderText(/Ej: Programador Senior/i);
    await user.type(jobTitleInput, 'Senior Tester');

    const jobDescInput = screen.getByPlaceholderText(/Logros clave/i);
    await user.type(jobDescInput, 'Tested the monolith');

    // Save
    const saveBtn = screen.getByRole('button', { name: /Guardar todo/i });
    await user.click(saveBtn);

    await waitFor(() => {
      expect(screen.getByText('Guardado correctamente')).toBeInTheDocument();
    });

    expect(mockInsert).toHaveBeenCalledWith({
      section_type: 'knowledge',
      title: 'Test Knowledge',
      color: 'purple',
      items: [{ title: 'Senior Tester', body: 'Tested the monolith' }],
      order: 0,
    });
  });
});
