// Import the functions you need from the SDKs you need
import {FirebaseApp, initializeApp } from "firebase/app";
import {Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import {connectFirestoreEmulator, Firestore, getFirestore } from "firebase/firestore";
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


  let _app = undefined;
  let _auth = undefined;
  let _db = undefined;
  if (import.meta.env.MODE === "test") {
      //
  }
  else if (import.meta.env.DEV) {
      // Initialize Firebase
      _app = initializeApp(firebaseConfig);
      // export const analytics = getAnalytics(app);
      _auth = getAuth(_app); // Initialize Firebase Authentication
      _db = getFirestore(_app);
      console.log("Connecting to emulators");
      connectAuthEmulator(_auth, "http://localhost:9099");
      connectFirestoreEmulator(_db, "localhost", 8080);
  }
  else {
      // Initialize Firebase
      _app = initializeApp(firebaseConfig);
      // export const analytics = getAnalytics(app);
      _auth = getAuth(_app); // Initialize Firebase Authentication
      _db = getFirestore(_app);
  }
  
  export const app: FirebaseApp = _app!;
  export const auth: Auth = _auth!;
  export let db: Firestore = _db!;
  
  export function setTestDBContext(context: Firestore | firebase.firestore.Firestore) {
      if (import.meta.env.MODE === "test") {
          db = context;
      }
  }

