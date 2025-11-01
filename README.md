# 🗂️ [CodeList](https://code-list-omega.vercel.app)

**CodeList** is a secure and simple task management application built using **Spring Boot**, **MongoDB**, and **Firebase Authentication**.  
Each user can manage their own tasks — add, update, or delete them — all while keeping their data private and securely stored in the database.  
The project also includes **Docker support** for easy containerization and deployment.

---

## ✨ Features

- 🔐 **User Authentication:** Secure login and signup using Firebase Authentication.  
- 🧾 **Personalized Tasks:** Each user has a private task space.  
- 🕓 **CRUD Operations:** Add, edit, delete, and mark tasks as completed.  
- 📆 **Timestamps:** Automatically logs task creation and updates.  
- 💾 **MongoDB Integration:** Fast, scalable NoSQL data handling.  
- 🧱 **Layered Architecture:** Clean separation between Controller, Service, and Repository layers.  
- 🐳 **Docker Support:** Easily containerize and deploy the entire app.

---

## 🧰 Technologies Used

- **Backend:** Spring Boot  
- **Database:** MongoDB (Spring Data MongoDB)  
- **Authentication:** Firebase Authentication (JWT validation)  
- **Build Tool:** Maven  
- **Containerization:** Docker  
- **Testing:** Postman  
- **Deployment:** Render
- **Containerization:** Docker

---

## 🚀 Getting Started

Follow these steps to set up **CodeList** locally.

### Prerequisites

- Java 17 or higher  
- Maven installed  
- MongoDB Atlas or local MongoDB instance  
- Firebase project for authentication  
- Docker (optional for containerized deployment)

---

### 🏗️ Installation & Setup

#### Clone the Repository

```bash
git clone https://github.com/your-username/codelist.git
cd codelist
```

#### Add Configuration

Create a file named `application.properties` inside `src/main/resources/`:

```
spring.data.mongodb.uri=<Your_MongoDB_URI>
firebase.auth.url=<Your_Firebase_Project_URL>
```

Place your Firebase service account key JSON inside the project directory (e.g., `/config/firebase-key.json`).

#### Install Dependencies

```bash
mvn clean install
```

#### Run the Application

```bash
mvn spring-boot:run
```

---

## 🐳 Running with Docker

#### Build the Docker Image

```bash
docker build -t codelist-app .
```

#### Run the Container

```bash
docker run -p 8080:8080 codelist-app
```

#### Access the App

Open your browser and go to [http://localhost:8080](http://localhost:8080)

---

## 🧪 Testing the Application

- Use **Postman** to test endpoints.  
- Include your Firebase **Bearer Token** in the `Authorization` header.  
- Each user can only access their own tasks and data.

---
