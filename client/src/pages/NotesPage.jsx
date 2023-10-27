import React, { useEffect, useState } from 'react';
import { HeroComponent as Hero } from '../components/HeroComponent';
import { getAllNotes, deleteNote } from '../api/notes.api';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export function NotesPage() {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadNotes() {
            try {
                const res = await getAllNotes();
                setNotes(res.data);
            } catch (error) {
                console.error('Error al cargar las notas', error);
            }
        }
        loadNotes();
    }, []);

    const handleDeleteNote = async (noteId) => {
        try {
            await deleteNote(noteId);
            const updatedNotes = notes.filter(note => note.id !== noteId);
            setNotes(updatedNotes);
        } catch (error) {
            console.error('Error al eliminar la nota', error);
        }
    };

    const handleCreateNote = () => {
        navigate('/notes-create');
    };

    return (
        <div>
            <Hero notes={notes} onDeleteNote={handleDeleteNote} />
            <div 
                style={{
                    cursor: 'pointer',
                    position: 'fixed',
                    bottom: '108px',
                    right: '20px',
                    backgroundColor: '#333',
                    borderRadius: '50%',
                    padding: '15px',
                    boxShadow: '0px 2px 10px rgba(0,0,0,0.3)'
                }}
                onClick={handleCreateNote}>
                <AddIcon style={{ color: 'white', fontSize: '24px' }} />
            </div>
        </div>
    );
};
