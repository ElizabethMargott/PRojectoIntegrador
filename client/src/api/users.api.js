import axios from 'axios';
import jwtDecode from 'jwt-decode';

const BASE_URL = 'http://localhost:8080/api/v1';

// Obtener el token JWT almacenado en el local storage (asumiendo que se guarda allí)
const getAuthToken = () => localStorage.getItem('token');

export const getUsernameFromToken = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;
        return username;
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null; // Manejo de errores: devolver null si hay un error al decodificar el token
    }
};

// export const getAllUsers = async () => {
//     // eslint-disable-next-line no-useless-catch
//     try {
//         const response = await axios.get(`${BASE_URL}/users`, {
//             headers: {
//                 Authorization: `Bearer ${authToken}` // Usar el token JWT como "Bearer token"
//             }
//         });

//         return response;
//     } catch (error) {
//         throw error;
//     }
// };

export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users/current`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            return window.location.reload();
        }
        console.error('Error fetching user:', error);
        return null;
    }
};

export const getAvatarUrl = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users/current/avatar`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });
        return response.request.responseURL;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            return window.location.reload();
        }
        console.error('Error fetching avatar URL:', error);
        return null;
    }
};

export const updateAvatar = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);    
    try {
        const response = await axios.post(`${BASE_URL}/users/current/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        // window.location.reload()
        return response.data;  // Esto debería ser la URL actualizada del avatar
    } catch (error) {
        console.error('Error updating avatar:', error);
        throw error;  // Lanza el error para que pueda ser manejado en el componente
    }
};