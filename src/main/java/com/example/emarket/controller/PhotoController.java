package com.example.emarket.controller;

import com.example.emarket.service.PhotoService;
import com.example.emarket.service.PostService;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/photo")
public class PhotoController {
    private PostService postService;
    private PhotoService photoService;

    @Autowired
    public PhotoController(PostService postService, PhotoService photoService) {
        this.postService = postService;
        this.photoService = photoService;
    }

    @PostMapping
    public ResponseEntity<?> uploadPhoto(@RequestParam("file") MultipartFile photo,
                                         @RequestParam("title") String title) {
        try {
            val postDto = postService.findByTitle(title);
            photoService.storePhoto(photo, postDto.getPhoto_url());
            return ResponseEntity.noContent().build();
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping
    public ResponseEntity<?> getAllPhotos(){
        try{
            val photos = photoService.getAllPhotos();
            return ResponseEntity.ok(photos);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
