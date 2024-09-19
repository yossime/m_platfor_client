"use client";

import React from "react";
import { handleSignOut } from "@/services/login";
import { useAuth } from "@/context/AuthContext";
import Navbar from "./Navbar";

const NavbarWithAuth = () => {
  const { user } = useAuth();

  function setError(error: string): void {
    console.error("Sign out error:", error);
  }
  console.log(user)
  return (
    <Navbar
      imageUrl={user?.photoURL}
      logo={null}
      userName={user?.displayName || user?.email}
      onSignOut={() => handleSignOut(setError)}
    />
  );
};

export default NavbarWithAuth;

