import React, { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsLoading(false);
            return;
        }

        fetch("http://127.0.0.1:5000/me", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: `Token ${token}`,
            },
            credentials: "include", // Incluye las cookies en la petición (necesario para mantener la sesión)
        })
            .then((response) => {
                if (response.status === 401) {
                    setUser(null);
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setUser(data);
                setIsLoading(false);
            })
            .catch((e) => {
                setError(e.message);
                setIsLoading(false);
            });
    }, []);

    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    if (isLoading) return <div className="loading-message">Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                {user ? (
                    <div>
                        <h1 className="profile-heading">User Profile</h1>
                        <p className="profile-text">
                            Nombre de usuario: {user.username}
                        </p>
                        <p className="profile-text">Email: {user.email}</p>
                        <button className="profile-button" onClick={logout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div>
                        <p>No se ha iniciado sesión</p>
                        <div className="profile-buttons">
                            <button
                                onClick={() =>
                                    (window.location.href = "/login")
                                }
                            >
                                Iniciar sesión
                            </button>
                            <button
                                onClick={() =>
                                    (window.location.href = "/signup")
                                }
                            >
                                Registrarse
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
