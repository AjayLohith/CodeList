package com.ajay.server;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;

@SpringBootApplication
@RestController
public class ServerApplication {

    public static void main(String[] args) {
        try (InputStream serviceAccount = ServerApplication.class
                .getClassLoader()
                .getResourceAsStream("task-tracker-50f68-firebase-adminsdk-fbsvc-f7708b2fa7.json")) {

            if (serviceAccount == null) {
                throw new RuntimeException("❌ Firebase config file not found in resources folder");
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);
            System.out.println("✅ Firebase initialized successfully!");
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Load .env file
        Dotenv dotenv = Dotenv.load();
        System.setProperty("MONGODB_URI", dotenv.get("MONGODB_URI"));

        SpringApplication.run(ServerApplication.class, args);



    }

}