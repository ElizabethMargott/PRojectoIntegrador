import { useEffect, useState } from 'react';
import { HeroComponent as Hero } from '../../components/HeroComponent';
import { getAllNotes } from '../../api/notes.api';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export function NotesPage() {
    const [notes, setNotes] = useState([]);

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


    return (
        <div>
            <Hero notes={notes} />
            <Link
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
                to="/notes-create">
                <AddIcon style={{ color: 'white', fontSize: '24px' }} />
            </Link>
        </div>
    );
}
