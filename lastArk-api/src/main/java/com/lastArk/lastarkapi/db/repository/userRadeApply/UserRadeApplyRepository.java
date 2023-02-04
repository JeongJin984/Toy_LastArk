package com.lastArk.lastarkapi.db.repository.userRadeApply;

import com.lastArk.lastarkapi.db.domain.UserRadeApply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRadeApplyRepository extends JpaRepository<UserRadeApply, Long>, UserRadeApplyRepositoryCustom {
}
