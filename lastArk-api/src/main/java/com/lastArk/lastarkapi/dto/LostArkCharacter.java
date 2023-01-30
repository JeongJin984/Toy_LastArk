package com.lastArk.lastarkapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LostArkCharacter {
    private String ServerName;
    private String CharacterName;
    private Integer CharacterLevel;
    private String CharacterClassName;
    private String ItemAvgLevel;
    private String ItemMaxLevel;
}
