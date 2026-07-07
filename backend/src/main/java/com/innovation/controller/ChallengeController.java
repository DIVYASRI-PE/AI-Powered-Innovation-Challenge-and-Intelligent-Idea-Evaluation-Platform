package com.innovation.controller;

import com.innovation.dto.ChallengeDTO;
import com.innovation.dto.ChallengeRequest;
import com.innovation.entity.User;
import com.innovation.security.UserPrincipal;
import com.innovation.service.ChallengeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/challenges")
@CrossOrigin(origins = "*")
public class ChallengeController {

    private final ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
    public ResponseEntity<ChallengeDTO> createChallenge(@Valid @RequestBody ChallengeRequest challengeRequest,
                                                         @AuthenticationPrincipal UserPrincipal userPrincipal) {
        ChallengeDTO createdChallenge = challengeService.createChallenge(challengeRequest, userPrincipal.getId());
        return ResponseEntity.ok(createdChallenge);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChallengeDTO> getChallengeById(@PathVariable Long id) {
        ChallengeDTO challenge = challengeService.getChallengeById(id);
        return ResponseEntity.ok(challenge);
    }

    @GetMapping
    public ResponseEntity<List<ChallengeDTO>> getAllChallenges() {
        List<ChallengeDTO> challenges = challengeService.getAllChallenges();
        return ResponseEntity.ok(challenges);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ChallengeDTO>> getChallengesByStatus(@PathVariable String status) {
        List<ChallengeDTO> challenges = challengeService.getChallengesByStatus(status);
        return ResponseEntity.ok(challenges);
    }

    @GetMapping("/active")
    public ResponseEntity<List<ChallengeDTO>> getActiveChallenges() {
        List<ChallengeDTO> challenges = challengeService.getActiveChallenges();
        return ResponseEntity.ok(challenges);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ChallengeDTO>> getChallengesByCategory(@PathVariable Long categoryId) {
        List<ChallengeDTO> challenges = challengeService.getChallengesByCategory(categoryId);
        return ResponseEntity.ok(challenges);
    }

    @GetMapping("/my-challenges")
    @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
    public ResponseEntity<List<ChallengeDTO>> getMyChallenges(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<ChallengeDTO> challenges = challengeService.getChallengesByUser(userPrincipal.getId());
        return ResponseEntity.ok(challenges);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
    public ResponseEntity<ChallengeDTO> updateChallenge(@PathVariable Long id,
                                                         @Valid @RequestBody ChallengeRequest challengeRequest) {
        ChallengeDTO updatedChallenge = challengeService.updateChallenge(id, challengeRequest);
        return ResponseEntity.ok(updatedChallenge);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
    public ResponseEntity<Void> deleteChallenge(@PathVariable Long id) {
        challengeService.deleteChallenge(id);
        return ResponseEntity.noContent().build();
    }
}
