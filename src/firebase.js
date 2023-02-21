
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA4gM41yK86hIjQhFjsuKJRvPWc4p7ZLcU",
    authDomain: "blogss-b7091.firebaseapp.com",
    projectId: "blogss-b7091",
    storageBucket: "blogss-b7091.appspot.com",
    messagingSenderId: "863199060451",
    appId: "1:863199060451:web:1e9e1aa1bc96a09ac0c0d6",
    measurementId: "G-L265QSVWGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)