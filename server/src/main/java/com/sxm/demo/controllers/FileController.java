package com.sxm.demo.controllers;

import com.sxm.demo.models.UserModel;
import com.sxm.demo.repositories.IUserRepository;
import com.sxm.demo.services.FileStorageService;
import com.sxm.demo.services.UserService;
import com.sxm.demo.user.ErrorResponse;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class FileController {

  @Autowired
  private IUserRepository userRepository;

  @Autowired
  private FileStorageService fileStorageService;

  @GetMapping("/users/{userId}/avatar")
  public ResponseEntity<Resource> serveFile(@PathVariable Long userId) {
    // Obtener el usuario de la base de datos
    UserModel user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado con id " + userId));
    
    // Cargar el archivo como recurso
    Resource file = (Resource) fileStorageService.loadAsResource(user.getAvatarFilename());
    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
        .body(file);
  }
}
