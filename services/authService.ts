
import { User } from '../types';

// --- MOCK AUTHENTICATION SERVICE ---
// This service simulates a third-party authentication provider like Firebase Auth.
// It uses localStorage to persist the user session across page reloads.

const MOCK_USER: User = {
  uid: '12345-abcde',
  displayName: 'Alex Developer',
  email: 'alex.dev@example.com',
  photoURL: 'https://i.pravatar.cc/150?u=alexdeveloper',
};

let currentUser: User | null = JSON.parse(localStorage.getItem('indieMarkUser') || 'null');
let authStateListener: ((user: User | null) => void) | null = null;

const notifyListener = () => {
  if (authStateListener) {
    authStateListener(currentUser);
  }
};

/**
 * Simulates signing in with a Google popup.
 * In a real app, this would use the Firebase SDK: `signInWithPopup(auth, new GoogleAuthProvider())`.
 */
export const signInWithGoogle = async (): Promise<User | null> => {
  console.log("Simulating Google Sign-In...");
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
  currentUser = MOCK_USER;
  localStorage.setItem('indieMarkUser', JSON.stringify(currentUser));
  notifyListener();
  console.log("Sign-in successful:", currentUser);
  return currentUser;
};

/**
 * Simulates signing out.
 * In a real app, this would be `signOut(auth)`.
 */
export const signOut = async (): Promise<void> => {
  console.log("Simulating Sign-Out...");
  await new Promise(resolve => setTimeout(resolve, 500));
  currentUser = null;
  localStorage.removeItem('indieMarkUser');
  notifyListener();
  console.log("Sign-out successful.");
};

/**
 * Simulates a real-time listener for authentication state changes.
 * In a real app, this would be `onAuthStateChanged(auth, callback)`.
 * It returns an `unsubscribe` function.
 */
export const onAuthStateChanged = (callback: (user: User | null) => void): (() => void) => {
  authStateListener = callback;
  // Immediately notify the listener with the current state upon subscription
  notifyListener();
  
  // Return a function to "unsubscribe" from the listener
  return () => {
    authStateListener = null;
  };
};
