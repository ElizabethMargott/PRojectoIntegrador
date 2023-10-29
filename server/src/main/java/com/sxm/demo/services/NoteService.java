package com.sxm.demo.services;

import com.sxm.demo.models.NoteModel;
import com.sxm.demo.models.UserModel;
import com.sxm.demo.repositories.INoteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    private final INoteRepository noteRepository;

    public NoteService(INoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<NoteModel> getNotes() {
        return noteRepository.findAll();
    }


    public List<NoteModel> getNotesByUser(UserModel user) {
        return noteRepository.findByUser(user);
    }

    public NoteModel saveNote(NoteModel note, UserModel user) {
            noteRepository.findByUser(user);
            note.setUser(user);
            return noteRepository.save(note);
    }

    public Optional<NoteModel> getById(Long id) {
        return noteRepository.findById(id);
    }

    public NoteModel updateById(NoteModel request, Long id) {
        return noteRepository.findById(id).map(note -> {
            note.setTitle(request.getTitle());
            note.setDescription(request.getDescription());
            note.setContent(request.getContent());
            note.setModificationDate(request.getModificationDate());
            return noteRepository.save(note);
        }).orElseThrow(() -> new EntityNotFoundException("Note with id " + id + " not found"));
    }

    public Boolean deleteNote(Long id){
        try {
            noteRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
