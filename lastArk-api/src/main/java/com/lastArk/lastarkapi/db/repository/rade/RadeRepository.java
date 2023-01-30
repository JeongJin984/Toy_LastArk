package com.lastArk.lastarkapi.db.repository.rade;

import com.lastArk.lastarkapi.db.domain.Rade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RadeRepository extends JpaRepository<Rade, Long>, RadeRepositoryCustom {
}
