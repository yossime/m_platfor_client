"use client"
import React, { useEffect, useState } from 'react';
import Input from '@/components/Library/input/Input';
import Text from '@components/Library/text/Text';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode } from '@constants/button';
import { InputSize, InputMode } from '@constants/input';
import { useLogin } from '@context/useLogin';
import { handleGoogleLogin, handleSignIn } from '@/services/login';
import { Container, Form, Spacer, LinkContainer, Link } from './LoginStyles';
import Button from '@/components/Library/button/Button';
import { FontFamily, FontWeight, TextColor, TextSize } from '@constants/text';

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
            <Text size={TextSize.D1} weight={FontWeight.SEMI_BOLD} color={TextColor.BLACK} family={FontFamily.Poppins}>
            Welcome</Text>
                <Spacer />
                <LinkContainer>
                <Text size={TextSize.TEXT1} weight={FontWeight.NORMAL} color={TextColor.PRIMARY_TEXT} family={FontFamily.Figtree}>
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
                            fullWidth={true}
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
                            fullWidth={true}
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
                    fullWidth={true}
                />
            </Form>
        </Container>
    );
};

export default LoginComponent;