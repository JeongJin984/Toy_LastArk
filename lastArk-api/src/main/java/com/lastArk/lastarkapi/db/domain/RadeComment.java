package com.lastArk.lastarkapi.db.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "rade_comment")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RadeComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    private String content;
    private String raidMember;
    private LocalDateTime createdAt;

    @ManyToOne(targetEntity = UserInfo.class)
    @JoinColumn(name = "writer_id")
    private UserInfo writer;

    @ManyToOne(targetEntity = Rade.class)
    @JoinColumn(name = "rade_id")
    private Rade rade;
}
