package com.lastArk.lastarkapi.db.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lastArk.lastarkapi.db.domain.etc.RadeInfo;
import com.lastArk.lastarkapi.db.domain.etc.RadeMember;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rade")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Rade extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long radeId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime startAt;
    @Type(type = "json")
    @Column(columnDefinition = "json")
    private RadeInfo raidInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    private UserInfo writer;

    @OneToMany(mappedBy = "rade", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<UserRadeApply> applies = new ArrayList<>();
}
