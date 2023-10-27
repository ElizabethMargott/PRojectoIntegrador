package com.sxm.demo.controllers;

import com.sxm.demo.models.UserModel;
import com.sxm.demo.services.UserService;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/{id}")
    public ResponseEntity<UserModel> getUserById(@PathVariable Long id) {
        return userService.getById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    //     @GetMapping("/{id}/avatar")
    // @PreAuthorize("isAuthenticated()")
    // public ResponseEntity<byte[]> getUserAvatar(@PathVariable Long id) {
    //     Optional<UserModel> userOptional = userService.getById(id);

    //     if (userOptional.isPresent()) {
    //         UserModel user = userOptional.get();

    //         // Utiliza la ruta de acceso relativa definida en StaticResourceConfig
    //         String avatarPath = "uploads/avatars/" + user.getAvatarPath();
    //         Resource resource = new ClassPathResource(avatarPath);

    //         try {
    //             if (resource.exists()) {
    //                 InputStream inputStream = resource.getInputStream();
    //                 byte[] avatarBytes = IOUtils.toByteArray(inputStream);

    //                 HttpHeaders headers = new HttpHeaders();
    //                 headers.setContentType(MediaType.IMAGE_PNG);

    //                 return new ResponseEntity<>(avatarBytes, headers, HttpStatus.OK);
    //             } else {
    //                 return ResponseEntity.notFound().build();
    //             }
    //         } catch (IOException e) {
    //             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    //         }
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }



    @GetMapping("/avatar")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<byte[]> getUserAvatar() {
        String username = getCurrentUsername(); // Get the username of the authenticated user
    
        if (username != null) {
            String avatarPath = "classpath:/static/uploads/avatars/" + username + ".png"; // Build the path to the avatar
    
            try {
                Resource resource = new ClassPathResource(avatarPath);
    
                if (resource.exists()) {
                    return createResponseEntity(resource);
                } else {
                    // If the avatar is not found, load the default image "default.png"
                    String defaultAvatarPath = "classpath:/static/uploads/avatars/default.png";
                    Resource defaultResource = new ClassPathResource(defaultAvatarPath);
    
                    if (defaultResource.exists()) {
                        return createResponseEntity(defaultResource);
                    } else {
                        // If the default image is not found, you can return a 404 error
                        return ResponseEntity.notFound().build();
                    }
                }
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    
        return ResponseEntity.notFound().build();
    }
    
    private ResponseEntity<byte[]> createResponseEntity(Resource resource) throws IOException {
        byte[] avatarBytes = Files.readAllBytes(resource.getFile().toPath());
    
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
    
        return new ResponseEntity<>(avatarBytes, headers, HttpStatus.OK);
    }
    
    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            return ((UserDetails) authentication.getPrincipal()).getUsername();
        }
        return null;
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
