// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB16BS_mLfJib-KYpujomn3Zb33iNazU78',
  authDomain: 'capeclouds-f2fe8.firebaseapp.com',
  projectId: 'capeclouds-f2fe8',
  storageBucket: 'capeclouds-f2fe8.appspot.com',
  messagingSenderId: '1070315569794',
  appId: '1:1070315569794:web:62b128fbed9132dd08ea9b',
  measurementId: 'G-D7YS8FRC21',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
