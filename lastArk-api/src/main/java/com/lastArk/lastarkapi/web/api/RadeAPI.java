package com.lastArk.lastarkapi.web.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lastArk.lastarkapi.db.domain.Rade;
import com.lastArk.lastarkapi.dto.RadeApplicationDTO;
import com.lastArk.lastarkapi.dto.RadeDTO;
import com.lastArk.lastarkapi.dto.RadePostDTO;
import com.lastArk.lastarkapi.web.service.RadeService;
import lombok.RequiredArgsConstructor;
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

    @PostMapping("/rade/apply")
    public RadeApplicationDTO postRadeApply(@RequestBody RadeApplicationDTO radeApplication) throws JsonProcessingException {
        return radeService.postRadeApplication(radeApplication);
    }

    @GetMapping("/rade/apply")
    public List<RadeApplicationDTO> getRadeApply(@RequestParam Long radeId) throws JsonProcessingException {
        return radeService.getRadeApplications(radeId);
    }

    @PostMapping("/rade/apply/reject")
    public void postApplyReject(@RequestBody ApplyInfo applyInfo) throws JsonProcessingException {
        radeService.rejectRadeApply(applyInfo.applyId);
    }

    @PostMapping("/rade/abort")
    public void postRadeMemberAbort(@RequestBody ApplyInfo applyInfo) throws JsonProcessingException {
        radeService.abortRadeMember(applyInfo.applyId);
    }

    @PostMapping("/rade/apply/cancel")
    public void postRadeApplyCancel(@RequestBody ApplyInfo applyInfo) throws JsonProcessingException {
        radeService.cancelRadeApply(applyInfo.applyId);
    }

    @PostMapping("/rade/cancel")
    public void postRadeCancel(@RequestBody RadeInfo radeInfo) throws JsonProcessingException {
        radeService.cancelRade(radeInfo.radeId);
    }

    @PostMapping("/rade/apply/accept")
    public void postRadeApplyAccept(@RequestBody ApplyInfo applyInfo) throws JsonProcessingException {
        radeService.acceptRadeApply(applyInfo.applyId);
    }

    record ApplyInfo(Long applyId) {}
    record RadeInfo(Long radeId) {}
}
