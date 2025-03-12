// import axios from "axios";

// // Función para obtener los detalles del proyecto desde la API
// export const fetchCardDetails = async (projectId: string) => {
//     try {
//         const { data } = await axios.get(
//             `${process.env.REACT_APP_API_URL}/api/project-details?id=${projectId}`
//         );
//         return data;
//     } catch (error) {
//         throw new Error("Error al cargar los detalles de la tarjeta.");
//     }
// };