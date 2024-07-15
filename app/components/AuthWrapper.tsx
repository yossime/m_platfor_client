'use client';

import { AuthProvider, useAuth } from "../context/AuthContext";
import Navbar from "@/components/navbar/Navbar";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  // const { user, loading } = useAuth();

  //   if (loading) {
  //     return <div>loading...</div>;
  //   }

  return (
    <>
      <AuthProvider>
        <Navbar/>
        {children}
      </AuthProvider>

    </>
  );
}