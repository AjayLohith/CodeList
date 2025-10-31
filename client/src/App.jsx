import React, { useState, useEffect } from "react";
import Header from "./Header";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import RightSidebar from "./RightSidebar";
import { auth, provider } from "./firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export default function App() {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [loading, setLoading] = useState(false);

    // ✅ Firebase Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    name: currentUser.displayName,
                    email: currentUser.email,
                    uid: currentUser.uid,
                });
                fetchTasks(currentUser);
            } else {
                setUser(null);
                setTasks([]);
            }
        });
        return () => unsubscribe();
    }, []);

    // ✅ Login with Google
    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    // ✅ Logout
    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        setTasks([]);
    };

    // 🔐 Helper for authorized fetch
    async function fetchWithAuth(url, options = {}) {
        const user = auth.currentUser;
        const token = user ? await user.getIdToken() : null;
        const headers = {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        };

        const res = await fetch(url, { ...options, headers });

        if (options.method === "DELETE") {
            if (!res.ok && res.status !== 204) {
                const msg = await res.text();
                throw new Error(`Request failed: ${res.status} - ${msg}`);
            }
            return {};
        }

        if (!res.ok) {
            const msg = await res.text();
            throw new Error(`Request failed: ${res.status} - ${msg}`);
        }

        return res.json();
    }

    // ✅ Fetch tasks
    async function fetchTasks(currentUser) {
        try {
            setLoading(true);
            const token = await currentUser.getIdToken();
            const res = await fetch(`${API_BASE}/api/tasks`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error("Failed to fetch tasks");
            const data = await res.json();

            const normalized = data.map((t) => ({
                ...t,
                id: t.id || t._id,
            }));
            setTasks(normalized);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        } finally {
            setLoading(false);
        }
    }

    // ✅ Add new task
    const addTask = async (newTask) => {
        try {
            const saved = await fetchWithAuth(`${API_BASE}/api/tasks`, {
                method: "POST",
                body: JSON.stringify(newTask),
            });
            setTasks((prev) => [...prev, saved]);
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    // ✅ Toggle completion
    const toggleTask = async (taskToToggle) => {
        try {
            const updated = await fetchWithAuth(`${API_BASE}/api/tasks/${taskToToggle.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    ...taskToToggle,
                    completed: !taskToToggle.completed,
                }),
            });

            setTasks((prev) =>
                prev.map((t) => (t.id === updated.id ? updated : t))
            );
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    // ✅ Delete task
    const deleteTask = async (taskToDelete) => {
        try {
            await fetchWithAuth(`${API_BASE}/api/tasks/${taskToDelete.id}`, {
                method: "DELETE",
            });
            setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
        } catch (err) {
            console.error("❌ Error deleting task:", err);
        }
    };

    const toggleSidebar = () => setShowSidebar((prev) => !prev);

    return (
        <div className={`app-container ${showSidebar ? "sidebar-active" : ""}`}>
            {/* Header */}
            <Header
                user={user}
                onLogin={handleLogin}
                onLogout={handleLogout}
                onToggleSidebar={toggleSidebar}
            />

            {/* Main Layout */}
            <main className="main-content">
                <div className="app-layout">
                    <div className="panel">
                        {user ? (
                            <>
                                <TaskForm onAdd={addTask} disabled={!user} />
                                {loading ? (
                                    <p>Loading tasks...</p>
                                ) : (
                                    <TaskList
                                        tasks={tasks}
                                        onToggle={toggleTask}
                                        onDelete={deleteTask}
                                    />
                                )}
                            </>
                        ) : (
                            <div className="login-message-container">
                                <div className="login-message">
                                    <h2>👨‍💻 No User Found</h2>
                                    <p>
                                        Initialize your session with <strong>GoogleAuth()</strong> to
                                        start tracking your daily commits and tasks. Let’s refactor your
                                        productivity code together! ⚡
                                    </p>
                                    <button className="login-btn" onClick={handleLogin}>
                                        Authenticate with Google
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    {user && (
                        <RightSidebar
                            tasks={tasks}
                            onToggle={toggleTask}
                            showSidebar={showSidebar}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
