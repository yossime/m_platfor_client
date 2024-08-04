// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDJQ4d7m-0nrJN0PmQ2mN1lu8bR-I63Xpc",
    authDomain: "platform-client-project.firebaseapp.com",
    databaseURL: "https://platform-client-project-default-rtdb.firebaseio.com",
    projectId: "platform-client-project",
    storageBucket: "platform-client-project.appspot.com",
    messagingSenderId: "56739607973",
    appId: "1:56739607973:web:3238fe2ef43e38956c244c",
    measurementId: "G-JKT3G4M2M9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
