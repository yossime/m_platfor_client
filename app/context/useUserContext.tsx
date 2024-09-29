// "use client"
// import React, { createContext, useContext } from 'react';
// import { useUserData, UserData } from '@/hooks/useUserData'; 

// interface UserContextProps {
//   userData: UserData | null;
//   loading: boolean;
//   refreshUserData: () => void;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { userData, loading, refreshUserData } = useUserData();

//   return (
//     <UserContext.Provider value={{ userData, loading, refreshUserData }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUserContext must be used within a UserProvider');
//   }
//   return context;
// };
