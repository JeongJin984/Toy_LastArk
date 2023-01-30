package com.lastArk.lastarkapi.db.repository.userInfo;

import com.lastArk.lastarkapi.db.domain.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, String>, UserInfoRepositoryCustom {
    UserInfo findByUsername(String username);
}
