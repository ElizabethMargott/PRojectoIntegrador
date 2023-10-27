import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';

// Obtener el token JWT almacenado en el local storage (asumiendo que se guarda allí)
const authToken = localStorage.getItem('token');

export const getAllNotes = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get(`${BASE_URL}/notes`, {
            headers: {
                Authorization: `Bearer ${authToken}` // Usar el token JWT como "Bearer token"
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
};

export const createNote = async (note) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.post(`${BASE_URL}/notes`, note, {
            headers: {
                Authorization: `Bearer ${authToken}`, // Usar el token JWT como "Bearer token"
                'Content-Type': 'application/json'
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
};
