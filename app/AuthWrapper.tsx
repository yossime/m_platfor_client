"use client";

import { AuthProvider } from "@/context/AuthContext";
import NavbarWithAuth from "./components/navbar/NavbarWithAuth";


export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
        <NavbarWithAuth />
      {children}
    </AuthProvider>
  );
}
