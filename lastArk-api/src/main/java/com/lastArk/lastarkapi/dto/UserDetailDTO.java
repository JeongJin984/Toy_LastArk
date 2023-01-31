package com.lastArk.lastarkapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailDTO {
    private List<FullUser.UserLostArkProfile> userLostArkProfile = new ArrayList<>();
    private List<LostArkCharacter> userLostArkCharacters = new ArrayList<>();
}
