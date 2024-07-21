'use client';

import React from 'react';
import { AuthProvider, useAuth } from "../context/AuthContext";
import Navbar from "./Library/navbar/Navbar";
import { handleSignOut } from '@/services/login';

const NavbarWithAuth = () => {
  const { user } = useAuth();

  function setError(error: string): void {
    console.error('Sign out error:', error);
  }

  return (
    <Navbar
      logo={null}
      userName={user?.displayName || user?.email}
      onSignOut={() => handleSignOut(setError)}
    />
  );
};

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NavbarWithAuth />
      {children}
    </AuthProvider>
  );
}