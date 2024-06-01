package com.example.emarket.controller;

import com.example.emarket.dto.AccountDto;
import com.example.emarket.model.Account;
import com.example.emarket.service.AccService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/acc")
public class AccController {
    private final AccService accService;

    @Autowired
    public AccController(AccService accService) {
        this.accService = accService;
    }


    @PostMapping
    @ResponseBody
    public ResponseEntity<String> addAccount(@RequestBody Account account) {
        try {
            boolean usernameExists = accService.findByUsername(account.getUsername());
            boolean emailExists = accService.findByEmail(account.getEmail());

            if (!usernameExists && !emailExists) {
                accService.addAccount(account);
                return ResponseEntity.ok("Account created successfully.");
            } else {
                String conflictMessage = "";
                if (usernameExists && emailExists) {
                    conflictMessage = "Username and email already exist.";
                } else if (usernameExists) {
                    conflictMessage = "Username already exists.";
                } else if (emailExists) {
                    conflictMessage = "Email already exists.";
                }
                return ResponseEntity.status(HttpStatus.CONFLICT).body(conflictMessage);
            }
        } catch (Exception e) {
            System.out.println("Exception occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while creating the account.");
        }
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<String> checkUsernameAndEmail(@RequestParam("login-password") String password,
                                                        @RequestParam("login-email") String email) {
        if (!accService.findByEmailAndPassword(email, password)) {
            return ResponseEntity.badRequest().body("Username or password doesn't match. Try another one.");
        } else {
            return ResponseEntity.ok("Username and password are correct.");
        }
    }



}

