package com.example.emarket.controller;

import com.example.emarket.dto.PostCollectionDto;
import com.example.emarket.dto.PostDto;
import com.example.emarket.model.Post;
import com.example.emarket.service.PostService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    @ResponseBody
    public PostCollectionDto getAllPosts(){
        try{
            return postService.getPosts();
        }
        catch (EntityNotFoundException e) {
            return null;
        }
    }

    @GetMapping("/{id}")
    @ResponseBody
    public PostDto getPostByid(@PathVariable("id") Integer id){
        try{
            return postService.getPost(id);
        }
        catch (EntityNotFoundException e) {
            return null;
        }
    }

    @PostMapping
    @ResponseBody
    public PostDto addPost(@RequestBody Post post){
        post.setPost_date(new Date());
        return postService.addPost(post);
    }
}
