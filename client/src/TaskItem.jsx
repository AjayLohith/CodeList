import React from "react";

export default function TaskItem({ task, onToggle, onDelete }) {
    return (
        <div className={`task-card ${task.completed ? "completed" : ""}`}>
            <h3>{task.title}</h3>
            <p className="desc">{task.description}</p>
            <small><b>Priority:</b> {task.priority || "low"}</small>
            <div className="actions">
                <button className="toggle-btn" onClick={() => onToggle(task)}>
                    {task.completed ? "Undo" : "Done"}
                </button>
                <button className="delete-btn" onClick={() => onDelete(task)}>
                    Delete
                </button>
            </div>
        </div>
    );
}
