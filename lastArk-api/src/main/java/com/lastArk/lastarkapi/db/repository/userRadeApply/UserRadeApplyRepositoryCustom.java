package com.lastArk.lastarkapi.db.repository.userRadeApply;

import com.lastArk.lastarkapi.db.domain.UserRadeApply;
import com.lastArk.lastarkapi.dto.RadeDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRadeApplyRepositoryCustom {
    List<RadeDTO> getAppliedRade(String username, String state);

    @Transactional
    List<UserRadeApply> getRadeAppliesByRadeId(Long radeId);

    void updateRadeApplyState(Long applyId, String state);

    List<UserRadeApply> getRadeWithApply(String username, String state);
}
