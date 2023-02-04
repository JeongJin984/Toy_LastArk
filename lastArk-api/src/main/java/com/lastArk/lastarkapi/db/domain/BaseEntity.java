package com.lastArk.lastarkapi.db.domain;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import org.hibernate.annotations.TypeDef;

import javax.persistence.MappedSuperclass;

@TypeDef(name = "json", typeClass = JsonType.class)
@MappedSuperclass
public class BaseEntity {

}