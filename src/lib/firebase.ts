/**
 * The single Firebase entry point for both discussion boards. Nothing here runs until
 * a board calls getFirebase() in the browser, so pages that never open Discussions
 * never download or initialise the SDK.
 *
 * The web API key is public by design; access is enforced by firebase/firestore.rules.
 */
import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyC9n94D10gIhWOcMDIxY9VGVd74Z_KwV9s',
  authDomain: 'phtv-12f95.firebaseapp.com',
  projectId: 'phtv-12f95',
  storageBucket: 'phtv-12f95.firebasestorage.app',
  messagingSenderId: '284029899446',
  appId: '1:284029899446:web:e35d687e96984da208cc17',
} as const;

/** Emails whose verified accounts may moderate. The rules enforce this; the UI only reads it. */
export const ADMIN_EMAILS = ['contact@phamhungtien.com', 'hungtien10a7@gmail.com'];

export interface FirebaseServices {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  googleProvider: GoogleAuthProvider;
}

let services: FirebaseServices | null = null;

export function getFirebase(): FirebaseServices {
  if (!services) {
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    services = {
      app,
      auth: getAuth(app),
      db: getFirestore(app),
      googleProvider: new GoogleAuthProvider(),
    };
  }
  return services;
}
