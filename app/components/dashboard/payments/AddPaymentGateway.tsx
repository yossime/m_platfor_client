"use client"
import React, { useEffect, useState } from 'react';
import { ConnectAccountOnboarding, ConnectComponentsProvider } from '@stripe/react-connect-js';
import { useParams } from 'next/navigation';
import PaymentGatewayDashboard from './PaymentGatewayDashboard';
import styled from 'styled-components';
import { useStripeConnect } from '@/context/useStripeConnect';


const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
`;



const AddPaymentGateway = () => {
    const { id: storeId } = useParams();
    const [currStoreId, setCurrStoreId] = useState<string>(storeId as string);
    const [onboardingExited, setOnboardingExited] = useState<boolean>(false);
    const [accountCreatePending, setAccountCreatePending] = useState<boolean>(false);
    const { stripeConnectInstance, createStripeAccount, createAccountSession } = useStripeConnect(currStoreId);

    useEffect(() => {
        if (typeof storeId === 'string') {
            setCurrStoreId(storeId)
        }
    }, [storeId]);

    const handleSignUp = async () => {
        setAccountCreatePending(true);
        try {
            const accountId = await createStripeAccount();
            if (accountId) {
                await createAccountSession(accountId);
            }
        } catch (error) {
            console.error('Error during sign up:', error);
        } finally {
            setAccountCreatePending(false);
        }
    };


    return (
        <Container>
            <PaymentGatewayDashboard onSignUp={handleSignUp} isLoading={accountCreatePending} />

            {stripeConnectInstance && (
                <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
                    <ConnectAccountOnboarding
                        onExit={() => setOnboardingExited(true)}
                    />
                </ConnectComponentsProvider>
            )}

            {accountCreatePending && <p>Creating a connected account...</p>}
            {onboardingExited && <p>The Account Onboarding component has exited</p>}
        </Container>
    );
};

export default AddPaymentGateway;