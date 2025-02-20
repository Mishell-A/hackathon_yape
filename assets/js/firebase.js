// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqtkbOsPp05UFSkvrbcFQXufRVZRlazE8",
  authDomain: "yaprotect-g11.firebaseapp.com",
  projectId: "yaprotect-g11",
  storageBucket: "yaprotect-g11.firebasestorage.app",
  messagingSenderId: "353527014941",
  appId: "1:353527014941:web:5650ede5f6a3be776e48f4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
