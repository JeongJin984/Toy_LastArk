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
@TypeDef(name = "json", typeClass = JsonType.class)
@MappedSuperclass
public class RadeMember implements Serializable {
    private String characterName;
    private Integer itemLevel;
    private String state;
    private Boolean isMaster;
}
