// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUK28v_DFhMV_qXEwv4caLHBDOhyt0SxI",
  authDomain: "special-web-19029.firebaseapp.com",
  databaseURL: "https://special-web-19029-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "special-web-19029",
  storageBucket: "special-web-19029.firebasestorage.app",
  messagingSenderId: "140264153787",
  appId: "1:140264153787:web:42cbee3c6c82ee0029ff9e",
  measurementId: "G-FLBWQYGLDB"
};


const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);