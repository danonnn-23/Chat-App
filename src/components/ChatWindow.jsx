import { useAuth } from "../context/AuthContext.jsx"; 

function ChatWindow() {
  const { user, logout } = useAuth(); // ✅ це тепер працюватиме

  return (
    <div className="chat-container">
      <h2>Welcome, {user?.displayName || user?.email || "Guest"}!</h2>
      <button onClick={() => { 
        logout(); 
      }}>
        Log out
      </button>

    </div>
  );
}

export default ChatWindow;
