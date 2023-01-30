package com.lastArk.lastarkapi.db.repository.rade;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lastArk.lastarkapi.db.domain.Rade;
import com.lastArk.lastarkapi.dto.RadeDTO;
import com.lastArk.lastarkapi.dto.RadePostDTO;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface RadeRepositoryCustom {
    List<RadeDTO> getRadeListByDate(LocalDate startTime);

    @Transactional
    Rade postRade(RadePostDTO radePost) throws JsonProcessingException;
}
