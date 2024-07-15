import React, { createContext, useState, ReactNode, useContext } from 'react';


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

export const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<any>(null);

  const value: LoginContextType = { 
    email,setEmail,password,setPassword,error,setError,name,setName
  };

  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
