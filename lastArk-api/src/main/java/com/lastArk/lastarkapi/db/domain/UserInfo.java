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
    private String userId;

    @Column(unique = true)
    private String username;
    private String repCharacter;
    private String profileImage;
    private String password;

    @OneToMany(mappedBy = "writer", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Posting> posts = new ArrayList<>();

}