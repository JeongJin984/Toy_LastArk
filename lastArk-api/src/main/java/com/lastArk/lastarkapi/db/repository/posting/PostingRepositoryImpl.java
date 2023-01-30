package com.lastArk.lastarkapi.db.repository.posting;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lastArk.lastarkapi.db.domain.Posting;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.TypedQuery;
import java.util.List;

@RequiredArgsConstructor
public class PostingRepositoryImpl implements PostingRepositoryCustom {
    private final EntityManager entityManager;
    private final ObjectMapper mapper;

    @Override
    public List<Posting> getPosting(int offset, int size) throws JsonProcessingException {
        TypedQuery<Posting> query = entityManager.createQuery(
                "select p from Posting p inner join fetch p.writer u order by p.createdAt ASC", Posting.class);

        List<Posting> postings = query
                .setFirstResult(offset)
                .setMaxResults(size)
                .getResultList();

        return postings;
    }
}
