import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX1Dxwd5hBtd7VyhjB0eTjm8If7WC3KgQ",
  authDomain: "student-performance-port-b564a.firebaseapp.com",
  projectId: "student-performance-port-b564a",
  storageBucket: "student-performance-port-b564a.firebasestorage.app",
  messagingSenderId: "317639764021",
  appId: "1:317639764021:web:29655c42f886674228297c",
  measurementId: "G-FMP5SN8GE0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);