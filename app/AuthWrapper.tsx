"use client";

import NavbarWithAuth from "./components/navbar/NavbarWithAuth";


export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <NavbarWithAuth />
      {children}
    </>
  );
}
