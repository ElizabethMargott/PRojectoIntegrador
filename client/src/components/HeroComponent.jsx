/* eslint-disable react/prop-types */
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export function HeroComponent({ notes }) {
    const navigate = useNavigate();

    return (
        <Container className="hero mt-3">
            {notes.map((note) => (
                <Card 
                    className="hero-card mb-3" 
                    key={note.id} 
                    style={{ 
                        backgroundColor: "#1C1C1C", 
                        color: "#fff"
                    }} 
                    onClick={() => navigate(`/notes/${note.id}`)}
                >
                    <Card.Body style={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'center' 
                    }}>
                        <div style={{ flex: 1, maxWidth: '100%' }}>
                            <Card.Title className="truncate-text fade-out title-text">
                                {note.title}
                            </Card.Title>
                            <Card.Text className="truncate-text fade-out description-text">
                                {note.description}
                            </Card.Text>
                            <Card.Text className="truncate-text fade-out content-text">
                                {note.content}
                            </Card.Text>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}
