import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD3hurOXuVkBwft9y7_Ex13NIOtAG1wYvg",
    authDomain: "e-commerce-telayna.firebaseapp.com",
    projectId: "e-commerce-telayna",
    storageBucket: "e-commerce-telayna.appspot.com",
    messagingSenderId: "144166387455",
    appId: "1:144166387455:web:3da3b9f9b8cb88e34116ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)