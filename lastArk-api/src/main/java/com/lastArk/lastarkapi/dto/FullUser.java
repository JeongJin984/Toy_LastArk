package com.lastArk.lastarkapi.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class FullUser {
    private String username;
    private String repCharacterName;

    private List<UserLostArkProfile> userLostArkProfile = new ArrayList<>();
    private List<LostArkCharacter> userLostArkCharacters = new ArrayList<>();

    public void setLostArkProfile(List<UserLostArkProfile> lostArkProfile) {
        this.userLostArkProfile = lostArkProfile;
    }

    public record UserLostArkProfile(
            String serverName,
            String characterName,
            String characterImage,
            String guildName,
            String GuildMemberGrade,
            String characterClassName
    ) {}
}
