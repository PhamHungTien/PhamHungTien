import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC9n94D10gIhWOcMDIxY9VGVd74Z_KwV9s",
  authDomain: "phtv-12f95.firebaseapp.com",
  projectId: "phtv-12f95",
  storageBucket: "phtv-12f95.firebasestorage.app",
  messagingSenderId: "284029899446",
  appId: "1:284029899446:web:e35d687e96984da208cc17",
  measurementId: "G-Q8VZEWTV71"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

let messagingInstance: any = null;
try {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    messagingInstance = getMessaging(app);
  }
} catch (e) {
  console.warn('Firebase Messaging not supported in this environment', e);
}
export const messaging = messagingInstance;

export const requestNotificationPermission = async () => {
  if (!messaging) return null;
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { 
        vapidKey: 'BBRYtxAxyPFsNig0j0PfS9j9PPkK5mKkUr6dZ3QcMYgYNYnD1RGDVBdbt6TlxAbt_FnDbPv6MKOnBMlTtN1Jjqo' 
      });
      console.log('FCM Token:', token);
      return token;
    }
  } catch (error) {
    console.error('An error occurred while retrieving token:', error);
  }
};