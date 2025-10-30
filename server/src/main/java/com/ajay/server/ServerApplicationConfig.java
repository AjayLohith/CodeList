//package com.ajay.server;
//
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.firebase.FirebaseApp;
//import com.google.firebase.FirebaseOptions;
//import jakarta.annotation.PostConstruct;
//import org.springframework.context.annotation.Configuration;
//
//import java.io.ByteArrayInputStream;
//import java.nio.charset.StandardCharsets;
//
//@Configuration
//public class ServerApplicationConfig {
//
//    @PostConstruct
//    public void initFirebase() {
//        try {
//            if (FirebaseApp.getApps().isEmpty()) {
//                String privateKey = System.getenv("FIREBASE_PRIVATE_KEY");
//                if (privateKey == null || privateKey.isEmpty()) {
//                    throw new RuntimeException("FIREBASE_PRIVATE_KEY not found in environment variables");
//                }
//
//                privateKey = privateKey.replace("\\n", "\n");
//
//                String firebaseConfig = "{"
//                        + "\"type\": \"service_account\","
//                        + "\"project_id\": \"" + System.getenv("FIREBASE_PROJECT_ID") + "\","
//                        + "\"private_key_id\": \"" + System.getenv("FIREBASE_PRIVATE_KEY_ID") + "\","
//                        + "\"private_key\": \"" + privateKey + "\","
//                        + "\"client_email\": \"" + System.getenv("FIREBASE_CLIENT_EMAIL") + "\","
//                        + "\"client_id\": \"" + System.getenv("FIREBASE_CLIENT_ID") + "\""
//                        + "}";
//
//                GoogleCredentials credentials = GoogleCredentials.fromStream(
//                        new ByteArrayInputStream(firebaseConfig.getBytes(StandardCharsets.UTF_8)));
//
//                FirebaseOptions options = FirebaseOptions.builder()
//                        .setCredentials(credentials)
//                        .build();
//
//                FirebaseApp.initializeApp(options);
//                System.out.println("✅ Firebase initialized successfully!");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//}
