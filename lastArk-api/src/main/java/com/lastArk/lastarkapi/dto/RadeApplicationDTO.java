package com.lastArk.lastarkapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RadeApplicationDTO {
    private Long applyId;
    private String characterName;
    private Integer itemLevel;
    private String username;
    private String state;
    private Long radeId;
    private LocalDateTime createdAt;
}
