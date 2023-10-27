import { useForm } from "react-hook-form";
import { createNote } from "../api/notes.api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function NoteFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const res = await createNote(data);
    console.log(res);
    toast.success("Nota Creada", {
      position: "bottom-right",
      style: {
        background: "#101010",
        color: "#fff"
      }
    })
    navigate("/");
  });

  return (
    <div className="container mt-5">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            {...register("title", { required: true })}
          />
          {errors.title && <Form.Text className="text-danger">This field is required</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-white">Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            {...register("description", { required: true })}
          />
          {errors.description && <Form.Text className="text-danger">This field is required</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-white">Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter content"
            {...register("content", { required: true })}
          />
          {errors.content && <Form.Text className="text-danger">This field is required</Form.Text>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}
