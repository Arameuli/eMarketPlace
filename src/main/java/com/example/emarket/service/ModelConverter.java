package com.example.emarket.service;

import com.example.emarket.dto.AccountCollectionDto;
import com.example.emarket.dto.AccountDto;
import com.example.emarket.dto.PostCollectionDto;
import com.example.emarket.dto.PostDto;
import com.example.emarket.model.Account;
import com.example.emarket.model.Post;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ModelConverter {

    public PostDto convert(Post post){
        return PostDto.builder()
                .title(post.getPostTitle())
                .discription(post.getDiscription())
                .photo_url(post.getPhoto_url())
                .date(post.getPost_date())
                .build();
    }

    public PostCollectionDto convert(List<Post> post){
        return PostCollectionDto.builder()
                .postDtoList(post.stream().map(this::convert).toList())
                .build();
    }

    public AccountDto convert1(Account account){
        return AccountDto.builder()
                .username(account.getUsername())
                .email(account.getEmail())
                .password(account.getPassword())
                .build();
    }

    public AccountCollectionDto convert1(List<Account> accounts){
        return AccountCollectionDto.builder()
                .accountDtoList(accounts.stream().map(this::convert1).toList())
                .build();
    }


}
