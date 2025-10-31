import React, { useState } from "react";

export default function RightSidebar({ tasks, onToggle, showSidebar }) {
    const [openLabels, setOpenLabels] = useState({});

    const groupedTasks = tasks.reduce((acc, task) => {
        const label = task.label?.trim() || "Unlabeled";
        if (!acc[label]) acc[label] = [];
        acc[label].push(task);
        return acc;
    }, {});

    const toggleLabel = (label) => {
        setOpenLabels((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <aside className={`right-sidebar ${showSidebar ? "visible" : ""}`}>
            <h2 className="sidebar-title">📂 Categories</h2>
            {Object.keys(groupedTasks).map((label) => (
                <div key={label} className="label-group">
                    <div className="label-header" onClick={() => toggleLabel(label)}>
                        <span>{label}</span>
                        <span>{openLabels[label] ? "▲" : "▼"}</span>
                    </div>

                    {openLabels[label] && (
                        <div className="label-tasks">
                            {groupedTasks[label].map((task) => (
                                <label key={task.id} className="sidebar-task">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => onToggle(task)}
                                    />
                                    <span className={task.completed ? "done" : ""}>
                                        {task.title}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </aside>
    );
}
