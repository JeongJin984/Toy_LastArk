package com.lastArk.lastarkapi.db.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rade")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Rade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long radeId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime startAt;
    private String raidInfo;
    private String apply;

    @ManyToOne(targetEntity = UserInfo.class)
    @JoinColumn(name = "writer_id")
    private UserInfo writer;

    @OneToMany(mappedBy = "rade", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<RadeComment> comments = new ArrayList<>();


}
