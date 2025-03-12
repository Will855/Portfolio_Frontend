// import axios from 'axios';

// export const sendContactForm = async (formData) => {
//     const url = `${import.meta.VITE_API_URL}/contact`;

//     const formDataToSend = new FormData();
//     formDataToSend.append('name', formData.name);
//     formDataToSend.append('email', formData.email);
//     formDataToSend.append('phone', formData.phone);
//     formDataToSend.append('message', formData.message);

//     const response = await axios.post(url, formDataToSend, {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//     });

//     return response.data;
// };