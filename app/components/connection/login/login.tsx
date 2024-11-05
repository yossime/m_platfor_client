"use client"
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Input from "@/components/Library/input/Input";
import Text from "@components/Library/text/Text";
import {
  ButtonType,
  ButtonVariant,
  ButtonSize,
  ButtonMode,
} from "@constants/button";
import { InputSize, InputMode } from "@constants/input";
import { useLogin } from "@context/useLogin";
import { handleGoogleLogin, handleSignIn } from "@/services/login";
import {
  Container,
  Spacer,
  LinkContainer,
  Link,
  TextContainer,
  BottomContainer,
  FormContainer,
} from "./LoginStyles";
import Button from "@/components/Library/button/Button";
import { FontFamily, FontWeight, TextSize } from "@constants/text";
import { TextColor } from "@constants/colors";
import GoogleLoginButton from "@/components/Library/button/GoogleLoginButton";
import TextWithDivider from "@/components/Library/general/TextWithDivider ";

interface LoginComponentProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ setLogin }) => {
  const [userExists, setUserExists] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorGoogle, setErrorGoogle] = useState<string>("");

  const { email, setEmail, password, setPassword } = useLogin();
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  useEffect(() => {
    setUserExists(false);
  }, []);

  const handleLoginClick = () => setLogin(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors = { email: "", password: "" };
    let valid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    handleSignIn(email, password, setErrors, setErrorEmail);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: "" });
  };

  return (
    <Container>
      <TextContainer>
        <Text
          size={TextSize.D1}
          $weight={FontWeight.SEMI_BOLD}
          color={TextColor.BLACK}
          $family={FontFamily.Poppins}
        >
          Welcome
        </Text>
        <Spacer />
        <LinkContainer>
          <Text
            size={TextSize.TEXT1}
            $weight={FontWeight.NORMAL}
            color={TextColor.PRIMARY_TEXT}
            $family={FontFamily.Figtree}
          >
            Don't have an account?
          </Text>
          <Text
            size={TextSize.TEXT1}
            $weight={FontWeight.NORMAL}
            color={TextColor.LINK}
            $family={FontFamily.Figtree}
            onClick={handleLoginClick}
            $cursorStyle="pointer"
          >
            sing up
          </Text>
        </LinkContainer>
      </TextContainer>
      <BottomContainer>
        {!userExists && (
          <>
            <Spacer />
            <GoogleLoginButton
              onClick={() => handleGoogleLogin(setErrorGoogle)}
            />
            <Spacer />
            <TextWithDivider text="Or, log in with your email" />
          </>
        )}
        {/* {!userExists && errorEmail && (
          <>
            <Spacer />
            <Text
              size={TextSize.TEXT1}
              $weight={FontWeight.NORMAL}
              color={TextColor.PRIMARY_TEXT}
              $family={FontFamily.Figtree}
            >
              "We couldn't find this email. Would you like to sign up with this
              email address?"
            </Text>
          </>
        )} */}
        <Spacer />
        <FormContainer onSubmit={handleLogin}>
          <Input
            inputSize={InputSize.MEDIUM}
            mode={errors.email ? InputMode.ERROR : InputMode.NORMAL}
            label="Email"
            placeholder="Name@example.com"
            value={email}
            onChange={handleEmailChange}
            helperText={errors.email || "Enter a valid email address"}
          />
          <Spacer />
          <Input
            type="password"
            inputSize={InputSize.MEDIUM}
            mode={errors.password ? InputMode.ERROR : InputMode.NORMAL}
            label="Password"
            placeholder="Enter at least 8 characters"
            value={password}
            onChange={handlePasswordChange}
            helperText={errors.password || "Enter your password"}
          />
          <Spacer />
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.MEDIUM}
            mode={ButtonMode.NORMAL}
            text={userExists ? "Login" : "Continue"}
            fullWidth={true}
          />
        </FormContainer>
      </BottomContainer>
    </Container>
  );
};

export default LoginComponent;
