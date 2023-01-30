package com.lastArk.lastarkapi.web.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lastArk.lastarkapi.db.domain.Rade;
import com.lastArk.lastarkapi.dto.RadeDTO;
import com.lastArk.lastarkapi.dto.RadePostDTO;
import com.lastArk.lastarkapi.web.service.RadeService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class RadeAPI {
    private final RadeService radeService;

    @GetMapping("/rade")
    public List<RadeDTO> getRade(@RequestParam(required = true) String startTime) {
        LocalDateTime time = LocalDateTime.parse(startTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        return radeService.getRadeByStartTime(time.toLocalDate());
    }

    @PostMapping("/rade")
    public Rade postRade(@RequestBody RadePostDTO radePost) throws JsonProcessingException {
        return radeService.postRade(radePost);
    }
}
