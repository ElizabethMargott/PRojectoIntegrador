package com.sxm.demo.controllers;

import com.sxm.demo.models.UserModel;
import com.sxm.demo.services.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserModel>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @GetMapping("/current")
    public UserModel getCurrentUser() {
        return userService.getCurrentUser();
    }

    @GetMapping("/current/avatar")
    public RedirectView getCurrentUserAvatarRedirect() {
        UserModel currentUser = userService.getCurrentUser();
        String avatarFilename = currentUser.getAvatarFilename();
        return new RedirectView("/uploads/avatars/" + avatarFilename);
    }

    @PostMapping("/current/avatar")
    public ResponseEntity<?> updateUserAvatar(
            @RequestParam("avatar") MultipartFile avatar) {
        try {
            userService.updateUserAvatar(avatar);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while updating the avatar");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserModel> getUserById(@PathVariable Long id) {
        return userService.getById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserModel> updateUserById(@RequestBody @Valid UserModel updatedUser, @PathVariable Long id) {
        return ResponseEntity.ok(userService.updateById(updatedUser, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        boolean ok = userService.deleteUser(id);
        if (ok) {
            return ResponseEntity.ok("User with id " + id + " deleted");
        } else {
            return ResponseEntity.status(500).body("Unable to delete user with id " + id);
        }
    }
}
