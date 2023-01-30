package com.lastArk.lastarkapi.web.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lastArk.lastarkapi.db.domain.Posting;
import com.lastArk.lastarkapi.web.service.PostingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommunityAPI {
    private final PostingService postingService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/postings")
    public List<Posting> postings() throws JsonProcessingException {
        List<Posting> postingPage = postingService.getPostingPage(2, 3);

        return postingPage;
    }
}
