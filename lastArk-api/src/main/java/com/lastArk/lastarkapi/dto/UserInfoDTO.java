package com.lastArk.lastarkapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDTO {
    private String userId;
    private String username;
    private String repCharacter;
    private String profileImage;
}
