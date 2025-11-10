import { User as AppUser } from '../types';
import { initializeApp } from 'firebase/app';
// Fix: Use namespace import for firebase/auth to avoid potential module resolution issues.
import * as fbAuth from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = fbAuth.getAuth(app);
const provider = new fbAuth.GoogleAuthProvider();

// --- REAL AUTHENTICATION SERVICE ---
// This service uses the Firebase SDK to handle user authentication.

/**
 * Maps a Firebase User object to our application's User type.
 */
const mapFirebaseUserToAppUser = (firebaseUser: fbAuth.User): AppUser => {
    return {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
    };
};

/**
 * Signs the user in with a Google popup.
 */
export const signInWithGoogle = async (): Promise<AppUser | null> => {
  try {
    const result = await fbAuth.signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Sign-in successful:", user);
    return mapFirebaseUserToAppUser(user);
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
    return null;
  }
};

/**
 * Signs the user out.
 */
export const signOut = async (): Promise<void> => {
  try {
    await fbAuth.signOut(auth);
    console.log("Sign-out successful.");
  } catch (error) {
    console.error("Error during Sign-Out:", error);
  }
};

/**
 * A real-time listener for authentication state changes.
 * It returns an `unsubscribe` function.
 */
export const onAuthStateChanged = (callback: (user: AppUser | null) => void): (() => void) => {
  return fbAuth.onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      callback(mapFirebaseUserToAppUser(firebaseUser));
    } else {
      callback(null);
    }
  });
};
