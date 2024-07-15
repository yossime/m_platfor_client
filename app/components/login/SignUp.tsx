"use client"
import React from 'react';
import Input from '@/components/Library/input/Input';
import Text from '@/components/Library/text/Text';
import Button from '../Library/button/Button';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode } from '@constants/buttton';
import { InputSize, InputMode } from '@constants/input';
import { useLogin } from '@context/useLogin';
import { handleGoogleLogin, handleSignUp } from '@/services/login';
import { Container, Form, Spacer, LinkContainer, Link } from './SignUpStyles';

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

  return (
    <Container>
      <Form>
        <Text size="D1" weight="SEMIBLOB" color="black">
          Welcome
        </Text>
        <Spacer />
        <LinkContainer>
          <Text size="TEXT1" weight="NORMAL" color="secondary_text">
          &quot;Already have an account?&quot;
          </Text>
          <Link onClick={handleLoginClick}>Log in</Link>
        </LinkContainer>
        <Spacer />
        <Input
          size={InputSize.SMALL}
          mode={InputMode.NORMAL}
          label="Email"
          placeholder="Name@example.com"
          value={email}
          onChange={setEmail}
          helperText="Enter a valid email address"
        />
        <Spacer />
        <Input
          size={InputSize.SMALL}
          mode={InputMode.NORMAL}
          label="Password"
          placeholder="Enter at least 8 characters"
          value={password}
          onChange={setPassword}
          helperText="Password must be at least 8 characters"
          // type="password"
        />
        <Spacer />
        <Input
          size={InputSize.SMALL}
          mode={InputMode.NORMAL}
          label="Name"
          placeholder="How should we call you?"
          value={name}
          onChange={setName}
          helperText="Enter your full name"
        />
        <Spacer />
        <Button
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.SMALL}
          mode={ButtonMode.NORMAL}
          text="Sign Up"
          onClick={() => handleSignUp(email, password, error)}
          fullWidth
        />
        <Spacer />
        <Button
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.SMALL}
          mode={ButtonMode.NORMAL}
          text="Continue with Google"
          onClick={() => handleGoogleLogin(setError)}
          fullWidth
        />
      </Form>
    </Container>
  );
};

export default SignUpComponent;