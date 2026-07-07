package com.innovation.repository;

import com.innovation.entity.IdeaDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeaDocumentRepository extends JpaRepository<IdeaDocument, Long> {

    List<IdeaDocument> findByIdeaId(Long ideaId);
    
    List<IdeaDocument> findByIdeaIdAndDocumentType(Long ideaId, String documentType);
    
    void deleteByIdeaId(Long ideaId);
}
