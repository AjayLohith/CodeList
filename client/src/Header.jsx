import React, { useState, useRef, useEffect } from "react";

export default function Header({ user, onLogin, onLogout }) {
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
            <h1>
                Code<span>List</span>
            </h1>

            <div className="right" ref={menuRef}>
                {user ? (
                    <div className="profile-container">
                        <div
                            className="profile-info"
                            onClick={() => setOpen(!open)}
                        >
                            <div className="profile-icon">
                                {user.name?.charAt(0).toUpperCase() || "👤"}
                            </div>
                            <span className="profile-name-header">{user.name?.split(" ")[0]}</span>
                        </div>

                        {open && (
                            <div className="dropdown-menu">
                                <p className="profile-name">{user.name}</p>
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
