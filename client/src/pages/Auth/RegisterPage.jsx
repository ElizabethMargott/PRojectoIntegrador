import { useForm } from "react-hook-form";
import { register } from "../../api/auth.api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { toast } from "react-hot-toast";

export function RegisterPage() {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register(data.username, data.email, data.password); 
      toast.success("Registrado con éxito", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      });
      window.location.reload();
    } catch (error) {
      toast.error("Error al registrar", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      });
    }
  });

  const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
    },
    button: {
        width: '100%',
        marginTop: '15px'
    }
}

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 className="mb-4 text-center">Registro</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              {...formRegister("username", { required: true })}
            />
            {errors.username && <Form.Text className="text-danger">This field is required</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label> 
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...formRegister("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
            />
            {errors.email && <Form.Text className="text-danger">This field is required and should be a valid email</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              {...formRegister("password", { required: true })}
            />
            {errors.password && <Form.Text className="text-danger">This field is required</Form.Text>}
          </Form.Group>

          <Button style={styles.button} variant="success" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}
