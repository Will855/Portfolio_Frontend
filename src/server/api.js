// import axios from "axios";

// const API_URL = 'http://localhost/api/'; // Cambia esto por la URL de tu API

// // Configuración de Axios
// const axiosInstance = axios.create({
//     baseURL: API_URL,
//     timeout: 10000, // Tiempo de espera de 10 segundos
// });

// // Interceptor para manejar errores globalmente
// axiosInstance.interceptors.response.use(
//     response => {
//         // Imprimir la respuesta en la consola para debug
//         //console.log('Respuesta del servidor:', response.data);
//         // Si la respuesta es exitosa, simplemente la retornamos
//         return response;
//     },
//     error => {
//         // Manejo de errores
//         if (error.response) {
//             // El servidor respondió con un código de estado fuera del rango de 2xx
//             console.error('Error en la respuesta del servidor:', error.response.data);
//             throw new Error(`Error ${error.response.status}: ${error.response.data.message || 'Error desconocido'}`);
//         } else if (error.request) {
//             // La solicitud fue realizada pero no se recibió respuesta
//             console.error('No se recibió respuesta del servidor:', error.request);
//             throw new Error('No se recibió respuesta del servidor');
//         } else {
//             // Ocurrió un error al configurar la solicitud
//             console.error('Error al configurar la solicitud:', error.message);
//             throw new Error('Error al configurar la solicitud');
//         }
//     }
// );

// export const fetchData = async (endpoint) => {
//     try {
//         const response = await axiosInstance.get(endpoint);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error; // Lanza el error para manejarlo en el componente
//     }
// };

// export const postData = async (endpoint, data) => {
//     try {
//         const response = await axiosInstance.post(endpoint, data);
//         return response.data;
//     } catch (error) {
//         console.error('Error posting data:', error);
//         throw error; // Lanza el error para manejarlo en el componente
//     }
// };