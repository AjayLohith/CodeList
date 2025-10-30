import React, { useState } from "react";

export default function TaskForm({ onAdd, disabled }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function submit(e) {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd({ title, description });
        setTitle("");
        setDescription("");
    }

    return (
        <form className="task-form" onSubmit={submit}>
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
            <button type="submit" className="add-full" disabled={disabled}>Add Task</button>
        </form>
    );
}
