import GA4 from 'react-ga4';

// Eventos de navegación
export const trackPageView = (path: string) => {
  GA4.send({
    hitType: 'pageview',
    page: path
  });
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
};

// Eventos de navegación entre secciones
export const trackSectionNavigation = (fromSection: string, toSection: string) => {
  GA4.event({
    category: 'Navigation',
    action: 'Section Change',
    label: `${fromSection} to ${toSection}`
  });
}; 