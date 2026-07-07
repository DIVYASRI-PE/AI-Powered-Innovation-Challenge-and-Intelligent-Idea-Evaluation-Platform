package com.innovation.config;

import com.innovation.entity.Category;
import com.innovation.entity.Challenge;
import com.innovation.entity.User;
import com.innovation.repository.CategoryRepository;
import com.innovation.repository.ChallengeRepository;
import com.innovation.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner seedData(
            CategoryRepository categoryRepository,
            ChallengeRepository challengeRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            // ── 1. Admin user ──────────────────────────────────────────────
            User admin;
            if (!userRepository.existsByUsername("admin")) {
                admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@innovateai.com");
                admin.setPassword(passwordEncoder.encode("Admin@123"));
                admin.setFirstName("Admin");
                admin.setLastName("User");
                admin.setDepartment("Administration");
                admin.setRole("ADMIN");
                admin = userRepository.save(admin);
                System.out.println("✅ Admin user created  →  username: admin  |  password: Admin@123");
            } else {
                admin = userRepository.findByUsername("admin").get();
            }

            // ── 2. Categories ──────────────────────────────────────────────
            if (categoryRepository.count() == 0) {

                Category[] cats = {
                    makeCategory("Artificial Intelligence",
                            "AI, Machine Learning, Deep Learning and NLP projects"),
                    makeCategory("Web Development",
                            "Full-stack, frontend and backend web applications"),
                    makeCategory("Mobile Applications",
                            "Android, iOS and cross-platform mobile apps"),
                    makeCategory("IoT & Embedded Systems",
                            "Internet of Things and hardware integration projects"),
                    makeCategory("Cybersecurity",
                            "Security tools, ethical hacking and data protection"),
                    makeCategory("Healthcare Technology",
                            "Digital health, telemedicine and medical devices"),
                    makeCategory("Education Technology",
                            "E-learning platforms and smart classroom solutions"),
                    makeCategory("Sustainability & Green Tech",
                            "Renewable energy and environmental solutions")
                };

                for (Category c : cats) {
                    categoryRepository.save(c);
                }
                System.out.println("✅ 8 categories seeded.");
            }

            // ── 3. Challenges ──────────────────────────────────────────────
            if (challengeRepository.count() == 0) {

                Category ai   = categoryRepository.findByName("Artificial Intelligence").get();
                Category web  = categoryRepository.findByName("Web Development").get();
                Category mob  = categoryRepository.findByName("Mobile Applications").get();
                Category iot  = categoryRepository.findByName("IoT & Embedded Systems").get();
                Category edu  = categoryRepository.findByName("Education Technology").get();
                Category health = categoryRepository.findByName("Healthcare Technology").get();

                LocalDateTime future = LocalDateTime.now().plusMonths(6);

                Challenge[] challenges = {
                    makeChallenge(
                        "AI-Powered Smart Campus",
                        "Build an AI solution to automate campus operations — attendance, energy management, or security.",
                        ai, admin,
                        "Must use ML/DL. Working prototype required.",
                        future,
                        "₹50,000 cash prize + internship opportunity"
                    ),
                    makeChallenge(
                        "Next-Gen E-Learning Platform",
                        "Design an interactive learning platform with adaptive content, quizzes and progress tracking.",
                        edu, admin,
                        "Must be accessible on mobile and desktop.",
                        future,
                        "₹30,000 + certification"
                    ),
                    makeChallenge(
                        "Smart Health Monitor",
                        "Develop a wearable or mobile app to monitor vital signs and alert users/doctors in real time.",
                        health, admin,
                        "Data privacy compliance required.",
                        future,
                        "₹40,000 + incubation support"
                    ),
                    makeChallenge(
                        "IoT Home Automation",
                        "Create a low-cost IoT solution to automate home appliances using voice or mobile control.",
                        iot, admin,
                        "Hardware prototype preferred.",
                        future,
                        "₹25,000 + components kit"
                    ),
                    makeChallenge(
                        "Open Innovation Web App Challenge",
                        "Build any useful web application that solves a real-world problem faced by students or faculty.",
                        web, admin,
                        "Open source code required. Deployed demo needed.",
                        future,
                        "₹20,000 + mentorship"
                    ),
                    makeChallenge(
                        "Campus Mobile App",
                        "Develop a mobile app that improves student life — timetable, canteen menu, bus tracker, etc.",
                        mob, admin,
                        "Android or iOS. Must be installable by judges.",
                        future,
                        "₹15,000 + Play Store publish support"
                    )
                };

                for (Challenge ch : challenges) {
                    challengeRepository.save(ch);
                }
                System.out.println("✅ 6 sample challenges seeded.");
            }

            System.out.println("🚀 Database ready! Visit http://localhost:5173 to use the app.");
        };
    }

    // ── helpers ────────────────────────────────────────────────────────────

    private Category makeCategory(String name, String description) {
        Category c = new Category();
        c.setName(name);
        c.setDescription(description);
        return c;
    }

    private Challenge makeChallenge(String title, String description,
                                    Category category, User createdBy,
                                    String rules, LocalDateTime deadline,
                                    String prizeDetails) {
        Challenge ch = new Challenge();
        ch.setTitle(title);
        ch.setDescription(description);
        ch.setCategory(category);
        ch.setCreatedBy(createdBy);
        ch.setRules(rules);
        ch.setDeadline(deadline);
        ch.setPrizeDetails(prizeDetails);
        ch.setStatus("PUBLISHED");
        return ch;
    }
}
