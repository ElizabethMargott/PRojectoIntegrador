package com.sxm.demo.services;

import com.sxm.demo.models.NoteModel;
import com.sxm.demo.models.UserModel;
import com.sxm.demo.repositories.INoteRepository;
import com.sxm.demo.repositories.IUserRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    private final INoteRepository noteRepository;
    private final IUserRepository userRepository;

    public NoteService(INoteRepository noteRepository, IUserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    public List<NoteModel> getNotes() {
        return noteRepository.findAll();
    }

    public NoteModel saveNote(NoteModel note, String username) {
        Optional<UserModel> userOptional = userRepository.findByUsername(username);
    
        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();
            note.setUser(user);
            return noteRepository.save(note);
        } else {
            throw new EntityNotFoundException("User not found with id " + username);
        }
    }
    

    public Optional<NoteModel> getById(Long id) {
        return noteRepository.findById(id);
    }

    public NoteModel updateById(NoteModel request, Long id) {
        return noteRepository.findById(id).map(note -> {
            note.setTitle(request.getTitle());
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
