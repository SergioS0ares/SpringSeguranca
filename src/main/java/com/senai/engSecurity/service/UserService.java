package com.senai.engSecurity.service;

import com.senai.engSecurity.model.User;
import com.senai.engSecurity.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User findByUsernameAndPassword(User user) {
        return this.userRepository
                .findByUsernameAndPassword(user.getUsername(), user.getPassword())
                .orElseThrow(() -> new UsernameNotFoundException(user.getUsername()));
    }
    public User getCurrentUser() {
        // Obter o contexto de segurança atual
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Verificar se o usuário está autenticado
        if (authentication != null && authentication.isAuthenticated()) {
            // O nome de usuário pode ser obtido do objeto de autenticação
            String username = authentication.getName();

            // Aqui você deve buscar o usuário no banco de dados usando o nome de usuário
            return findByUsername(username) // Buscar o usuário pelo nome de usuário
                    .orElse(null); // Retornar null se o usuário não for encontrado
        }
        return null; // Retorna null se não houver um usuário autenticado
    }
}

