importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyC9n94D10gIhWOcMDIxY9VGVd74Z_KwV9s",
  authDomain: "phtv-12f95.firebaseapp.com",
  projectId: "phtv-12f95",
  storageBucket: "phtv-12f95.firebasestorage.app",
  messagingSenderId: "284029899446",
  appId: "1:284029899446:web:e35d687e96984da208cc17",
  measurementId: "G-Q8VZEWTV71"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.webp'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});