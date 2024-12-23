// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbWKcLmb63804L2HXdbXHI3IX42JrJcBw",
  authDomain: "reactfeedbacklogin.firebaseapp.com",
  projectId: "reactfeedbacklogin",
  storageBucket: "reactfeedbacklogin.firebasestorage.app",
  messagingSenderId: "140999483596",
  appId: "1:140999483596:web:d1a44e5787408a7a25a269"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;