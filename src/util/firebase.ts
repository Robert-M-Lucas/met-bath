// Import the functions you need from the SDKs you need
import {FirebaseApp, initializeApp } from "firebase/app";
import {Auth, getAuth } from "firebase/auth";
import {Firestore, getFirestore } from "firebase/firestore";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import firebase from "firebase/compat";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAO4oPQUlxawJpf6hX-j_Ey_rVzUeBZtGM",
    authDomain: "met-bath.firebaseapp.com",
    projectId: "met-bath",
    storageBucket: "met-bath.appspot.com",
    messagingSenderId: "765987701304",
    appId: "1:765987701304:web:b8704cdeecce71e2ee5ccd",
    measurementId: "G-P8ZC28Z99D"
  };


export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth =  getAuth(app);
export let db: Firestore =getFirestore(app);

export function setTestDBContext(context: Firestore | firebase.firestore.Firestore) {
    if (import.meta.env.MODE === "test") {
        db = context;
    }
}


