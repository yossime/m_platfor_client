"use client"
import LoginPage from "@pages//login/page";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  return (
    <>
    <LoginPage/>
    </>
  );
}