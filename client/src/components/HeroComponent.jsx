import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

export function HeroComponent({ notes, onDeleteNote }) {
    return (
        <Container className="hero mt-3">
            {notes.map((note) => (
                <Card className="hero-card mb-3" key={note.id} style={{ backgroundColor: "#1C1C1C", color: "#fff" }}>
                    <Card.Body style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Card.Title>{note.title}</Card.Title>
                            <Card.Text>{note.content}</Card.Text>
                        </div>
                        <Button variant="danger" style={{ marginLeft: 'auto' }} onClick={() => onDeleteNote(note.id)}>Eliminar</Button>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}
