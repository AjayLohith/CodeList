import React from "react";

export default function TaskList({ tasks, onToggle, onDelete }) {
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <div key={task.id} className={`task-card ${task.completed ? "completed" : ""}`}>
                    <div className="task-info">
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                    </div>
                    <div className="task-actions">
                        <button className="toggle-btn" onClick={() => onToggle(task)}>
                            {task.completed ? "Undo" : "Done"}
                        </button>
                        <button className="delete-btn" onClick={() => onDelete(task)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
