package com.lastArk.lastarkapi.db.repository.rade;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lastArk.lastarkapi.db.domain.Rade;
import com.lastArk.lastarkapi.db.domain.UserInfo;
import com.lastArk.lastarkapi.dto.RadeDTO;
import com.lastArk.lastarkapi.dto.RadeInfoDTO;
import com.lastArk.lastarkapi.dto.RadeMemberDTO;
import com.lastArk.lastarkapi.dto.RadePostDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
public class RadeRepositoryImpl implements RadeRepositoryCustom{
    private final EntityManager entityManager;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    public List<RadeDTO> getRadeListByDate(LocalDate startTime) {
        List<Rade> resultList = entityManager.createQuery("select r from Rade r where r.startAt between ?1 and ?2 order by r.createdAt DESC", Rade.class)
                .setParameter(1, startTime.atStartOfDay())
                .setParameter(2, startTime.plusDays(1).atStartOfDay())
                .getResultList();

        List<RadeDTO> radeList = resultList.stream().map(v -> {
            try {
                RadeInfoDTO result = objectMapper.readValue(v.getRaidInfo(), RadeInfoDTO.class);
                return new RadeDTO(v.getRadeId(), v.getTitle(), v.getContent(), v.getCreatedAt(), v.getStartAt(), result, v.getWriter());
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                throw new IllegalArgumentException("deserializing to radedto has been failed!!!");
            }
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
                objectMapper.writeValueAsString(
                        new RadeInfoDTO(
                                1500,
                                8, "비아 하드",
                                new RadeMemberDTO(radePost.getRadeMasterName(), null),
                                Arrays.stream(radePost.getMembers().split("/"))
                                        .map(v -> new RadeMemberDTO(v, null)).toList()
                        )
                ),
                objectMapper.writeValueAsString(List.of("COVAX", "TVAX", "RVAX")),
                new UserInfo(radePost.getUserId(), null, null, null, null),
                null);

        entityManager.persist(rade);
        return rade;
    }
}
