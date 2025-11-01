# 🗂️ TaskTracker

**TaskTracker** is a simple yet secure task management application built using **Spring Boot**, **MongoDB**, and **Firebase Authentication**.  
Each user can manage their own tasks — add, update, or delete them — all while keeping data private and safely stored in the database.

---

## ✨ Features

- 🔐 **User Authentication:** Secure login and signup using Firebase Authentication.  
- 🧾 **Personalized Tasks:** Every user can create and manage their own tasks independently.  
- 🕓 **CRUD Operations:** Add, edit, delete, and mark tasks as completed.  
- 📆 **Timestamps:** Automatically tracks when tasks are created and updated.  
- 💾 **MongoDB Integration:** All tasks are stored in a NoSQL database for fast access.  
- 🧱 **Modular Structure:** Clean separation between Controller, Service, and Repository layers.  

---

## 🧰 Technologies Used

- **Backend:** Spring Boot  
- **Database:** MongoDB (Spring Data MongoDB)  
- **Authentication:** Firebase Authentication (JWT validation)  
- **Build Tool:** Maven  
- **Testing:** Postman  
- **Deployment :** Render  

---

## 🚀 Getting Started

Follow these simple steps to set up TaskTracker locally.

### Prerequisites

- Java 17 or higher installed  
- Maven installed  
- MongoDB Atlas or local MongoDB instance  
- Firebase project setup for authentication  

---

### 🏗️ Installation & Setup

#### Clone the Repository

```bash
git clone https://github.com/your-username/tasktracker.git
cd tasktracker
```

#### Add Configuration

Create a file named `application.properties` inside `src/main/resources/`

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

## 🧪 Testing the Application

- Use **Postman** to test each endpoint.  
- Make sure to include your Firebase **Bearer token** in the Authorization header when sending requests.  
- Each authenticated user can only access their own tasks.  

---
