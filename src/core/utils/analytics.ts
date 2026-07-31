const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '';

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
  sendToN8n('page_view', { path, timestamp: new Date().toISOString() });
};

// Eventos de interacción
export const trackButtonClick = (buttonName: string, buttonLocation: string) => {
  sendToN8n('button_click', { buttonName, buttonLocation });
};

// Eventos de tiempo
export const trackTimeOnPage = (timeInSeconds: number) => {
  sendToN8n('time_on_page', { timeInSeconds });
};

// Eventos de scroll
export const trackScrollDepth = (depth: number) => {
  sendToN8n('scroll_depth', { depth });
};

// Eventos de conversión
export const trackConversion = (conversionType: string, value?: number) => {
  sendToN8n('conversion', { conversionType, value });
};

// Eventos de interacción con planes
export const trackPlanInteraction = (planName: string, action: string) => {
  sendToN8n('plan_interaction', { planName, action });
};

// Eventos de contacto
export const trackContactAttempt = (method: string) => {
  sendToN8n('contact_click', { method });
};

// Eventos de navegación entre secciones
export const trackSectionNavigation = (fromSection: string, toSection: string) => {
  sendToN8n('section_navigation', { from: fromSection, to: toSection });
};

// Eventos de búsqueda de proyectos
export const trackSearchExecution = (query: string, category: string) => {
  sendToN8n('project_search', { query, category, timestamp: new Date().toISOString() });
}; 