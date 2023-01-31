package com.lastArk.lastarkapi.db.repository.userInfo;

import com.lastArk.lastarkapi.db.domain.UserInfo;
import org.springframework.transaction.annotation.Transactional;

public interface UserInfoRepositoryCustom {
    @Transactional
    void insertUserInfo(String userId, String username, String repCharacter, String profileImage);
}
