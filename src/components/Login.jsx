import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase.js";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); // очищаємо старі помилки
    if (!email || !password) {
      setError("Введи email і пароль.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Успішний вхід
      setPage("chat"); // або що у тебе після входу
    } catch (err) {
      console.error("Login error:", err);

      switch (err.code) {
        case "auth/user-not-found":
          setError("Користувача з таким email не існує.");
          break;
        case "auth/wrong-password":
          setError("Невірний пароль. Спробуй ще раз.");
          break;
        case "auth/invalid-email":
          setError("Невірний формат email.");
          break;
        default:
          setError("Сталася помилка під час входу. Спробуй пізніше.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-window">
        <h2>Log In</h2>
        <p className="toogle-to-register">
          Don’t have an account?{" "}
          <span
            className="text-decoration-underline"
            onClick={() => setPage("register")}
            style={{ cursor: "pointer" }}
          >
            Register
          </span>
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={320}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={16}
        />

        {/* Вивід помилки */}
        {error && (
          <p style={{ color: "salmon", marginTop: 8, textAlign: "center" }}>
            {error}
          </p>
        )}

        <button
          type="button"
          className="btn btn-outline-info btn-login"
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default Login;
