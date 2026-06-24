import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCOclosvjHoLlZ0oz0QxfvuG0QGm1fpkrA",
  authDomain: "world-cup-game-bbc69.firebaseapp.com",
  projectId: "world-cup-game-bbc69",
  storageBucket: "world-cup-game-bbc69.firebasestorage.app",
  messagingSenderId: "392607008759",
  appId: "1:392607008759:web:c40478521e5f84b288d0f2",
  measurementId: "G-NZ5BGRBW85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);