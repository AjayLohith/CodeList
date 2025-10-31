package com.ajay.server;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;

@SpringBootApplication
@RestController
public class ServerApplication {

    @GetMapping("/")
    public String home() {
        return "✅ Server is running with Firebase + MongoDB!";
    }

    public static void main(String[] args) {
        // ✅ Load .env file manually
        Dotenv dotenv = Dotenv.configure()
                .directory("D:/TaskTracker/server") // full path to your .env file
                .ignoreIfMissing()
                .load();

        String mongoUri = dotenv.get("MONGODB_URI");
        String firebaseConfig = dotenv.get("FIREBASE_CONFIG");

        if (mongoUri == null || mongoUri.isEmpty()) {
            throw new RuntimeException("❌ MONGODB_URI environment variable not set");
        }
        System.setProperty("MONGODB_URI", mongoUri);

        if (firebaseConfig == null || firebaseConfig.isEmpty()) {
            throw new RuntimeException("❌ FIREBASE_CONFIG environment variable not set");
        }

        try {
            // ✅ Convert FIREBASE_CONFIG string to InputStream
            ByteArrayInputStream serviceAccount = new ByteArrayInputStream(firebaseConfig.getBytes(StandardCharsets.UTF_8));

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                System.out.println("✅ Firebase initialized successfully!");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("❌ Failed to initialize Firebase: " + e.getMessage());
        }

        // ✅ Debug info
        System.out.println("🔍 MONGODB_URI loaded: " + mongoUri.substring(0, Math.min(50, mongoUri.length())) + "...");
        System.out.println("✅ Environment variables loaded successfully!");

        // ✅ Start Spring Boot
        SpringApplication.run(ServerApplication.class, args);
    }
}
