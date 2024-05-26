package com.example.emarket.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class PostDto {
    private String title;
    private String discription;
    private String photo_url;
    private Date date;
}
