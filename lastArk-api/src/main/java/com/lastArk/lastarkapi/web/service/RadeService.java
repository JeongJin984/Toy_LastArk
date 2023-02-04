package com.lastArk.lastarkapi.web.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lastArk.lastarkapi.db.domain.Rade;
import com.lastArk.lastarkapi.db.domain.UserInfo;
import com.lastArk.lastarkapi.db.domain.UserRadeApply;
import com.lastArk.lastarkapi.db.domain.etc.RadeMember;
import com.lastArk.lastarkapi.db.repository.rade.RadeRepository;
import com.lastArk.lastarkapi.db.repository.userRadeApply.UserRadeApplyRepository;
import com.lastArk.lastarkapi.dto.RadeApplicationDTO;
import com.lastArk.lastarkapi.dto.RadeDTO;
import com.lastArk.lastarkapi.dto.RadeMemberDTO;
import com.lastArk.lastarkapi.dto.RadePostDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RadeService {
    private final RadeRepository radeRepository;
    private final UserRadeApplyRepository radeApplyRepository;
    private final ObjectMapper objectMapper;

    @Transactional
    public void acceptRadeApply(Long applyId) {
        radeApplyRepository.updateRadeApplyState(applyId, "fixed");
    }

    @Transactional
    public void rejectRadeApply(Long applyId) {radeApplyRepository.updateRadeApplyState(applyId, "rejected");}

    @Transactional
    public void abortRadeMember(Long applyId) {
        radeApplyRepository.deleteById(applyId);
    }

    @Transactional
    public void cancelRadeApply(Long applyId) {
        radeApplyRepository.deleteById(applyId);
    }

    @Transactional
    public void cancelRade(Long radeId) {
        radeRepository.deleteById(radeId);
    }

    public List<RadeApplicationDTO> getRadeApplications(Long radeId) {
        List<UserRadeApply> result = radeApplyRepository.getRadeAppliesByRadeId(radeId);

        return result.stream().map(v -> {
            RadeMember radeMember = v.getCharacterInfo();
            return new RadeApplicationDTO(v.getApplyId(), radeMember.getCharacterName(), radeMember.getItemLevel(), v.getWriter().getUsername(), v.getState(), v.getRade().getRadeId(), v.getCreatedAt());
        }).toList();
    }

    @Transactional
    public RadeApplicationDTO postRadeApplication(RadeApplicationDTO radeApplicationDTO) {
        UserRadeApply apply = radeApplyRepository.save(new UserRadeApply(
                null,
                new UserInfo(radeApplicationDTO.getUsername(), radeApplicationDTO.getCharacterName(), null),
                new Rade(radeApplicationDTO.getRadeId(), null, null, null, null, null, null, null),
                "pending",
                new RadeMember(radeApplicationDTO.getCharacterName(), radeApplicationDTO.getItemLevel(), "pending", false),
                false,
                LocalDateTime.now()
        ));
        radeApplicationDTO.setApplyId(apply.getApplyId());
        return radeApplicationDTO;
    }

    public List<RadeDTO> getRadeByStartTime(LocalDate startTime) {
        return radeRepository.getRadeListByDate(startTime);
    }

    public Rade postRade(RadePostDTO radePost) throws JsonProcessingException {
        return radeRepository.postRade(radePost);
    }
}
