package com.lastArk.lastarkapi.db.repository.posting;

import com.lastArk.lastarkapi.db.domain.Posting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostingRepository extends JpaRepository<Posting, Long>, PostingRepositoryCustom {
}
