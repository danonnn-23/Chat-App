// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Конфіг Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDLiVTJHxZy6qeik7esywcM3x_G45f8S_8",
  authDomain: "chat-app-d0230.firebaseapp.com",
  projectId: "chat-app-d0230",
  storageBucket: "chat-app-d0230.firebasestorage.app",
  messagingSenderId: "925113242241",
  appId: "1:925113242241:web:de793ab14ac9915090b380"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Експорт Auth для використання у компонентах
export const auth = getAuth(app);
