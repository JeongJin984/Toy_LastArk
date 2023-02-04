package com.lastArk.lastarkapi.db.repository.userRadeApply;

import com.lastArk.lastarkapi.db.domain.Rade;
import com.lastArk.lastarkapi.db.domain.UserRadeApply;
import com.lastArk.lastarkapi.db.domain.etc.RadeInfo;
import com.lastArk.lastarkapi.dto.RadeApplicationDTO;
import com.lastArk.lastarkapi.dto.RadeDTO;
import com.lastArk.lastarkapi.dto.RadeInfoDTO;
import com.lastArk.lastarkapi.dto.RadeMemberDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class UserRadeApplyRepositoryImpl implements UserRadeApplyRepositoryCustom {
    private final EntityManager entityManager;

    @Override
    public List<RadeDTO> getAppliedRade(String username, String state) {
        List<UserRadeApply> resultList = entityManager.createQuery("select ura from UserRadeApply ura join fetch ura.writer w join fetch ura.rade r where w.username=?1 and ura.state=?2", UserRadeApply.class)
                .setParameter(1, username)
                .setParameter(2, state)
                .getResultList();

        Map<RadeDTO, List<RadeApplicationDTO>> map = new HashMap<>();
        for(UserRadeApply apply : resultList) {
            Rade curRade = apply.getRade();
            RadeInfo curRadeInfo = curRade.getRaidInfo();
            RadeDTO result = new RadeDTO(curRade.getRadeId(), curRade.getTitle(), curRade.getContent(), curRade.getCreatedAt(), curRade.getStartAt(), new RadeInfoDTO(curRadeInfo.getMinLevel(), curRadeInfo.getMaxMemberNum(), curRadeInfo.getBossName(), new RadeMemberDTO(curRadeInfo.getRadeMaster().getCharacterName(), curRadeInfo.getRadeMaster().getItemLevel(), curRadeInfo.getRadeMaster().getState(), apply.getIsMaster())), new ArrayList<>(), apply.getWriter());
            map.computeIfAbsent(result, k -> new ArrayList<>());
            map.get(result).add(new RadeApplicationDTO(apply.getApplyId(), apply.getCharacterInfo().getCharacterName(), apply.getCharacterInfo().getItemLevel(), apply.getWriter().getUsername(), apply.getState(), apply.getRade().getRadeId(), apply.getCreatedAt()));
        }

        List<RadeDTO> radeDTOS = new ArrayList<>();
        for(RadeDTO key : map.keySet()) {
            radeDTOS.add(key);
            for(RadeApplicationDTO apply : map.get(key)) {
                key.getApply().add(apply);
            }
        }

        return radeDTOS;
    }

    @Override
    @Transactional
    public List<UserRadeApply> getRadeAppliesByRadeId(Long radeId) {
        return entityManager.createQuery("select ur from UserRadeApply ur join fetch Rade r join fetch UserInfo u where r.radeId=?1 order by ur.createdAt ASC", UserRadeApply.class)
                .getResultList();
    }

    @Override
    public void updateRadeApplyState(Long applyId, String state) {
        entityManager.createQuery("update UserRadeApply ur set ur.state = ?1 where ur.applyId = ?2")
                .setParameter(1, state)
                .setParameter(2, applyId)
                .executeUpdate();
    }

    @Override
    public List<UserRadeApply> getRadeWithApply(String username, String state) {
        return entityManager.createQuery("select ur from UserRadeApply ur join fetch ur.writer w join fetch ur.rade r where w.username=?1 and ur.state=?2 ", UserRadeApply.class)
                .setParameter(1, username)
                .getResultList();
    }
}
