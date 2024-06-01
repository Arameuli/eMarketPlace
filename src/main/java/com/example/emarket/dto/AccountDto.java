package com.example.emarket.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountDto {
    private String username;
    private String email;
    private String password;
}
