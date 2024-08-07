// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsumWwayZb_ou91z7_oHX7NMlfp-4Tmn0",
  authDomain: "business-directory-eaea0.firebaseapp.com",
  projectId: "business-directory-eaea0",
  storageBucket: "business-directory-eaea0.appspot.com",
  messagingSenderId: "396106592056",
  appId: "1:396106592056:web:845b85594b18c635b81bcd",
  measurementId: "G-WT0CYPXNXR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage=getStorage(app);

// const analytics = getAnalytics(app);