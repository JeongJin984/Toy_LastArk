package com.lastArk.lastarkapi.db.repository.userInfo;

import com.lastArk.lastarkapi.db.domain.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class UserInfoRepositoryImpl implements UserInfoRepositoryCustom{
    private final EntityManager entityManager;

    @Override
    @Transactional
    public void insertUserInfo(String username, String repCharacter) {
        entityManager.persist(new UserInfo(username, repCharacter, null));
    }
}
