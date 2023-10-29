package com.sxm.demo.controllers;

import com.sxm.demo.models.NoteModel;
import com.sxm.demo.models.UserModel;
import com.sxm.demo.services.NoteService;
import com.sxm.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/notes")
public class NoteController {

    @Autowired
    private final NoteService noteService;
    private final UserService userService;

    public NoteController(NoteService noteService, UserService userService) {
        this.noteService = noteService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<NoteModel>> getNotes() {
        return ResponseEntity.ok(noteService.getNotes());
    }

    @GetMapping("/current")
    public ResponseEntity<List<NoteModel>> getNotesByCurrentUser() {
        UserModel currentUser = userService.getCurrentUser();
        
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        List<NoteModel> notes = noteService.getNotesByUser(currentUser);
        return ResponseEntity.ok(notes);
    }

    @PostMapping
    public ResponseEntity<NoteModel> saveNote(@RequestBody @Valid NoteModel note) {

        UserModel currentUser = userService.getCurrentUser();

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(noteService.saveNote(note, currentUser));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteModel> getNoteById(@PathVariable Long id){
        return noteService.getById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteModel> updateNoteById(@RequestBody @Valid NoteModel updatedNote, @PathVariable Long id){
        return ResponseEntity.ok(noteService.updateById(updatedNote, id));
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
