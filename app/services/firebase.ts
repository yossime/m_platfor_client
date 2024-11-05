// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";


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
const storage = getStorage(app);



export const getAuthDownloadUrl = async (filePath: string): Promise<string | null> => {
    try {
        console.log("`gs://${filePath}`", `${filePath}`);
        const storageRef = ref(storage, `gs://${filePath}`);
        const url = await getDownloadURL(storageRef);
        return url
    } catch (error) {
        console.error('Error getting auth download URL:', error);
        return null;
    }
}






export const checkAndRefreshToken = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const idTokenResult = await user.getIdTokenResult(true);

      if (idTokenResult.expirationTime) {
        const expirationDate = new Date(idTokenResult.expirationTime);
        const currentDate = new Date();
        if (expirationDate.getTime() - currentDate.getTime() < 5 * 60 * 1000) { 
          console.log("Refreshing token...");
          await user.getIdToken(true); 
        }
      }
    } else {
      console.log("No user is currently logged in.");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

