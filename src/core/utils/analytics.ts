import GA4 from 'react-ga4';

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

async function sendToN8n(eventType: string, payload: object) {
  if (!N8N_WEBHOOK_URL) return;
  try {
    await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        ...payload,
      }),
    });
  } catch (error) {
    // Fallar silenciosamente para no romper la navegación o experiencia
    console.warn('Analytics webhook failed to send:', error);
  }
}


// Eventos de navegación
export const trackPageView = (path: string) => {
  GA4.send({
    hitType: 'pageview',
    page: path
  });
  sendToN8n('page_view', { path, timestamp: new Date().toISOString() });
};

// Eventos de interacción
export const trackButtonClick = (buttonName: string, buttonLocation: string) => {
  GA4.event({
    category: 'Button Click',
    action: buttonName,
    label: buttonLocation
  });
};

// Eventos de tiempo
export const trackTimeOnPage = (timeInSeconds: number) => {
  GA4.event({
    category: 'Time',
    action: 'Time on Page',
    value: timeInSeconds
  });
};

// Eventos de scroll
export const trackScrollDepth = (depth: number) => {
  GA4.event({
    category: 'Scroll',
    action: 'Scroll Depth',
    value: depth
  });
};

// Eventos de conversión
export const trackConversion = (conversionType: string, value?: number) => {
  GA4.event({
    category: 'Conversion',
    action: conversionType,
    value: value
  });
};

// Eventos de interacción con planes
export const trackPlanInteraction = (planName: string, action: string) => {
  GA4.event({
    category: 'Plan Interaction',
    action: action,
    label: planName
  });
};

// Eventos de contacto
export const trackContactAttempt = (method: string) => {
  GA4.event({
    category: 'Contact',
    action: 'Contact Attempt',
    label: method
  });
  sendToN8n('contact_click', { method });
};

// Eventos de navegación entre secciones
export const trackSectionNavigation = (fromSection: string, toSection: string) => {
  GA4.event({
    category: 'Navigation',
    action: 'Section Change',
    label: `${fromSection} to ${toSection}`
  });
  sendToN8n('section_navigation', { from: fromSection, to: toSection });
};

// Eventos de búsqueda de proyectos
export const trackSearchExecution = (query: string, category: string) => {
  sendToN8n('project_search', { query, category, timestamp: new Date().toISOString() });
}; 