package com.lastArk.lastarkapi.dto;

import com.lastArk.lastarkapi.db.domain.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RadeDTO {
    private Long radeId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime startAt;
    private RadeInfoDTO radeInfo;

    private UserInfo writer;
}
