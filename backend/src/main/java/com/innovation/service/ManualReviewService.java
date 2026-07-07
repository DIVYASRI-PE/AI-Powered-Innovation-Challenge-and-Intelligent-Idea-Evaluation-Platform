package com.innovation.service;

import com.innovation.dto.ManualReviewDTO;
import com.innovation.dto.ManualReviewRequest;
import com.innovation.entity.Idea;
import com.innovation.entity.ManualReview;
import com.innovation.entity.User;
import com.innovation.exception.ResourceNotFoundException;
import com.innovation.repository.IdeaRepository;
import com.innovation.repository.ManualReviewRepository;
import com.innovation.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ManualReviewService {

    private final ManualReviewRepository manualReviewRepository;
    private final IdeaRepository ideaRepository;
    private final UserRepository userRepository;

    public ManualReviewService(ManualReviewRepository manualReviewRepository,
                             IdeaRepository ideaRepository,
                             UserRepository userRepository) {
        this.manualReviewRepository = manualReviewRepository;
        this.ideaRepository = ideaRepository;
        this.userRepository = userRepository;
    }

    public ManualReviewDTO createReview(ManualReviewRequest request, Long reviewerId) {
        Idea idea = ideaRepository.findById(request.getIdeaId())
                .orElseThrow(() -> new ResourceNotFoundException("Idea", "id", request.getIdeaId()));

        User reviewer = userRepository.findById(reviewerId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", reviewerId));

        ManualReview review = new ManualReview();
        review.setIdea(idea);
        review.setReviewer(reviewer);
        review.setOriginalityScore(request.getOriginalityScore());
        review.setInnovationScore(request.getInnovationScore());
        review.setTechnicalFeasibilityScore(request.getTechnicalFeasibilityScore());
        review.setPresentationScore(request.getPresentationScore());
        review.setComments(request.getComments());
        review.setFeedback(request.getFeedback());
        review.setStatus("PENDING");

        ManualReview savedReview = manualReviewRepository.save(review);
        return convertToDTO(savedReview);
    }

    public ManualReviewDTO submitReview(Long reviewId, ManualReviewRequest request, Long reviewerId) {
        ManualReview review = manualReviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review", "id", reviewId));

        if (!review.getReviewer().getId().equals(reviewerId)) {
            throw new RuntimeException("You are not authorized to update this review");
        }

        review.setOriginalityScore(request.getOriginalityScore());
        review.setInnovationScore(request.getInnovationScore());
        review.setTechnicalFeasibilityScore(request.getTechnicalFeasibilityScore());
        review.setPresentationScore(request.getPresentationScore());
        review.setComments(request.getComments());
        review.setFeedback(request.getFeedback());
        review.setOverallScore(calculateOverallScore(request));
        review.setStatus("COMPLETED");
        review.setReviewedAt(LocalDateTime.now());

        ManualReview updatedReview = manualReviewRepository.save(review);
        return convertToDTO(updatedReview);
    }

    public ManualReviewDTO getReviewById(Long id) {
        ManualReview review = manualReviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review", "id", id));
        return convertToDTO(review);
    }

    public List<ManualReviewDTO> getReviewsByReviewer(Long reviewerId) {
        return manualReviewRepository.findByReviewerId(reviewerId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ManualReviewDTO> getReviewsByIdea(Long ideaId) {
        return manualReviewRepository.findByIdeaId(ideaId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ManualReviewDTO> getPendingReviews() {
        return manualReviewRepository.findPendingReviews().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private BigDecimal calculateOverallScore(ManualReviewRequest request) {
        BigDecimal sum = BigDecimal.ZERO;
        int count = 0;

        if (request.getOriginalityScore() != null) {
            sum = sum.add(request.getOriginalityScore());
            count++;
        }
        if (request.getInnovationScore() != null) {
            sum = sum.add(request.getInnovationScore());
            count++;
        }
        if (request.getTechnicalFeasibilityScore() != null) {
            sum = sum.add(request.getTechnicalFeasibilityScore());
            count++;
        }
        if (request.getPresentationScore() != null) {
            sum = sum.add(request.getPresentationScore());
            count++;
        }

        return count > 0 ? sum.divide(BigDecimal.valueOf(count), 2, java.math.RoundingMode.HALF_UP) : BigDecimal.ZERO;
    }

    private ManualReviewDTO convertToDTO(ManualReview review) {
        ManualReviewDTO dto = new ManualReviewDTO();
        dto.setId(review.getId());
        dto.setIdeaId(review.getIdea().getId());
        dto.setIdeaTitle(review.getIdea().getTitle());
        dto.setReviewerId(review.getReviewer().getId());
        dto.setReviewerName(review.getReviewer().getFirstName() + " " + review.getReviewer().getLastName());
        dto.setOriginalityScore(review.getOriginalityScore());
        dto.setInnovationScore(review.getInnovationScore());
        dto.setTechnicalFeasibilityScore(review.getTechnicalFeasibilityScore());
        dto.setPresentationScore(review.getPresentationScore());
        dto.setOverallScore(review.getOverallScore());
        dto.setComments(review.getComments());
        dto.setFeedback(review.getFeedback());
        dto.setStatus(review.getStatus());
        dto.setCreatedAt(review.getCreatedAt());
        dto.setReviewedAt(review.getReviewedAt());
        return dto;
    }
}
