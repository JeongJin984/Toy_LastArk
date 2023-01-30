package com.lastArk.lastarkapi.db.domain.etc;

import java.util.ArrayList;
import java.util.List;

public class RaidInfo {
    private Integer minLevel;
    private String raidMaster;
    private List<RaidMember> raidMembers = new ArrayList<>();
}
