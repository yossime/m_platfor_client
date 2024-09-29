"use client"
import { getUserData } from '@/services/user.service';
import { UserData } from '@/types';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextProps {
  userData: UserData | null;
  loading: boolean;
  refreshUserData: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    setLoading(true); 
    const data = await getUserData();
    setUserData(data)
    setLoading(false); 
  };

  useEffect(() => {
    fetchUserData(); 
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading, refreshUserData: fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
