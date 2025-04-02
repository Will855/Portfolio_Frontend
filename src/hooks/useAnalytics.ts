import { useEffect, useRef } from 'react';
import { trackTimeOnPage, trackScrollDepth } from '../utils/analytics';

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