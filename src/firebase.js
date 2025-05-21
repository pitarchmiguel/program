import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBZaIzYF5ozPxodnfxMQI_Azf2xnk8Hdrw",
    authDomain: "crossfit-app-45689.firebaseapp.com",
    projectId: "crossfit-app-45689",
    storageBucket: "crossfit-app-45689.appspot.com",
    messagingSenderId: "172968183910",
    appId: "1:172968183910:web:1b48e17ba79266ea5dc5a7",
    measurementId: "G-SC16FBWZ36"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

