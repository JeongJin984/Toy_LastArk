package com.lastArk.lastarkapi.db.repository.posting;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.lastArk.lastarkapi.db.domain.Posting;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PostingRepositoryCustom {
    @Transactional
    List<Posting> getPosting(int offset, int size) throws JsonProcessingException;
}
