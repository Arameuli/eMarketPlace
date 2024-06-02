package com.example.emarket.dto;

import com.example.emarket.model.Account;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountDto {
    private String username;
    private String email;
    private String password;

    public AccountDto(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public static AccountDto fromAccount(Account account) {
        return new AccountDto(account.getUsername(), account.getEmail(), account.getPassword());
    }
}
