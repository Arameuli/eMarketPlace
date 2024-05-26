package com.example.emarket.controller;

import com.example.emarket.model.Post;
import com.example.emarket.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<Post> getAllPosts(){
        return postService.getPosts();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Post getPostByid(@PathVariable("id") Integer id){
        return postService.getPostByid(id);
    }

    @PostMapping
    @ResponseBody
    public Post addPost(@RequestBody Post post){
        return postService.addPost(post);
    }
}
