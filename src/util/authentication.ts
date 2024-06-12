import {GoogleAuthProvider, signInWithPopup, User} from "firebase/auth";
import { auth } from "./firebase";

// Initialize a new Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Function to sign in with Google
export const signInWithGoogle = async (): Promise<User | null> => {
    const result = await signInWithPopup(auth, googleProvider);
    // Return the entire user object
    return result.user;
};