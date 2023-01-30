package com.lastArk.lastarkapi.web.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lastArk.lastarkapi.db.domain.Posting;
import com.lastArk.lastarkapi.db.repository.posting.PostingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostingService {
    private final PostingRepository postingRepository;
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;

    public List<Posting> getPostingPage(Integer pageNum, Integer pageSize) throws JsonProcessingException {
        List<Posting> posting = postingRepository.getPosting(pageNum, pageSize);
        return posting;
    }
}
