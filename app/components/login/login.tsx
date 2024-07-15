"use client"
import React, { useEffect, useState } from 'react';
import Input from '@/components/Library/input/Input';
import Text from '@components/Library/text/Text';
import Button from '../Library/button/Button';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode } from '@constants/buttton';
import { InputSize, InputMode } from '@constants/input';
import { useLogin } from '@context/useLogin';
import { handleGoogleLogin, handleSignIn } from '@/services/login';
import { Container, Form, Spacer, LinkContainer, Link } from './LoginStyles';

interface LoginComponentProps {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ setLogin }) => {
    const [googleButton, setGoogleButton] = useState<boolean>(true);
    const [inputPassword, setInputPassword] = useState<boolean>(false);
    const [userExists, setUserExists] = useState<boolean>(false);

    const { email, setEmail, password, setPassword, error, setError } = useLogin();

    useEffect(() => {
        setGoogleButton(true);
        setInputPassword(false);
        setUserExists(false);
    }, []);

    const handleLoginClick = () => setLogin(false);

    const handleLogin = async () => {
        try {
            await handleSignIn(email, password, error);
            console.log('Login successful');
        } catch (error: any) {
            switch (error.code) {
                case 'auth/wrong-password':
                    setGoogleButton(false);
                    setInputPassword(true);
                    break;
                case 'auth/user-not-found':
                    setUserExists(false);
                    break;
                default:
                    setError(error.message);
                    break;
            }
        }
    };

    return (
        <Container>
            <Form>
                <Text size="D1" weight="SEMIBLOB" color="black">Welcome</Text>
                <Spacer />
                <LinkContainer>
                    <Text size="TEXT1" weight="NORMAL" color="primary_text">
                    &quot;Don&apos;t have an account? &quot;
                    </Text>
                    <Link onClick={handleLoginClick}>sign up</Link>
                </LinkContainer>
                {googleButton && (
                    <>
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
                    </>
                )}
                {userExists && (
                    <>
                        <Spacer />
                        <Button
                            type={ButtonType.NEGATIVE}
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.LARGE}
                            mode={ButtonMode.NORMAL}
                            text="We couldn't find this email. Would you like to sign up with this email address?"
                            fullWidth
                        />
                    </>
                )}
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
                {inputPassword && (
                    <>
                        <Spacer />
                        <Input
                            size={InputSize.SMALL}
                            mode={InputMode.NORMAL}
                            label="Password"
                            placeholder="Enter at least 8 characters"
                            value={password}
                            onChange={setPassword}
                            helperText="Enter your password"
                            // type="password"
                        />
                    </>
                )}
                <Spacer />
                <Button
                    type={ButtonType.PRIMARY}
                    variant={ButtonVariant.PRIMARY}
                    size={ButtonSize.SMALL}
                    mode={ButtonMode.NORMAL}
                    text="Continue"
                    onClick={handleLogin}
                    fullWidth
                />
            </Form>
        </Container>
    );
};

export default LoginComponent;