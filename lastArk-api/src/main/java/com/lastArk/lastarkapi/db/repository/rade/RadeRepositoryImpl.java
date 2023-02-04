package com.lastArk.lastarkapi.db.repository.rade;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lastArk.lastarkapi.db.domain.Rade;
import com.lastArk.lastarkapi.db.domain.UserInfo;
import com.lastArk.lastarkapi.db.domain.UserRadeApply;
import com.lastArk.lastarkapi.db.domain.etc.RadeInfo;
import com.lastArk.lastarkapi.db.domain.etc.RadeMember;
import com.lastArk.lastarkapi.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
public class RadeRepositoryImpl implements RadeRepositoryCustom{
    private final EntityManager entityManager;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    public List<RadeDTO> getRadeListByDate(LocalDate startTime) {
        List<Rade> resultList = entityManager.createQuery("select distinct r from Rade r join fetch r.applies join fetch r.writer where r.startAt between ?1 and ?2 order by r.createdAt DESC", Rade.class)
                .setParameter(1, startTime.atStartOfDay())
                .setParameter(2, startTime.plusDays(1).atStartOfDay())
                .getResultList();

        List<RadeDTO> radeList = resultList.stream().map(v -> {
            RadeInfo result = v.getRaidInfo();
            RadeMember radeMaster = result.getRadeMaster();
            return new RadeDTO(
                    v.getRadeId(),
                    v.getTitle(),
                    v.getContent(),
                    v.getCreatedAt(),
                    v.getStartAt(),
                    new RadeInfoDTO(
                            result.getMinLevel(),
                            result.getMaxMemberNum(),
                            result.getBossName(),
                            new RadeMemberDTO(
                                    radeMaster.getCharacterName(),
                                    radeMaster.getItemLevel(),
                                    radeMaster.getState(),
                                    radeMaster.getIsMaster()
                            )
                    ),
                    v.getApplies().stream().map(v2 -> {
                        RadeMember radeMemberDTO = v2.getCharacterInfo();
                        return new RadeApplicationDTO(v2.getApplyId(), radeMemberDTO.getCharacterName(), radeMemberDTO.getItemLevel(), v2.getWriter().getUsername(), v2.getState(), v.getRadeId(), v2.getCreatedAt());

                    }).toList(),
                    new UserInfo(v.getWriter().getUsername(), v.getWriter().getRepCharacterName(), null)
            );
        }).toList();

        return radeList;
    }

    @Override
    @Transactional
    public Rade postRade(RadePostDTO radePost) throws JsonProcessingException {
        Rade rade = new Rade(
                null,
                radePost.getTitle(),
                radePost.getContent(),
                LocalDateTime.now(),
                LocalDateTime.parse(radePost.getStartAt(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")),
                new RadeInfo(
                    null,
                    radePost.getMaxNum(),
                    radePost.getBossName(),
                    new RadeMember(radePost.getRadeMasterName(), null, "fixed", true)
                ),
                new UserInfo(radePost.getWriter(), null, null),
                new ArrayList<>()
                );

        entityManager.persist(rade);

        UserRadeApply applyMaster = new UserRadeApply(
                null,
                new UserInfo(radePost.getWriter(), null, null),
                rade,
                "fixed",
                new RadeMember(radePost.getRadeMasterName(), null, "fixed", true),
                false,
                LocalDateTime.now()
        );
        rade.getApplies().add(applyMaster);
        entityManager.persist(applyMaster);

        if(StringUtils.hasText(radePost.getMembers())) {
            Arrays.stream(radePost.getMembers().split("/"))
                    .forEach(v -> {
                        UserRadeApply applyMember = new UserRadeApply(
                                null,
                                new UserInfo(radePost.getWriter(), null, null),
                                rade,
                                "fixed",
                                new RadeMember(v, null, "fixed", true),
                                false,
                                LocalDateTime.now()
                        );
                        rade.getApplies().add(applyMember);
                        entityManager.persist(applyMember);
                    });
        }

        return rade;
    }
}
