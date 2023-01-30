package com.lastArk.lastarkapi.web.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lastArk.lastarkapi.db.domain.Rade;
import com.lastArk.lastarkapi.db.repository.rade.RadeRepository;
import com.lastArk.lastarkapi.dto.RadeDTO;
import com.lastArk.lastarkapi.dto.RadePostDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RadeService {
    private final RadeRepository radeRepository;

    public List<RadeDTO> getRadeByStartTime(LocalDate startTime) {
        return radeRepository.getRadeListByDate(startTime);
    }
    public Rade postRade(RadePostDTO radePost) throws JsonProcessingException {
        return radeRepository.postRade(radePost);
    }
}
