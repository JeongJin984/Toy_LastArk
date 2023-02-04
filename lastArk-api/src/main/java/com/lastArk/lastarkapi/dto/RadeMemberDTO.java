package com.lastArk.lastarkapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RadeMemberDTO {
    private String characterName;
    private Integer itemLevel;
    private String state;
    private Boolean isMaster;
}
