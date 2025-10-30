import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function App() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState("login");

  // 🔹 автоматичне перемикання сторінки при зміні стану користувача
  useEffect(() => {
    if (user) setPage("chat");
    else setPage("login");
  }, [user]);

  // 🔹 поки Firebase перевіряє автентифікацію — показуємо лоадер
  if (loading) {
    return (
      <div className="text-center text-light mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  // 🔹 рендер сторінки залежно від стану
  return (
    <>
      {page === "register" && <Register setPage={setPage} />}
      {page === "login" && <Login setPage={setPage} />}
      {page === "chat" && <ChatWindow setPage={setPage} />}
    </>
  );
}

export default App;
