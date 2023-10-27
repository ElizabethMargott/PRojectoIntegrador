import { useForm } from "react-hook-form";
import { login } from "../api/auth.api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = "874829985624-oe9hg2g1gq7bckjemdpobjff96iuubja.apps.googleusercontent.com";

export function LoginPage() {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.username, data.password); // La función login ya guarda el token en el localStorage
      
      toast.success("Inicio de sesión exitoso", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      });

      navigate("/notes"); // Redirige al usuario a la página principal
    } catch (error) {
      console.error('Error de inicio de sesión:', error);

      toast.error("Error de inicio de sesión", {
        position: "bottom-right",
        style: {
          background: "#FF0000",
          color: "#fff"
        }
      });
    }
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit(onSubmit)}> {/* Agregué handleSubmit */}
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            {...formRegister("username", { required: true })}
          />
          {errors.username && <Form.Text className="text-danger">This field is required</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-white">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            {...formRegister("password", { required: true })}
          />
          {errors.password && <Form.Text className="text-danger">This field is required</Form.Text>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>

      <GoogleOAuthProvider clientId={clientId}>
        <div className="App">
          <LoginButton />
          <LogoutButton />
        </div>
      </GoogleOAuthProvider>

    </div>
  );

  function LoginButton() {
    const onSuccess = (credentialResponse) => {
      console.log("LOGIN SUCCESS! Current user: ", credentialResponse);
    }
  
    const onError = () => {
      console.log('Login Failed');
    }
  
    return (
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        auto_select
      />
    );
  }
  
  function LogoutButton() {
    const onLogoutSuccess = () => {
      console.log('Logged out Success');
      // Aquí es donde eliminarías el token de acceso de Google
      // Por ejemplo, si estás guardando el token en el localStorage, podrías hacer algo como esto:
      localStorage.removeItem('google_access_token');
    }

    return (
      <button onClick={onLogoutSuccess}>
        Logout
      </button>
    );
  }

}
