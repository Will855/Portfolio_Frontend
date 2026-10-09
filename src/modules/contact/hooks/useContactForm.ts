import { useState } from 'react';

import { isValidEmail, isValidPhone } from '../../../shared/utils/validation';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ [key in keyof ContactFormData]?: boolean }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (fieldErrors[name as keyof ContactFormData]) {
      setFieldErrors(prev => ({ ...prev, [name]: false }));
    }
    if (error) setError('');
    if (responseMessage) setResponseMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setResponseMessage('');

    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setError('Por favor, completa todos los campos del formulario.');
        setFieldErrors({
          name: !formData.name.trim(),
          email: !formData.email.trim(),
          message: !formData.message.trim()
        });
        setIsSubmitting(false);
        return;
      }

      if (!isValidEmail(formData.email)) {
        setError('Por favor, ingresa un correo electrónico válido.');
        setFieldErrors({ email: true });
        setIsSubmitting(false);
        return;
      }

      if (formData.phone && !isValidPhone(formData.phone)) {
        setError('Por favor, ingresa un número de teléfono válido.');
        setFieldErrors({ phone: true });
        setIsSubmitting(false);
        return;
      }

      // Enviar datos al endpoint protegido
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          message: formData.message.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el mensaje');
      }

      setResponseMessage('¡Formulario enviado con éxito!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error('Error al enviar el mensaje:', err);
      setError(err.message || 'Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, isSubmitting, error, responseMessage, fieldErrors, handleChange, handleSubmit };
};
