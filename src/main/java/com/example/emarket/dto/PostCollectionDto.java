package com.example.emarket.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PostCollectionDto {

    private List<PostDto> postDtoList;
}
