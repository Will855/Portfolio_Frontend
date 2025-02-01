// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Para usar Firestore

const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY_REDACTED", // Reemplaza con clave API
  authDomain: "portafolio-56d5e.firebaseapp.com", // Reemplaza con dominio de autenticación
  projectId: "portafolio-56d5e", // Reemplaza con ID de proyecto
  storageBucket: "portafolio-56d5e.firebasestorage.app", // Reemplaza con bucket de almacenamiento
  messagingSenderId: "961533427241", // Reemplaza con ID de mensajería
  appId: "1:961533427241:web:b9ed5d1eb418a95c192638", // Reemplaza con ID de aplicación
  measurementId: "G-HL1MY2MS9S", // Opcional, solo si usas Analytics
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { db };