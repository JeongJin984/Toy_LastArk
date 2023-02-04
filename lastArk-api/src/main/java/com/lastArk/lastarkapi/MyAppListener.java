package com.lastArk.lastarkapi;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lastArk.lastarkapi.db.domain.*;
import com.lastArk.lastarkapi.db.domain.etc.RadeInfo;
import com.lastArk.lastarkapi.db.domain.etc.RadeMember;
import com.lastArk.lastarkapi.dto.RadeInfoDTO;
import com.lastArk.lastarkapi.dto.RadeMemberDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;


//@Component
@RequiredArgsConstructor
public class MyAppListener implements ApplicationListener<ApplicationStartedEvent> {
    private final EntityManager em;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    public void onApplicationEvent(ApplicationStartedEvent event) {
        List<UserInfo> testUsers = List.of(
                new UserInfo("test1", "COVAX", null),
                new UserInfo("test2", "COVAX", null),
                new UserInfo("test3", "COVAX", null)
        );

        List<Rade> testRade = List.of(
                new Rade(null, "발탄 레이드 모집함", "15++", LocalDateTime.now(), LocalDateTime.now(), new RadeInfo(1500, 8, "발탄 하드", new RadeMember("COVAX", 1507, "fixed", true)), testUsers.get(0), null),
                new Rade(null, "쿠크 레이드 모집함", "15++", LocalDateTime.now(), LocalDateTime.now(), new RadeInfo(1500, 8, "쿠크 노말", new RadeMember("COVAX", 1507, "fixed", true)), testUsers.get(0), null ),
                new Rade(null, "아브 하드 레이드 모집함", "15++", LocalDateTime.now(), LocalDateTime.now(), new RadeInfo(1500, 8, "아브 하드", new RadeMember("COVAX", 1507, "fixed", true)), testUsers.get(0), null),
                new Rade(null, "아브 노말 레이드 모집함", "15++", LocalDateTime.now(), LocalDateTime.now(), new RadeInfo(1500, 8, "아브 노말", new RadeMember("COVAX", 1507, "fixed", true)), testUsers.get(0), null),
                new Rade(null, "일리아칸 하드 모집함", "15++", LocalDateTime.now(), LocalDateTime.now(), new RadeInfo(1500, 8, "일리아칸 하드", new RadeMember("COVAX", 1507, "fixed", true)), testUsers.get(0), null),
                new Rade(null, "일리아칸 노말", "15++", LocalDateTime.now(), LocalDateTime.now(), new RadeInfo(1500, 8, "일리아칸 노말", new RadeMember("COVAX", 1507, "fixed", true)), testUsers.get(0), null),
                new Rade(null, "비아 하드", "1490++", LocalDateTime.now(), LocalDateTime.now(), new RadeInfo(1500, 8, "비아 하드", new RadeMember("COVAX", 1507, "fixed", true)), testUsers.get(0), null)
        );

        testUsers.forEach(em::persist);
        testRade.forEach(em::persist);
        testRade.forEach(v -> {
            em.persist(new UserRadeApply(null, testUsers.get(0), v, "fixed", new RadeMember("COVAX", 1507, "fixed", true), true, LocalDateTime.now()));
        });

        em.flush();
        em.close();
    }
}
