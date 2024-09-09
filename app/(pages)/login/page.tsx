"use client"
import LoginComponent from '@/components/connection/login/login';
import SignUpComponent from '@/components/connection/signUp/SignUp';
import { auth } from '@/services/firebase';
import axios from '@/utils/axios';
import { LoginProvider } from '@context/useLogin';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LoginPage = () => {
    const router = useRouter();
    const [login, setLogin] = useState<boolean>(true);


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                try {
                    axios.get(`user`)
                        .then(response => {
                            console.log(response.data);
                           if (response.data.isNew)
                            router.push('/onboarding');
                           else{
                            router.push('/userPage');
                           }
                        })
                } catch (error) {
                    console.error('Error fetching files:', error);
                }
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
