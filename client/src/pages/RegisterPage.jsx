import { useForm } from "react-hook-form";
import { register } from "../api/auth.api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
// import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function RegisterPage() {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register(data.username, data.email, data.password); // Agregado el parámetro email
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

  return (
    <div className="container mt-5">
      <Form onSubmit={onSubmit}>
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
          <Form.Label className="text-white">Email</Form.Label> {/* Campo Email */}
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...formRegister("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
          />
          {errors.email && <Form.Text className="text-danger">This field is required and should be a valid email</Form.Text>}
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
          Register
        </Button>
      </Form>
    </div>
  );
}
