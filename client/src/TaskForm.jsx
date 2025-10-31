import React, { useState } from "react";

export default function TaskForm({ onAdd, disabled }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [label, setLabel] = useState(""); // 🆕 new state

    function submit(e) {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd({ title, description, label }); // include label
        setTitle("");
        setDescription("");
        setLabel("");
    }

    return (
        <form className="task-form" onSubmit={submit}>
            <h1>🏷️ Add New Task</h1>

            <input
                type="text"
                placeholder="Label (e.g. Work, Personal)..."
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                disabled={disabled}
            />

            <input
                type="text"
                placeholder="Task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={disabled}
            />
            <textarea
                placeholder="Description (optional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={disabled}
            />

            <button type="submit" className="add-full" disabled={disabled}>
                Add Task
            </button>
        </form>
    );
}
