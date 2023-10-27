package com.sxm.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import com.sxm.demo.user.FileStorageProperties;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;


import io.jsonwebtoken.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.net.MalformedURLException;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class FileStorageService {

  private final Path fileStorageLocation;

  @Autowired
  public FileStorageService(FileStorageProperties fileStorageProperties) {
    this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
        .toAbsolutePath().normalize();
    
    try {
      Files.createDirectories(this.fileStorageLocation);
    } catch (Exception ex) {
      throw new FileStorageException("No se pudo crear el directorio donde se almacenarán los archivos subidos.", ex);
    }
  }

   public ResponseEntity<Resource> loadAsResource(String fileName) {
    try {
      Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
      Resource resource = new UrlResource(filePath.toUri());
      if (resource.exists()) {
        return ResponseEntity.ok()
                             .contentType(MediaType.APPLICATION_OCTET_STREAM)
                             .header("Content-Disposition", "attachment; filename=\"" + resource.getFilename() + "\"")
                             .body(resource);
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
      }
    } catch (MalformedURLException ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }
}

