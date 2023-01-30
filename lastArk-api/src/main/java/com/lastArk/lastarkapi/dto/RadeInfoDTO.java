package com.lastArk.lastarkapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RadeInfoDTO {
    private Integer minLevel;
    private Integer maxMemberNum;
    private String bossName;
    private RadeMemberDTO radeMaster;
    private List<RadeMemberDTO> radeMembers;
}
