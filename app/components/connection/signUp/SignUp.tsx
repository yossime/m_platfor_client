"use client"
import React, { ChangeEvent } from 'react';
import Input from '@/components/Library/input/Input';
import Text from '@/components/Library/text/Text';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode } from '@constants/button';
import { InputSize, InputMode } from '@constants/input';
import { useLogin } from '@context/useLogin';
import { handleGoogleLogin, handleSignUp } from '@/services/login';
import { Container, Spacer, LinkContainer, Link, BottomContainer, TextContainer } from './SignUpStyles';
import Button from '@/components/Library/button/Button';
import { FontFamily, FontWeight, TextSize } from '@constants/text';
import { TextColor } from '@constants/colors';
import GoogleLoginButton from '@/components/Library/button/GoogleLoginButton';


interface SignUpComponentProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpComponent: React.FC<SignUpComponentProps> = ({ setLogin }) => {
  const {
    email, setEmail,
    password, setPassword,
    error, setError,
    name, setName
  } = useLogin();

  const handleLoginClick = () => {
    setLogin(true);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };


  return (
    <Container>
      <TextContainer>
        <Text size={TextSize.D1} $weight={FontWeight.SEMI_BOLD} color={TextColor.BLACK} $family={FontFamily.Poppins}>
          Welcome
        </Text>
        <Spacer />
        <LinkContainer>
          <Text size={TextSize.TEXT1} $weight={FontWeight.NORMAL} color={TextColor.PRIMARY_TEXT} $family={FontFamily.Figtree}>
            &quot;Already have an account?&quot;
          </Text>
          <Link onClick={handleLoginClick}>Log in</Link>
        </LinkContainer>
        <Spacer />
      </TextContainer>
      <BottomContainer>

        <Input
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          label="Email"
          placeholder="Name@example.com"
          value={email}
          onChange={handleEmailChange}
          helperText="Enter a valid email address"
        />
        <Spacer />
        <Input
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          label="Password"
          placeholder="Enter at least 8 characters"
          value={password}
          onChange={handlePasswordChange}
          helperText="Password must be at least 8 characters"
        />
        <Spacer />
        <Input
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          label="Name"
          placeholder="How should we call you?"
          value={name}
          onChange={handleNameChange}
          helperText="Enter your full name"
        />
        <Spacer />
        <Button
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.MEDIUM}
          mode={ButtonMode.NORMAL}
          text="Sign Up"
          onClick={() => handleSignUp(email, password, setError)}
          fullWidth
        />
        <Spacer />
        <GoogleLoginButton onClick={() => handleGoogleLogin(setError)} />
      </BottomContainer>
    </Container>
  );
};

export default SignUpComponent;