package com.example.emarket.repository;

import com.example.emarket.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findAccountByUsername(String username);
    Optional<Account> findAccountByEmail(String email);
    Optional<Account> findAccountByEmailAndPassword(String email, String password);
}
