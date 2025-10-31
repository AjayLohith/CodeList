import React, { useState, useRef, useEffect } from "react";

export default function Header({ user, onLogin, onLogout, onToggleSidebar }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header>
            {/* Left: Sidebar Toggle (visible only on mobile) */}
            <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="#111"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>

            {/* Center: Title */}
            <div className="header-title">
                <h1>
                    Code<span>List</span>
                </h1>
            </div>

            {/* Right: Profile / Sign-in */}
            <div className="right" ref={menuRef}>
                {user ? (
                    <div className="profile-container">
                        <div className="profile-info" onClick={() => setOpen(!open)}>
                            <div className="profile-icon">
                                {user.name?.charAt(0).toUpperCase() || "👤"}
                            </div>
                            <span className="profile-name-header">
                                {user.name?.split(" ").slice(0, 1).join(" ")}
                            </span>
                        </div>

                        {open && (
                            <div className="dropdown-menu">
                                <p className="profile-name">{user.name?.split(" ").slice(0, 2).join(" ")}</p>
                                {user.email && (
                                    <p
                                        style={{
                                            fontSize: "0.9rem",
                                            color: "#555",
                                            margin: "0 0 0.3rem 0",
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        {user.email}
                                    </p>
                                )}
                                <button onClick={onLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button className="navbar-signin" onClick={onLogin}>
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
}
