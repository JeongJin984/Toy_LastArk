package com.lastArk.lastarkapi.db.domain;

import com.lastArk.lastarkapi.db.domain.etc.RadeMember;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_rade_apply")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRadeApply extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserInfo writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rade_id")
    private Rade rade;
    private String state;
    @Type(type = "json")
    @Column(columnDefinition = "json")
    private RadeMember characterInfo;
    private Boolean isMaster;
    private LocalDateTime createdAt;
}
