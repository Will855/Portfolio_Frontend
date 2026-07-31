import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

// Mock GSAP to prevent animation issues in JSDOM
jest.mock('gsap', () => ({
  default: {
    to: jest.fn(),
    fromTo: jest.fn(),
    timeline: () => ({
      fromTo: jest.fn().mockReturnThis(),
    }),
  },
}));

jest.mock('@gsap/react', () => ({
  useGSAP: (callback: any, dependencies: any[]) => {
    React.useEffect(() => {
      callback();
    }, dependencies || []);
  },
}));

// Mock Supabase
jest.mock('../../../shared/services/supabase/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
    })),
  },
  isSupabaseConfigured: true,
}));

// Mock IonIcon
jest.mock('@reacticons/ionicons', () => ({
  default: () => <div data-testid="ion-icon" />
}));

// Mock Analytics
jest.mock('../../../core/utils/analytics', () => ({
  trackContactAttempt: jest.fn(),
}));

describe('ContactForm Monolith', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar Mensaje/i })).toBeInTheDocument();
  });

  it('shows error when submitting empty fields', async () => {
    render(<ContactForm />);
    const submitBtn = screen.getByRole('button', { name: /Enviar Mensaje/i });
    
    fireEvent.click(submitBtn);
    
    await waitFor(() => {
      expect(screen.getByText('Por favor, completa todos los campos del formulario.')).toBeInTheDocument();
    });
  });

  it('shows error for invalid email', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    await user.type(screen.getByLabelText(/Nombre/i), 'John Doe');
    await user.type(screen.getByLabelText(/Email/i), 'invalid-email');
    await user.type(screen.getByLabelText(/Mensaje/i), 'Hello world!');
    
    const form = screen.getByRole('button', { name: /Enviar Mensaje/i }).closest('form');
    fireEvent.submit(form!);
    
    await waitFor(() => {
      expect(screen.getByText('Por favor, ingresa un correo electrónico válido.')).toBeInTheDocument();
    });
  });

  it('submits successfully when fields are valid', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    await user.type(screen.getByLabelText(/Nombre/i), 'John Doe');
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/Mensaje/i), 'Hello world!');
    
    const submitBtn = screen.getByRole('button', { name: /Enviar Mensaje/i });
    fireEvent.click(submitBtn);
    
    await waitFor(() => {
      expect(screen.getByText('¡Formulario enviado con éxito!')).toBeInTheDocument();
    });
    
    const { supabase } = await import('../../../shared/services/supabase/supabase');
    expect(supabase.from).toHaveBeenCalledWith('contact_submissions');
  });
});
