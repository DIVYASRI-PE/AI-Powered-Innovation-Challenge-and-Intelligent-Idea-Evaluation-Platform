package com.innovation.controller;

import com.innovation.dto.IdeaDTO;
import com.innovation.dto.IdeaRequest;
import com.innovation.security.UserPrincipal;
import com.innovation.service.IdeaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/ideas")
@CrossOrigin(origins = "*")
public class IdeaController {

    private final IdeaService ideaService;

    public IdeaController(IdeaService ideaService) {
        this.ideaService = ideaService;
    }

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<IdeaDTO> createIdea(@Valid @RequestBody IdeaRequest ideaRequest,
                                               @AuthenticationPrincipal UserPrincipal userPrincipal) {
        IdeaDTO createdIdea = ideaService.createIdea(ideaRequest, userPrincipal.getId());
        return ResponseEntity.ok(createdIdea);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IdeaDTO> getIdeaById(@PathVariable Long id) {
        IdeaDTO idea = ideaService.getIdeaById(id);
        return ResponseEntity.ok(idea);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY') or hasRole('STUDENT')")
    public ResponseEntity<List<IdeaDTO>> getAllIdeas() {
        List<IdeaDTO> ideas = ideaService.getAllIdeas();
        return ResponseEntity.ok(ideas);
    }

    @GetMapping("/my-ideas")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<IdeaDTO>> getMyIdeas(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<IdeaDTO> ideas = ideaService.getIdeasByUser(userPrincipal.getId());
        return ResponseEntity.ok(ideas);
    }

    @GetMapping("/challenge/{challengeId}")
    public ResponseEntity<List<IdeaDTO>> getIdeasByChallenge(@PathVariable Long challengeId) {
        List<IdeaDTO> ideas = ideaService.getIdeasByChallenge(challengeId);
        return ResponseEntity.ok(ideas);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
    public ResponseEntity<List<IdeaDTO>> getIdeasByStatus(@PathVariable String status) {
        List<IdeaDTO> ideas = ideaService.getIdeasByStatus(status);
        return ResponseEntity.ok(ideas);
    }

    @GetMapping("/top")
    public ResponseEntity<List<IdeaDTO>> getTopIdeas() {
        List<IdeaDTO> ideas = ideaService.getTopIdeas();
        return ResponseEntity.ok(ideas);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<IdeaDTO> updateIdea(@PathVariable Long id,
                                               @Valid @RequestBody IdeaRequest ideaRequest,
                                               @AuthenticationPrincipal UserPrincipal userPrincipal) {
        IdeaDTO updatedIdea = ideaService.updateIdea(id, ideaRequest, userPrincipal.getId());
        return ResponseEntity.ok(updatedIdea);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN') or hasRole('FACULTY')")
    public ResponseEntity<IdeaDTO> updateIdeaStatus(@PathVariable Long id,
                                                       @RequestParam String status,
                                                       @AuthenticationPrincipal UserPrincipal userPrincipal) {
        IdeaDTO updatedIdea = ideaService.updateIdeaStatus(id, status);
        return ResponseEntity.ok(updatedIdea);
    }

    @PutMapping("/{id}/score")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<IdeaDTO> updateIdeaScore(@PathVariable Long id,
                                                   @RequestParam BigDecimal score) {
        IdeaDTO updatedIdea = ideaService.updateIdeaScore(id, score);
        return ResponseEntity.ok(updatedIdea);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Void> deleteIdea(@PathVariable Long id,
                                            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        ideaService.deleteIdea(id, userPrincipal.getId());
        return ResponseEntity.noContent().build();
    }
}
