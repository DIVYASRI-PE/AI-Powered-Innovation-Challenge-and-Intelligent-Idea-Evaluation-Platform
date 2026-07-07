package com.innovation.controller;

import com.innovation.dto.ManualReviewDTO;
import com.innovation.dto.ManualReviewRequest;
import com.innovation.security.UserPrincipal;
import com.innovation.service.ManualReviewService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ManualReviewController {

    private final ManualReviewService manualReviewService;

    public ManualReviewController(ManualReviewService manualReviewService) {
        this.manualReviewService = manualReviewService;
    }

    @PostMapping
    @PreAuthorize("hasRole('FACULTY') or hasRole('ADMIN')")
    public ResponseEntity<ManualReviewDTO> createReview(@Valid @RequestBody ManualReviewRequest request,
                                                         @AuthenticationPrincipal UserPrincipal userPrincipal) {
        ManualReviewDTO review = manualReviewService.createReview(request, userPrincipal.getId());
        return ResponseEntity.ok(review);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('FACULTY') or hasRole('ADMIN')")
    public ResponseEntity<ManualReviewDTO> submitReview(@PathVariable Long id,
                                                         @Valid @RequestBody ManualReviewRequest request,
                                                         @AuthenticationPrincipal UserPrincipal userPrincipal) {
        ManualReviewDTO review = manualReviewService.submitReview(id, request, userPrincipal.getId());
        return ResponseEntity.ok(review);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ManualReviewDTO> getReviewById(@PathVariable Long id) {
        ManualReviewDTO review = manualReviewService.getReviewById(id);
        return ResponseEntity.ok(review);
    }

    @GetMapping("/my-reviews")
    @PreAuthorize("hasRole('FACULTY') or hasRole('ADMIN')")
    public ResponseEntity<List<ManualReviewDTO>> getMyReviews(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<ManualReviewDTO> reviews = manualReviewService.getReviewsByReviewer(userPrincipal.getId());
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/idea/{ideaId}")
    public ResponseEntity<List<ManualReviewDTO>> getReviewsByIdea(@PathVariable Long ideaId) {
        List<ManualReviewDTO> reviews = manualReviewService.getReviewsByIdea(ideaId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('FACULTY') or hasRole('ADMIN')")
    public ResponseEntity<List<ManualReviewDTO>> getPendingReviews() {
        List<ManualReviewDTO> reviews = manualReviewService.getPendingReviews();
        return ResponseEntity.ok(reviews);
    }
}
