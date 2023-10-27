// import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth.api'; // Importa la función de cierre de sesión

// Componente LogoutButton
export function LogoutButton() {
  // const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Llama a la función de cierre de sesión de auth.api.js
    //navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    window.location.reload();
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
}
