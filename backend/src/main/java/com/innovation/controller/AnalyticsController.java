package com.innovation.controller;

import com.innovation.dto.AnalyticsDTO;
import com.innovation.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AnalyticsDTO> getPlatformAnalytics() {
        AnalyticsDTO analytics = analyticsService.getPlatformAnalytics();
        return ResponseEntity.ok(analytics);
    }
}
