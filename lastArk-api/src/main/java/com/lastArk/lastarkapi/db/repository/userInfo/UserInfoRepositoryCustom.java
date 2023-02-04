package com.lastArk.lastarkapi.db.repository.userInfo;

import org.springframework.transaction.annotation.Transactional;

public interface UserInfoRepositoryCustom {
    @Transactional
    void insertUserInfo(String username, String repCharacter);
}
