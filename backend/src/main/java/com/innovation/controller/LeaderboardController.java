package com.innovation.controller;

import com.innovation.dto.LeaderboardDTO;
import com.innovation.security.UserPrincipal;
import com.innovation.service.LeaderboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
@CrossOrigin(origins = "*")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping
    public ResponseEntity<List<LeaderboardDTO>> getLeaderboard() {
        List<LeaderboardDTO> leaderboard = leaderboardService.getLeaderboard();
        return ResponseEntity.ok(leaderboard);
    }

    @GetMapping("/my-ranking")
    public ResponseEntity<LeaderboardDTO> getUserRanking(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        LeaderboardDTO ranking = leaderboardService.getUserRanking(userPrincipal.getId());
        return ResponseEntity.ok(ranking);
    }
}
