package com.lastArk.lastarkapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RadePostDTO {
    private String writer;
    private String title;
    private String bossName;
    private Integer maxNum;
    private String content;
    private String startAt;
    private String members;
    private String radeMasterName;
}
