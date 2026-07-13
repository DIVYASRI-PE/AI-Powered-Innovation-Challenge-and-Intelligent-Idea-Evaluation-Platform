package com.innovation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InnovationApplication {

    public static void main(String[] args) {
        // Fix Render PostgreSQL URL: postgres:// → jdbc:postgresql://
        String dbUrl = System.getenv("DATABASE_URL");
        if (dbUrl != null && dbUrl.startsWith("postgres://")) {
            dbUrl = dbUrl.replace("postgres://", "postgresql://");
            String[] parts = dbUrl.split("[@/:]");
            // Convert: postgresql://user:pass@host:port/db
            // To jdbc:postgresql://host:port/db?user=user&password=pass
            System.setProperty("DATABASE_URL",
                "jdbc:postgresql://" + dbUrl.substring(dbUrl.indexOf("@") + 1)
                + "?user=" + parts[3] + "&password=" + parts[4] + "&sslmode=require");
        } else if (dbUrl != null && dbUrl.startsWith("postgresql://")) {
            // Already correct format, just add jdbc: prefix
            System.setProperty("DATABASE_URL",
                "jdbc:" + dbUrl + (dbUrl.contains("?") ? "&" : "?") + "sslmode=require");
        }
        SpringApplication.run(InnovationApplication.class, args);
    }
}
