

import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/useUserContext";
import { useAuth } from "./AuthContext";

interface LoginContextType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  error: any;
  setError: React.Dispatch<React.SetStateAction<any>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>(null);
  const router = useRouter();
  const { userData,refreshUserData } = useUserContext();
  const {user } = useAuth()

  useEffect(() => {
    const checkUserStatus = async () => {
      if (user) {
        await refreshUserData(); 
        if (userData?.isNew) {
          router.push("/onboarding");
        } else {
          router.push("/userPage");
        }
      }
    };
    checkUserStatus();
  }, [user, router]); 
  
  

  const value: LoginContextType = {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    name,
    setName,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
