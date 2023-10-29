import { useForm } from "react-hook-form";
import { login } from "../../api/auth.api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
// import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// const clientId = "874829985624-oe9hg2g1gq7bckjemdpobjff96iuubja.apps.googleusercontent.com";

export function LoginPage() {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const navigate = useNavigate();

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

      window.location.reload(); // Redirige al usuario a la página principal
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

  const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)',
        width: '100%',
        maxWidth: '500px'
    },
    input: {
        fontSize: '18px',
        height: '50px'
    },
    button: {
        fontSize: '18px',
        padding: '10px 20px',
        margin: '5px'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center'
    }
}

const navigate = useNavigate();

return (
  <div style={styles.container}>
      <div style={styles.formContainer}>
          <h2 className="mb-4 text-center">Iniciar sesión</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-4">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                      style={styles.input}
                      type="text"
                      placeholder="Enter username"
                      {...formRegister("username", { required: true })}
                  />
                  {errors.username && <Form.Text className="text-danger">This field is required</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      style={styles.input}
                      type="password"
                      placeholder="Enter password"
                      {...formRegister("password", { required: true })}
                  />
                  {errors.password && <Form.Text className="text-danger">This field is required</Form.Text>}
              </Form.Group>

              <div style={styles.buttonContainer}>
                  <Button style={styles.button} variant="success" type="submit" className="me-3">
                      Login
                  </Button>
                  <Button 
                            style={styles.button} 
                            variant="primary" 
                            onClick={() => navigate('/register')}  // Aquí se redirige a /register
                        >
                            Registro
                        </Button>
              </div>
          </Form>
      </div>

      {/* <GoogleOAuthProvider clientId={clientId}>
        <div className="App">
          <LoginButton />
          <LogoutButton />
        </div>
      </GoogleOAuthProvider> */}

    </div>
  )

  // function LoginButton() {
  //   const onSuccess = (credentialResponse) => {
  //     console.log("LOGIN SUCCESS! Current user: ", credentialResponse);
  //   }
  
  //   const onError = () => {
  //     console.log('Login Failed');
  //   }
  
  //   return (
  //     <GoogleLogin
  //       onSuccess={onSuccess}
  //       onError={onError}
  //       auto_select
  //     />
  //   );
  // }
  
  // function LogoutButton() {
  //   const onLogoutSuccess = () => {
  //     console.log('Logged out Success');
  //     localStorage.removeItem('google_access_token');
  //   }

  //   return (
  //     <button onClick={onLogoutSuccess}>
  //       Logout
  //     </button>
  //   );
  // }

}
