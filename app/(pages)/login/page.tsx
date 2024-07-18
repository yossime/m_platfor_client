"use client"
import LoginComponent from '@/components/connection/login/login';
import SignUpComponent from '@/components/connection/signUp/SignUp';
import { auth } from '@/services/firebase';
import { LoginProvider } from '@context/useLogin';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LoginPage = () => {
    const router = useRouter();
    const [login, setLogin] = useState<boolean>(true);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                router.push('/userPage');
            }
        });
    });

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

export default LoginPage;
