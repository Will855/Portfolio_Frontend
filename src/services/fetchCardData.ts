// // services/api.ts
// import axios from "axios"; // Importar axios
// import { CardProps } from "./../types/types"; // Importar el tipo de datos

// // Función para obtener los datos de las tarjetas desde la API
// export const fetchCardData = async (): Promise<CardProps[]> => {
//     try {
//         const url = `${process.env.VITE_API_URL}projects`; // URL de la API
//         const response = await axios.get(url); // Realizar la solicitud

//         if (response.data.success) {
//             return response.data.data; // Devolver los datos si la solicitud fue exitosa
//         } else {
//             throw new Error("Error al cargar los datos"); // Lanzar un error si la API no responde correctamente
//         }
//     } catch (error) {
//         console.error("Error en la solicitud:", error); // Mostrar el error en la consola
//         throw new Error("Error al conectar con el servidor"); // Lanzar un error personalizado
//     }
// };