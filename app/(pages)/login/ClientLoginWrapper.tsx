"use client";

import LoginComponent from "@/components/connection/login/login";
import SignUpComponent from "@/components/connection/signUp/SignUp";
import { LoginProvider } from "@/context/useLogin";
import { useState } from "react";

const ClientLoginWrapper = () => {
    const [login, setLogin] = useState<boolean>(true);

    return (
      <LoginProvider>
        {login ? (
          <LoginComponent setLogin={setLogin} />
        ) : (
          <SignUpComponent setLogin={setLogin} />
        )}
      </LoginProvider>
    );
  };

export default ClientLoginWrapper;
