// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5qaHvSZZiMA28JZzlVNUiJMLJV1UiY8M",
  authDomain: "spectagram-app-bfc3a.firebaseapp.com",
  projectId: "spectagram-app-bfc3a",
  storageBucket: "spectagram-app-bfc3a.appspot.com",
  messagingSenderId: "732469094132",
  appId: "1:732469094132:web:6640fb471ab1d4021c60a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;