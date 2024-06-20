import React, { useState } from "react";
import "./Signup.css";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verifica si las contraseñas coinciden
        if (password !== passwordConfirmation) {
            alert("Las contraseñas no coinciden");
            return; // Detiene la ejecución de la función
        }

        // Continuar con la petición fetch
        fetch("http://127.0.0.1:5000/users", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
            }),
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                window.location.href = "/login";
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="signup-container container">
                <div className="container">
                    <div className="row justify-content-center">
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label
                                        htmlFor="formUsername"
                                        className="formLabel"
                                    >
                                        Nombre de Usuario
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="formInput"
                                        id="formUsername"
                                        placeholder="Ingresa tu usuario"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="formEmail"
                                        className="formLabel"
                                    >
                                        Correo electrónico
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        className="formInput"
                                        id="formEmail"
                                        placeholder="Ingresa tu correo electrónico"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="formPassword"
                                        className="formLabel"
                                    >
                                        Contraseña
                                    </label>
                                    <input
                                        required
                                        type="password"
                                        className="formInput"
                                        id="formPassword"
                                        placeholder="Ingresa tu contraseña"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="formPasswordConfirmation"
                                        className="formLabel"
                                    >
                                        Confirmar contraseña
                                    </label>
                                    <input
                                        required
                                        type="password"
                                        className="formInput"
                                        id="formPasswordConfirmation"
                                        placeholder="Confirma tu contraseña"
                                        value={passwordConfirmation}
                                        onChange={(e) =>
                                            setPasswordConfirmation(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Registrarse
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
