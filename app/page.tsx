"use client"
import { StyleSheetManager } from 'styled-components';
import LoginPage from "@pages//login/page";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import isPropValid from '@emotion/is-prop-valid';
export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/userPage');
    }
  }, [user, loading, router]);

  return (
    <>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <LoginPage />
      </StyleSheetManager>
    </>
  );
}


