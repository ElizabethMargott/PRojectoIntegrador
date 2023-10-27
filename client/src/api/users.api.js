import axios from 'axios';
import jwtDecode from 'jwt-decode';

const BASE_URL = 'http://localhost:3000/api/v1';

// Obtener el token JWT almacenado en el local storage (asumiendo que se guarda allí)
const authToken = localStorage.getItem('token');

export const getUsernameFromToken = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;
        console.log('Nombre de usuario:', username);
        return username;
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null; // Manejo de errores: devolver null si hay un error al decodificar el token
    }
};

export const getAllUsers = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get(`${BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${authToken}` // Usar el token JWT como "Bearer token"
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
};
