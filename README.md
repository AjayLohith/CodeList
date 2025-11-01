# 🧩 CodeList — Task Tracker (Spring Boot + MongoDB + Firebase Auth)

A simple, user-specific **Task Tracker (To-Do)** web application.  
Users sign in with **Firebase Authentication**, and each user manages their own tasks stored securely in **MongoDB**.  
The backend is built using **Spring Boot**, and the frontend is powered by **React**.  

**🌐 Live Demo:** [https://code-list-omega.vercel.app](https://code-list-omega.vercel.app)

---

## 🧾 One-line Summary
Full-stack task manager using **Firebase Auth** for authentication, **Spring Boot + MongoDB** for backend, and **React** for frontend.

---

## ⚙️ Tech Stack (Summary)

- **Frontend:** React (client app), Firebase Web SDK (auth + token), optional tooling (Vite / Create React App)  
- **Backend:** Spring Boot (Java 17+), Firebase Admin SDK (token verification), Spring Security (filter integration)  
- **Database:** MongoDB (Atlas or local)  
- **Build / Package:** Maven (backend), npm / yarn (frontend)  
- **Hosting / Deployment:** Vercel (frontend), Render (backend)

---

## 🚀 Deployment

- **Frontend:** Deployed on **Vercel** → [https://code-list-omega.vercel.app](https://code-list-omega.vercel.app)  
- **Backend:** Hosted on **Render** → connected directly from GitHub for continuous deployment  
- **Environment Variables:**  
  - Firebase Config  
  - MongoDB URI  
  - Render Backend URL  
  *(all set as environment secrets on respective platforms)*

---

## 🧱 Backend — Main Dependencies (Maven)

- `org.springframework.boot:spring-boot-starter-web`  
- `org.springframework.boot:spring-boot-starter-data-mongodb`  
- `org.springframework.boot:spring-boot-starter-security`  
- `com.google.firebase:firebase-admin` *(Firebase Admin SDK)*  
- `org.projectlombok:lombok` *(optional)*  
- `org.springframework.boot:spring-boot-starter-test` *(test scope)*  

---

## 💻 Frontend — Main Dependencies (npm)

- `react`  
- `react-dom`  
- `firebase` *(Firebase Web SDK)*  
- `axios` or `fetch` *(HTTP client)*  
- **Optional:** `react-router-dom`, `zustand` / `redux` *(state management)*, `tailwindcss` or `sass` *(styling)*, `vite` or `create-react-app` *(dev tooling)*  

---



## ✨ Key Features

- 🔐 **Firebase Email/Password Authentication** using secure JWT tokens  
- 🧍 **Per-user Task Isolation** (each task tied to Firebase UID)  
- 📦 **CRUD Operations** — create, read, update, delete tasks  
- ☁️ **MongoDB Persistence** — works with Atlas or local instance  
- ✅ **Token Verification** via Firebase Admin SDK on backend  

---

## 🔒 Security & Best Practices

- Firebase Admin SDK validates all incoming ID tokens on backend  
- Spring Security integrates a custom authentication filter  
- Each task is authorized by matching `task.userId` with the authenticated Firebase UID  
- Sensitive credentials (Firebase JSON key, MongoDB URI, API keys) are stored securely as environment variables — **never committed to Git**  

---

## 🚧 Future Improvements

- ⏰ Add due dates and reminders  
- 🔔 Push notifications via Firebase Cloud Messaging  
- 🔍 Task filtering, searching, and pagination  
- 👥 Role-based access or shared lists  
- ⚙️ CI/CD workflows for auto-deployment on push 
