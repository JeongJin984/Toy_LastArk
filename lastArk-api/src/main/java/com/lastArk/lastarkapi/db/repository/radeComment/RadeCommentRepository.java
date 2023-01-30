package com.lastArk.lastarkapi.db.repository.radeComment;

import com.lastArk.lastarkapi.db.domain.Rade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RadeCommentRepository extends JpaRepository<Rade, Long>, RadeCommentRepositoryCustom {
}
