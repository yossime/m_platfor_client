

import { FirebaseError } from 'firebase/app';
import { auth } from '@/services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";

export const handleGoogleLogin = async (setError: (error: string) => void) => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
    } catch (error) {
        if (error instanceof FirebaseError) {
            setError(error.message);
        } else {
            console.error('An unexpected error occurred:', error);
            setError('An unexpected error occurred');
        }
    }
};



export const handleSignUp = async (email: string, password: string, setError: (error: string) => void) => {
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        try {
            await updateProfile(userCredential.user, {
                displayName: "Jane Q. User",
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            });
            // Profile updated!
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile');
        }
    } catch (error) {
        if (error instanceof FirebaseError) {
            setError(error.message);
        } else {
            console.error('An unexpected error occurred:', error);
            setError('An unexpected error occurred');
        }
    }
};


export const handleSignIn = async (email: string, password: string, setError: (error: string) => void) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

};


export const handleSignOut = async (setError: (error: string) => void) => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Error signing out:', error);
        setError('Error signing out');
    }
};