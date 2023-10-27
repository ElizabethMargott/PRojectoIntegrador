import { HeroComponent as Hero } from '../components/HeroComponent'
import { getAllNotes } from '../api/notes.api'
import { useEffect, useState } from 'react';

export function NotesPage() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
     async function loadNotes() {
        const res = await getAllNotes()
        console.log(res)
        setNotes(res.data);
      }
      loadNotes();
    }, []);

  return (
    <div>
      <Hero notes={notes} />
    </div>
  )
}
