package com.lastArk.lastarkapi.db.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "posting_comment")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PostingComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    private String content;
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "parentComment", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<PostingComment> nestedComment;

    @ManyToOne(targetEntity = PostingComment.class)
    @JoinColumn(name = "parent_comment_id")
    private PostingComment parentComment;

    @ManyToOne(targetEntity = UserInfo.class)
    @JoinColumn(name = "writer_id")
    private UserInfo writer;

    @ManyToOne(targetEntity = Posting.class)
    @JoinColumn(name = "posting_id")
    private Posting posting;
}
