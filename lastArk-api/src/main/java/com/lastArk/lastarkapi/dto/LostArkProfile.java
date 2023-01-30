package com.lastArk.lastarkapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LostArkProfile {
    private String CharacterImage;
    private Integer ExpeditionLevel;
    private String PvpGradeName;
    private Integer TownLevel;
    private String TownName;
    private String Title;
    private String GuildMemberGrade;
    private String GuildName;
    private Integer UsingSkillPoint;
    private Integer TotalSkillPoint;
    private List<Stats> Stats = new ArrayList<>();
    private List<Tendencies> Tendencies = new ArrayList<>();
    private String ServerName;
    private String CharacterName;
    private Integer CharacterLevel;
    private String CharacterClassName;
    private String ItemAvgLevel;
    private String ItemMaxLevel;

    static class Stats {
        private String Type;
        private String Value;
        private List<String> Tooltip;
    }

    static class Tendencies {
        private String Type;
        private Integer Point;
        private Integer MaxPoint;
    }
}
