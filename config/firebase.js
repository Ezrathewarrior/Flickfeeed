import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

export const firebaseConfig = {
  apiKey: "AIzaSyBRyj9b7gVeShE-D4chaSINNyrnolNZB_A",
  authDomain: "ezra-test-project-23.firebaseapp.com",
  projectId: "ezra-test-project-23",
  storageBucket: "ezra-test-project-23.appspot.com",
  messagingSenderId: "67090599999",
  appId: "1:67090599999:web:0c6c0e7d2d968b07bbe88a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);