package com.lastArk.lastarkapi.db.repository.comment;

import com.lastArk.lastarkapi.db.domain.PostingComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostingCommentRepository extends JpaRepository<PostingComment, Long>, PostingCommentRepositoryCustom {
}
