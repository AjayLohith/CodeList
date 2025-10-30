import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Header from "./Header";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import "./index.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

async function apiFetch(endpoint, method = "GET", token = null, body = null) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const resp = await fetch(`${API_BASE}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });
    if (method === "DELETE") return {};
    if (!resp.ok) throw new Error(await resp.text());
    return resp.json();
}

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                const t = await u.getIdToken();
                const firstName = u.displayName ? u.displayName.split(" ")[0] : "User";
                setUser({ name: firstName, email: u.email });
                setToken(t);
                loadTasks(t);
            } else {
                setUser(null);
                setToken(null);
                setTasks([]);
            }
        });
        return () => unsub();
    }, []);

    async function loadTasks(tkn) {
        try {
            const data = await apiFetch("/api/tasks", "GET", tkn);
            setTasks(data);
        } catch (e) {
            console.error("Error loading tasks:", e);
        }
    }

    async function addTask(payload) {
        if (!token) return;
        const created = await apiFetch("/api/tasks", "POST", token, payload);
        setTasks((prev) => [created, ...prev]);
    }

    async function toggleTask(task) {
        const updated = { ...task, completed: !task.completed };
        const res = await apiFetch(`/api/tasks/${task.id}`, "PUT", token, updated);
        setTasks((prev) => prev.map((t) => (t.id === res.id ? res : t)));
    }

    async function removeTask(task) {
        await apiFetch(`/api/tasks/${task.id}`, "DELETE", token);
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
    }

    async function handleLogin() {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    }

    async function handleLogout() {
        await signOut(auth);
    }

    return (
        <div>
            <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
            <div className="panel">
                {user ? (
                    <>
                        <TaskForm onAdd={addTask} disabled={!token} />
                        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={removeTask} />
                    </>
                ) : (
                    <div className="login-message">
                        <h2>👨‍💻 No User  found.</h2>
                        <p>
                            Initialize your session with <strong>GoogleAuth()</strong> to start tracking your daily commits.
                            Let’s refactor your productivity code together! ⚡
                        </p>
                        <button className="login-btn" onClick={handleLogin}>Authenticate with Google</button>
                    </div>
                )}
            </div>
        </div>
    );
}
