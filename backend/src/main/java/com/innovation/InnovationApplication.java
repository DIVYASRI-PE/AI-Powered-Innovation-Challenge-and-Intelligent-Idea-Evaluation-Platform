package com.innovation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.URI;

@SpringBootApplication
public class InnovationApplication {

    public static void main(String[] args) {
        // Fix Render PostgreSQL URL: postgres:// → jdbc:postgresql://
        try {
            String dbUrl = System.getenv("DATABASE_URL");
            if (dbUrl != null && (dbUrl.startsWith("postgres://") || dbUrl.startsWith("postgresql://"))) {
                String normalized = dbUrl.replaceFirst("^postgres://", "postgresql://");
                URI uri = new URI(normalized);

                String host   = uri.getHost();
                int    port   = uri.getPort() == -1 ? 5432 : uri.getPort();
                String dbName = uri.getPath().replaceFirst("^/", "");
                String userInfo = uri.getUserInfo();
                String user   = userInfo.split(":")[0];
                String pass   = userInfo.substring(userInfo.indexOf(':') + 1);

                String jdbcUrl = String.format(
                    "jdbc:postgresql://%s:%d/%s?sslmode=require", host, port, dbName);

                System.setProperty("spring.datasource.url",      jdbcUrl);
                System.setProperty("spring.datasource.username", user);
                System.setProperty("spring.datasource.password", pass);

                System.out.println("✅ DATABASE_URL converted to: " + jdbcUrl);
            }
        } catch (Exception e) {
            System.err.println("⚠️ DATABASE_URL parse error: " + e.getMessage());
        }

        SpringApplication.run(InnovationApplication.class, args);
    }
}
