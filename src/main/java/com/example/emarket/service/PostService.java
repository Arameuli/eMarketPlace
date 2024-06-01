package com.example.emarket.service;

import com.example.emarket.dto.PostCollectionDto;
import com.example.emarket.dto.PostDto;
import com.example.emarket.model.Post;
import com.example.emarket.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.StandardReflectionParameterNameDiscoverer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private static final String PHOTO_PREFIX = "-photo";
    private final PostRepository postRepository;
    private final ModelConverter converter;

    @Autowired
    public PostService(PostRepository postRepository, ModelConverter converter) {
        this.postRepository = postRepository;
        this.converter = converter;
    }

    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    public Post savePost(Post post) {
        return postRepository.save(post);
    }


    public Post findPostByid(Integer id) {
        return postRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public PostDto findByTitle(String title){
        val post = postRepository.findPostByPostTitle(title)
                .orElseThrow(() -> new EntityNotFoundException("Could not find post by title"));
        return converter.convert(post);
    }

    public PostCollectionDto getPosts() {
        val posts = findAllPosts();
        return converter.convert(posts);
    }

    public PostDto getPost(Integer id) {
        val post = findPostByid(id);
        return converter.convert(post);
    }


    public PostDto addPost(Post post) {
        post.setPhoto_url(post.getPostTitle() + PHOTO_PREFIX);
        val result = savePost(post);
        return converter.convert(result);
    }

//    public PostDto addPhotoToPost(String title) {
//        val post = postRepository.findPostByPostTitle(title)
//                .orElseThrow(() -> new EntityNotFoundException("Post entity with title " + title + " not found"));
//        post.setPhoto_url(title+PHOTO_PREFIX);
//        return converter.convert(postRepository.save(post));
//    }
}
