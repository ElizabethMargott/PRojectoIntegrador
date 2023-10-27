/* eslint-disable react/prop-types */
import { Container, Card } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
export function HeroComponent({ notes }) {
    return (
        <Container className="hero mt-3">
            {notes.map((note) => (
                <Card className="hero-card mb-3" key={note.id} style={{backgroundColor: "#1C1C1C", color: "#fff"}}>
                    <Card.Body>
                        <Card.Title>{note.title}</Card.Title>
                        <Card.Text>{note.content}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}
