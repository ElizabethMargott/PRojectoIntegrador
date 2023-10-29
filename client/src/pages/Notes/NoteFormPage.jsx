import { useForm } from "react-hook-form";
import { createNote, deleteNote, updateNote, getNote } from "../../api/notes.api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export function NoteFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      updateNote(params.id, data)
      toast.success("Nota Actualizada", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      })
    } else {
      await createNote(data);
      toast.success("Nota Creada", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      })
    }
    navigate("/notes");
  });

  useEffect(() => {
    async function loadNote() {
      if (params.id) {
        const {data: {title, description, content}} = await getNote(params.id)
        setValue('title', title)
        setValue('description', description)
        setValue('content', content)
      }
    }
    loadNote();
  }, [params.id, setValue]);

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
      { params.id && <Button variant="danger" type="submit" className="mt-3" onClick={async () => {
        const accepted = window.confirm("Are you sure?")
        if (accepted) {
          await deleteNote(params.id);
          toast.success("Nota Eliminada", {
            position: "bottom-right",
            style: {
              background: "#101010",
              color: "#fff"
            }
          })
          navigate("/notes");
        }
      }}>
          Delete
        </Button>}
    </div>
  );
}
