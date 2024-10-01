"use client";
import LoginComponent from "@/components/connection/login/login";
import SignUpComponent from "@/components/connection/signUp/SignUp";
import { useUserContext } from "@/context/useUserContext";
import { auth } from "@/services/firebase";
import { LoginProvider } from "@context/useLogin";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [login, setLogin] = useState<boolean>(true);
  const { userData } = useUserContext();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(userData)
      if (user) {
        if (userData?.isNew) router.push("/onboarding");
        else {
          router.push("/userPage");
        }
      }
    });
  });

  return (
    <LoginProvider>
      {login ? (
        <LoginComponent setLogin={setLogin} />
      ) : (
        <SignUpComponent setLogin={setLogin} />
      )}
    </LoginProvider>
  );
};

export default LoginPage;
