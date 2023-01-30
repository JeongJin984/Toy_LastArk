package com.lastArk.lastarkapi.db.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posting")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Posting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postingId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private String guildName;
    private String category;

    @ManyToOne(targetEntity = UserInfo.class)
    @JoinColumn(name = "writer_id")
    private UserInfo writer;

    @OneToMany(mappedBy = "posting", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<PostingComment> comments = new ArrayList<>();
}
