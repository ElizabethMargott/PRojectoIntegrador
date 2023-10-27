/* eslint-disable no-useless-catch */
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Asume que tu API Spring Boot corre en el puerto 8080. Ajusta la URL si es diferente.

// Función para iniciar sesión y obtener un token JWT
export const login = async (username, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, { username, password });
        localStorage.setItem('token', response.data.token); // Asume que tu API devuelve un objeto con un campo 'token'
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Función para registrarse en la plataforma
export const register = async (username, email, password) => { // Asume que puedes tener otros campos además de username y password
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, { username, email, password });
        localStorage.setItem('token', response.data.token); // Al registrar, también asume que tu API devuelve un token
        console.log(response)
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Función para cerrar sesión
export const logout = () => {
    localStorage.removeItem('token');
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si hay un token, de lo contrario, false
};
