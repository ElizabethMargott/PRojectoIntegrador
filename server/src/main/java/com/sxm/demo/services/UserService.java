package com.sxm.demo.services;

import com.sxm.demo.models.UserModel;
import com.sxm.demo.repositories.IUserRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(IUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserModel> getUsers() {
        return userRepository.findAll();
    }

    public Optional<UserModel> getById(Long id) {
        return userRepository.findById(id);
    }

    public UserModel updateById(UserModel request, Long id) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            return userRepository.save(user);
        }).orElseThrow(() -> new EntityNotFoundException("User with id " + id + " not found"));
    }

    public Boolean deleteUser(Long id){
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Optional<String> getUserAvatarFilename(Long userId) {
        Optional<UserModel> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return Optional.ofNullable(user.get().getAvatarFilename());
        } else {
            // Log para indicar que el usuario no se encontró
            System.out.println("Usuario no encontrado con ID: " + userId);
            return Optional.empty();
        }
    }
    
    
}
