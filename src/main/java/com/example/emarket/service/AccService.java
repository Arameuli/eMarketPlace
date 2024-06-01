package com.example.emarket.service;

import com.example.emarket.dto.AccountDto;
import com.example.emarket.model.Account;
import com.example.emarket.repository.AccountRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.val;
import org.springframework.stereotype.Service;

@Service
public class AccService {
    private final AccountRepository accountRepository;
    private final ModelConverter converter;

    public AccService(AccountRepository accountRepository, ModelConverter convert) {
        this.accountRepository = accountRepository;
        this.converter = convert;
    }

    public Account saveAccount(Account account){
        return accountRepository.save(account);
    }

    public AccountDto addAccount(Account account){
        val result = saveAccount(account);
        return converter.convert1(result);
    }

    public boolean findByUsername(String username) {
        try {
            accountRepository.findAccountByUsername(username)
                    .orElseThrow(() -> new EntityNotFoundException("Could not find account by username"));
            return true;
        } catch (EntityNotFoundException e) {
            return false;
        }
    }

    public boolean findByEmail(String email){
        try {
            accountRepository.findAccountByEmail(email)
                    .orElseThrow(() -> new EntityNotFoundException("Could not find account by email"));
            return true;
        } catch (EntityNotFoundException e) {
            return false;
        }
    }

    public boolean findByEmailAndPassword(String email, String password){
        try {
            accountRepository.findAccountByEmailAndPassword(email, password)
                    .orElseThrow(() -> new EntityNotFoundException("Could not find account by email"));
            return true;
        } catch (EntityNotFoundException e) {
            return false;
        }
    }

}
