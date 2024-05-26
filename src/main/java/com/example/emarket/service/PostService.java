package com.example.emarket.service;

import com.example.emarket.model.Post;
import com.example.emarket.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    public List<Post> getPosts(){
        return postRepository.findAll();
    }

    public Post addPost(Post post){
        return postRepository.save(post);
    }

    public Post getPostByid(Integer id){
        return postRepository.findById(id).orElseThrow((RuntimeException::new));
    }
}
