/**
 * @file useAnalytics.ts
 * @description Hook que activa el tracking de analytics en la página actual:
 * tiempo en página (cada 30s y al desmontar) y profundidad de scroll (porcentaje máximo).
 * Delega en utilidades de ../utils/analytics (p. ej. Google Analytics 4).
 */
import { useEffect, useRef } from 'react';
import { trackTimeOnPage, trackScrollDepth } from '../utils/analytics';

/**
 * Hook que registra tiempo en página y profundidad de scroll para analytics.
 * Se ejecuta al montar y limpia intervalos/listeners al desmontar.
 * Tiempo: cada 30 segundos y tiempo final al desmontar.
 * Scroll: porcentaje cuando supera el máximo anterior.
 * @example
 * function MyPage() {
 *   useAnalytics();
 *   return <div>...</div>;
 * }
 */
export const useAnalytics = () => {
  const startTime = useRef(Date.now());
  const maxScrollDepth = useRef(0);

  useEffect(() => {
    // Tracking de tiempo en página
    const timeInterval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      trackTimeOnPage(timeSpent);
    }, 30000); // Cada 30 segundos

    // Tracking de profundidad de scroll
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const scrollPercentage = Math.round((currentScroll / scrollHeight) * 100);
      
      if (scrollPercentage > maxScrollDepth.current) {
        maxScrollDepth.current = scrollPercentage;
        trackScrollDepth(scrollPercentage);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
      
      // Enviar tiempo final al desmontar
      const finalTimeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      trackTimeOnPage(finalTimeSpent);
    };
  }, []);
}; 