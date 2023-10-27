package com.sxm.demo.controllers;

import com.sxm.demo.models.NoteModel;
import com.sxm.demo.services.NoteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/notes")
public class NoteController {

    @Autowired
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public ResponseEntity<List<NoteModel>> getNotes() {
        return ResponseEntity.ok(noteService.getNotes());
    }

    @PostMapping
    public ResponseEntity<NoteModel> saveNote(@RequestBody @Valid NoteModel note) {

        String username = getCurrentUsername();

        if (username == null) {
            // Maneja el caso en el que no se pudo obtener el nombre de usuario
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(noteService.saveNote(note, username));
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            return ((UserDetails) authentication.getPrincipal()).getUsername();
        }
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteModel> getNoteById(@PathVariable Long id){
        return noteService.getById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteModel> updateNoteById(@RequestBody @Valid NoteModel request, @PathVariable Long id){
        return ResponseEntity.ok(noteService.updateById(request, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        boolean ok = noteService.deleteNote(id);
        if (ok) {
            return ResponseEntity.ok("Note with id " + id + " deleted");
        } else {
            return ResponseEntity.status(500).body("Unable to delete note with id " + id);
        }
    }
}
