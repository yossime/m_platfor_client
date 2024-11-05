import { FirebaseError } from "firebase/app";
import { auth } from "@/services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";





export const handleGoogleLogin = async (
  setErrors: React.Dispatch<React.SetStateAction<string>>
) => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      setErrors(error.message);
    } else {
      console.error("An unexpected error occurred:", error);
      setErrors("An unexpected error occurred");
    }
  }
};

export const handleSignUp = async (
  email: string,
  password: string,
  name: string,
  setErrors: React.Dispatch<
    React.SetStateAction<{ email: string; password: string; name: string }>
  >
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    try {
      await updateProfile(userCredential.user, {
        displayName: name,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Failed to update profile",
      }));
    }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const newErrors = { email: "", password: "", name: "" };

      switch (error.code) {
        case "auth/email-already-in-use":
          newErrors.email = "Email is already in use.";
          break;
        case "auth/invalid-email":
          newErrors.email = "Invalid email.";
          break;
        case "auth/weak-password":
          newErrors.password = "Password is too weak.";
          break;
        default:
          newErrors.email = error.message;
          break;
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors,
      }));
    } else {
      console.error("An unexpected error occurred:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "An unexpected error occurred",
      }));
    }
  }
};

export const handleSignIn = async (
  email: string,
  password: string,
  setErrors: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >,
  setErrorEmail: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setErrors({ email: "", password: "" });
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      const newErrors = { email: "", password: "" };
      console.log(error.code)
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/invalid-email":
          newErrors.email = "Email is invalid or user does not exist.";
          setErrorEmail(true);
          break;
        case "auth/wrong-password":
          newErrors.password = "Incorrect password.";
          break;
        case "auth/invalid-credential":
          newErrors.password = "Invalid credentials provided.";
          break;
        default:
          newErrors.password = "Sign-in failed.";
          break;
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "An unknown error occurred.",
      }));
    }
  }
};


export const handleSignOut = async (setError: (error: string) => void) => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
    setError("Error signing out");
  }
};
