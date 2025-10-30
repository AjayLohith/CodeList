# Use official Java 21 image
FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Build the Spring Boot JAR
RUN ./mvnw clean package -DskipTests

# Expose the Render port
EXPOSE 8080

# Run the JAR file
CMD ["java", "-jar", "target/server-0.0.1-SNAPSHOT.jar"]
