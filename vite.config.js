import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Puerto personalizado
    open: true, // Abre navegador automáticamente
    cors: true, // Habilitar CORS en desarrollo
    proxy: { // Configurar proxy para API
      '/api': {
        target: 'http://localhost:4000', // Tu backend
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist', // Directorio de build
    emptyOutDir: true // Limpiar directorio en cada build
  },
  optimizeDeps: {
    include: [
      'three/examples/jsm/postprocessing/EffectComposer',  
      'three',
      'three/addons/postprocessing/EffectComposer.js',
      'three/addons/geometries/TextGeometry.js'
    ]
  }
});