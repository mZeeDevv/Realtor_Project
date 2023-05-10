// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz4XS5lf2fcAPPrE_le8gIV68FoLTw-Ws",
  authDomain: "realtor-clone-dd9da.firebaseapp.com",
  projectId: "realtor-clone-dd9da",
  storageBucket: "realtor-clone-dd9da.appspot.com",
  messagingSenderId: "177826776686",
  appId: "1:177826776686:web:a9eb6daf917e72af43887f"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();