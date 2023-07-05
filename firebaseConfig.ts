// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
	apiKey: "AIzaSyChSNI3537bzlVKxl29lBjutnZZ8IO2EIM",
	authDomain: "airis-e6909.firebaseapp.com",
	databaseURL: "https://airis-e6909-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "airis-e6909",
	storageBucket: "airis-e6909.appspot.com",
	messagingSenderId: "6559941711",
	appId: "1:6559941711:web:ebe2be615868db062b963a",
	measurementId: "G-QQ5H2D5E5W"
  };

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);