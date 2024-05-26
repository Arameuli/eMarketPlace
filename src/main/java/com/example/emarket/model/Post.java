package com.example.emarket.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.nio.channels.FileChannel;
import java.util.Date;

@Entity
@Table(name ="posts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "postid")
    private Integer postId;

    @Column(name = "posttitle")
    private String postTitle;

    @Column(name = "photo_url")
    private String photo_url;

    @Column(name = "discription")
    private String discription;

    @Column(name = "post_date")
    private Date post_date;

}
