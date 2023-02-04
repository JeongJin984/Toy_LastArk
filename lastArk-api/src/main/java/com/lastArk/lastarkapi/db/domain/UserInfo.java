package com.lastArk.lastarkapi.db.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user_info")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {
    @Id
    private String username;
    private String repCharacterName;

    @OneToMany(mappedBy = "writer", fetch = FetchType.LAZY)
    @JsonIgnore
    List<UserRadeApply> list = new ArrayList<>();
}