import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../services/firebase.js";

function Register({ setPage }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        setError("");
        if (!email || !password || !name || !surname) {
            setError("Please fill in all fields");
            return;
        }
        if (password.length < 6) {
            setError("Password must contain at least 6 characters");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name
            });
            setPage("login");
        } catch (err) {
        switch (err.code) {
            case "auth/email-already-in-use":
                setError("This email is already in use");
                break;
            case "auth/invalid-email":
                setError("Invalid email");
                break;
            case "auth/weak-password":
                setError("Password must contain at least 6 characters");
                break;
            default:
                setError("There was an error during registration. Please try again later");
        }
        console.error("Register error:", err);
        }
    };

    return (
        <div className="register-container">
            <div className="register-window">
                <h2>Create new account</h2>

                <p className="toogle-to-login">
                    Already have an account?{" "}
                    <span className="text-decoration-underline"
                        onClick={() => setPage("login")}
                        style={{ cursor: "pointer" }}>
                        Log in
                    </span>
                </p>

                <div className="info-input-container">
                    <input type="text"
                        placeholder="Your name"
                        maxLength={16}
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                    <input type="text"
                        placeholder="Your surname"
                        maxLength={16}
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}/>
                    <input type="email"
                        placeholder="Email"
                        maxLength={320}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password"
                        placeholder="Password"
                        maxLength={16}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {error && (
                    <p className="register-error-text">
                        {error}
                    </p>
                )}

                <button type="button"
                    className="btn btn-outline-info btn-signup"
                    onClick={handleRegister}>
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default Register;
