import React, { ChangeEvent, FormEvent, useState } from "react";
import Input from "@/components/Library/input/Input";
import Text from "@/components/Library/text/Text";
import {
  ButtonType,
  ButtonVariant,
  ButtonSize,
  ButtonMode,
} from "@constants/button";
import { InputSize, InputMode } from "@constants/input";
import { useLogin } from "@context/useLogin";
import { handleGoogleLogin, handleSignUp } from "@/services/login";
import {
  Container,
  Spacer,
  LinkContainer,
  Link,
  BottomContainer,
  TextContainer,
  FormContainer,
} from "./SignUpStyles";
import Button from "@/components/Library/button/Button";
import { FontFamily, FontWeight, TextSize } from "@constants/text";
import { TextColor } from "@constants/colors";
import GoogleLoginButton from "@/components/Library/button/GoogleLoginButton";
import TextWithDivider from "@/components/Library/general/TextWithDivider ";

interface SignUpComponentProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpComponent: React.FC<SignUpComponentProps> = ({ setLogin }) => {
  const { email, setEmail, password, setPassword, name, setName } = useLogin();
  const [errorGoogle, setErrorGoogle] = useState<string>("");

  const [errors, setErrors] = useState<{
    email: string;
    password: string;
    name: string;
  }>({
    email: "",
    password: "",
    name: "",
  });

  const handleLoginClick = () => {
    setLogin(true);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: "" });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setErrors({ ...errors, name: "" });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let valid = true;

    const newErrors = { email: "", password: "", name: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }
    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    handleSignUp(email, password, name, setErrors);
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
            Already have an account?
          </Text>
          <Text
            size={TextSize.TEXT1}
            $weight={FontWeight.NORMAL}
            color={TextColor.LINK}
            $family={FontFamily.Figtree}
            onClick={handleLoginClick}
            $cursorStyle="pointer"
          >
            Log in
          </Text>
        </LinkContainer>
        <Spacer />
      </TextContainer>
      <BottomContainer>
        <FormContainer onSubmit={handleSubmit}>
          <Input
            inputSize={InputSize.SMALL}
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
            inputSize={InputSize.SMALL}
            mode={errors.password ? InputMode.ERROR : InputMode.NORMAL}
            label="Password"
            placeholder="Enter at least 8 characters"
            value={password}
            onChange={handlePasswordChange}
            helperText={
              errors.password || "Password must be at least 8 characters"
            }
          />
          <Spacer />
          <Input
            inputSize={InputSize.SMALL}
            mode={errors.name ? InputMode.ERROR : InputMode.NORMAL}
            label="Name"
            placeholder="How should we call you?"
            value={name}
            onChange={handleNameChange}
            helperText={errors.name || "Enter your full name"}
          />
          <Spacer />
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.MEDIUM}
            mode={ButtonMode.NORMAL}
            text="Sign Up"
            fullWidth
          />
        </FormContainer>
        <TextWithDivider text="OR" />

        <Spacer />
        <GoogleLoginButton onClick={() => handleGoogleLogin(setErrorGoogle)} />
      </BottomContainer>
    </Container>
  );
};

export default SignUpComponent;
