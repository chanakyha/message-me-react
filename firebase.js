import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYJBSzQ3IDKZ9Px9Hv66oe8fA5Ux9ElTU",
  authDomain: "message-me-844d1.firebaseapp.com",
  projectId: "message-me-844d1",
  storageBucket: "message-me-844d1.appspot.com",
  messagingSenderId: "319333336997",
  appId: "1:319333336997:web:2906d771a014f650acca4c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

export { app, auth, db, provider, signInWithPopup };
