package com.lastArk.lastarkapi;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lastArk.lastarkapi.db.domain.*;
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
        try {
            List<UserInfo> testUsers = List.of(
                    new UserInfo("test111", "test1", "image1", null),
                    new UserInfo("test222", "test2", "image2", null),
                    new UserInfo("test333", "test3", "image3", null)
            );

            List<Posting> testPostings = List.of(
                    new Posting(null, "test1", "content", LocalDateTime.now(), "testGuild", "humor", testUsers.get(0), null),
                    new Posting(null, "test2", "content", LocalDateTime.now(), "testGuild", "humor", testUsers.get(1), null),
                    new Posting(null, "test3", "content", LocalDateTime.now(), "testGuild", "humor", testUsers.get(2), null),
                    new Posting(null, "test4", "content", LocalDateTime.now(), "testGuild", "humor", testUsers.get(0), null),
                    new Posting(null, "test5", "content", LocalDateTime.now(), "testGuild", "humor", testUsers.get(1), null),
                    new Posting(null, "test6", "content", LocalDateTime.now(), "testGuild", "humor", testUsers.get(2), null),
                    new Posting(null, "test7", "content", LocalDateTime.now(), "testGuild", "humor", testUsers.get(0), null),
                    new Posting(null, "test8", "content", LocalDateTime.now(), "testGuild", "humor", testUsers.get(1), null),
                    new Posting(null, "test9", "content", LocalDateTime.now(), "testGuild", "humor", testUsers.get(2), null),
                    new Posting(null, "test10", "content", LocalDateTime.now(), "testGuild", "humor", testUsers.get(0), null),
                    new Posting(null, "test11", "content", LocalDateTime.now(), "testGuild", "humor", testUsers.get(1), null),
                    new Posting(null, "test12", "content", LocalDateTime.now(), "testGuild", "humor", testUsers.get(2), null)
            );

            List<PostingComment> testParentPostingComments = List.of(
                    new PostingComment(null, "testComment1", LocalDateTime.now(), null, null, testUsers.get(0), testPostings.get(0)),
                    new PostingComment(null, "testComment2", LocalDateTime.now(), null, null, testUsers.get(1), testPostings.get(0)),
                    new PostingComment(null, "testComment3", LocalDateTime.now(), null, null, testUsers.get(2), testPostings.get(0)),
                    new PostingComment(null, "testComment4", LocalDateTime.now(), null, null, testUsers.get(0), testPostings.get(0)),
                    new PostingComment(null, "testComment5", LocalDateTime.now(), null, null, testUsers.get(1), testPostings.get(0)),
                    new PostingComment(null, "testComment6", LocalDateTime.now(), null, null, testUsers.get(2), testPostings.get(0)),
                    new PostingComment(null, "testComment7", LocalDateTime.now(), null, null, testUsers.get(0), testPostings.get(0)),
                    new PostingComment(null, "testComment8", LocalDateTime.now(), null, null, testUsers.get(1), testPostings.get(0)),
                    new PostingComment(null, "testComment9", LocalDateTime.now(), null, null, testUsers.get(2), testPostings.get(0))
            );

            List<PostingComment> testNestedPostingComments = List.of(
                    new PostingComment(null, "testComment1", LocalDateTime.now(), null, testParentPostingComments.get(0), testUsers.get(1), testPostings.get(0)),
                    new PostingComment(null, "testComment2", LocalDateTime.now(), null, testParentPostingComments.get(1), testUsers.get(2), testPostings.get(0)),
                    new PostingComment(null, "testComment3", LocalDateTime.now(), null, testParentPostingComments.get(2), testUsers.get(0), testPostings.get(0)),
                    new PostingComment(null, "testComment4", LocalDateTime.now(), null, testParentPostingComments.get(0), testUsers.get(1), testPostings.get(0)),
                    new PostingComment(null, "testComment5", LocalDateTime.now(), null, testParentPostingComments.get(1), testUsers.get(2), testPostings.get(0)),
                    new PostingComment(null, "testComment6", LocalDateTime.now(), null, testParentPostingComments.get(2), testUsers.get(0), testPostings.get(0)),
                    new PostingComment(null, "testComment7", LocalDateTime.now(), null, testParentPostingComments.get(0), testUsers.get(0), testPostings.get(0)),
                    new PostingComment(null, "testComment8", LocalDateTime.now(), null, testParentPostingComments.get(1), testUsers.get(1), testPostings.get(0)),
                    new PostingComment(null, "testComment9", LocalDateTime.now(), null, testParentPostingComments.get(2), testUsers.get(2), testPostings.get(0))
            );

            List<Rade> testRade = List.of(
                    new Rade(null, "?????? ????????? ?????????", "15++", LocalDateTime.now(), LocalDateTime.now(), objectMapper.writeValueAsString(new RadeInfoDTO(1500, 8, "?????? ??????", new RadeMemberDTO("COVAX", "1507"), List.of(new RadeMemberDTO("COVAX", "1507")))), testUsers.get(0), null),
                    new Rade(null, "?????? ????????? ?????????", "15++", LocalDateTime.now(), LocalDateTime.now(), objectMapper.writeValueAsString(new RadeInfoDTO(1500, 8, "?????? ??????", new RadeMemberDTO("COVAX", "1507"), List.of(new RadeMemberDTO("COVAX", "1507")))), testUsers.get(0), null),
                    new Rade(null, "?????? ?????? ????????? ?????????", "15++", LocalDateTime.now(), LocalDateTime.now(), objectMapper.writeValueAsString(new RadeInfoDTO(1500, 8, "?????? ??????", new RadeMemberDTO("COVAX", "1507"), List.of(new RadeMemberDTO("COVAX", "1507")))), testUsers.get(0), null),
                    new Rade(null, "?????? ?????? ????????? ?????????", "15++", LocalDateTime.now(), LocalDateTime.now(), objectMapper.writeValueAsString(new RadeInfoDTO(1500, 8, "?????? ??????", new RadeMemberDTO("COVAX", "1507"), List.of(new RadeMemberDTO("COVAX", "1507")))), testUsers.get(0), null),
                    new Rade(null, "???????????? ?????? ?????????", "15++", LocalDateTime.now(), LocalDateTime.now(), objectMapper.writeValueAsString(new RadeInfoDTO(1500, 8, "???????????? ??????", new RadeMemberDTO("COVAX", "1507"), List.of(new RadeMemberDTO("COVAX", "1507")))), testUsers.get(0), null),
                    new Rade(null, "???????????? ??????", "15++", LocalDateTime.now(), LocalDateTime.now(), objectMapper.writeValueAsString(new RadeInfoDTO(1500, 8, "???????????? ??????", new RadeMemberDTO("COVAX", "1507"), List.of(new RadeMemberDTO("COVAX", "1507")))), testUsers.get(0), null),
                    new Rade(null, "?????? ??????", "1490++", LocalDateTime.now(), LocalDateTime.now(), objectMapper.writeValueAsString(new RadeInfoDTO(1500, 8, "?????? ??????", new RadeMemberDTO("COVAX", "1507"), List.of(new RadeMemberDTO("COVAX", "1507")))), testUsers.get(0), null)
            );

            List<RadeComment> testRadeComment = List.of(
                    new RadeComment(null, "?????? ?????????", objectMapper.writeValueAsString(List.of(new RadeMemberDTO("COVAX", "1504"), new RadeMemberDTO("RVAX", "1504"))), LocalDateTime.now(), testUsers.get(1), testRade.get(0)),
                    new RadeComment(null, "?????? ?????????", objectMapper.writeValueAsString(List.of(new RadeMemberDTO("COVAX", "1504"), new RadeMemberDTO("RVAX", "1504"))), LocalDateTime.now(), testUsers.get(1), testRade.get(0)),
                    new RadeComment(null, "?????? ?????????", objectMapper.writeValueAsString(List.of(new RadeMemberDTO("COVAX", "1504"), new RadeMemberDTO("RVAX", "1504"))), LocalDateTime.now(), testUsers.get(1), testRade.get(0)),
                    new RadeComment(null, "?????? ?????????", objectMapper.writeValueAsString(List.of(new RadeMemberDTO("COVAX", "1504"), new RadeMemberDTO("RVAX", "1504"))), LocalDateTime.now(), testUsers.get(1), testRade.get(0)),
                    new RadeComment(null, "?????? ?????????", objectMapper.writeValueAsString(List.of(new RadeMemberDTO("COVAX", "1504"), new RadeMemberDTO("RVAX", "1504"))), LocalDateTime.now(), testUsers.get(1), testRade.get(0))

            );

            testUsers.forEach(em::persist);
            testPostings.forEach(em::persist);
            testParentPostingComments.forEach(em::persist);
            testNestedPostingComments.forEach(em::persist);
            testRade.forEach(em::persist);
            testRadeComment.forEach(em::persist);

            em.flush();
            em.close();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
