package com.senai.engSecurity.controller;

import com.senai.engSecurity.model.User;
import com.senai.engSecurity.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST}) // Aplica CORS para todos os métodos desse controlador
public class UserController {

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/user")
    public ResponseEntity<User> getUser() {
        User user = userService.getCurrentUser(); // Lógica para recuperar o usuário atual
        if (user != null) {
            return ResponseEntity.ok(user); // Retorna o usuário com status 200 (OK)
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Retorna 404 se não encontrar
        }
    }

    @Autowired
    private UserService userService;

    @PostMapping
    public User save(@RequestBody User user) {
        return userService.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.findByUsernameAndPassword(user);
    }
}
