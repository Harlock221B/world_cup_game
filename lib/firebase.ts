import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOclosvjHoLlZ0oz0QxfvuG0QGm1fpkrA",
  authDomain: "world-cup-game-bbc69.firebaseapp.com",
  projectId: "world-cup-game-bbc69",
  storageBucket: "world-cup-game-bbc69.firebasestorage.app",
  messagingSenderId: "392607008759",
  appId: "1:392607008759:web:c40478521e5f84b288d0f2",
  measurementId: "G-NZ5BGRBW85"
};

// Garante que o Firebase não seja inicializado duas vezes pelo Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicializa o banco de dados (Firestore)
const db = getFirestore(app);

export { db };