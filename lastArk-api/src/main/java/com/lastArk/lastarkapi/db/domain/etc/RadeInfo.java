package com.lastArk.lastarkapi.db.domain.etc;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.TypeDef;

import javax.persistence.MappedSuperclass;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RadeInfo implements Serializable {
    private Integer minLevel;
    private Integer maxMemberNum;
    private String bossName;
    private RadeMember radeMaster;
}
