

import axios from "@/utils/axios";
import { loadConnectAndInitialize, StripeConnectInstance } from "@stripe/connect-js";
import { useCallback, useState } from "react";






    export const useStripeConnect = (storeId: string) => {
        const [currStoreId, setCurrStoreId] = useState<string>(storeId);
        const [stripeConnectInstance, setStripeConnectInstance] = useState<StripeConnectInstance | null>(null);

        const createStripeAccount = useCallback(async () => {
            try {
                const response = await axios.post(`store/${currStoreId}/payment-gateway/stripe`);
                return response.data.account;
            } catch (error) {
                console.error('Error creating Stripe account:', error);
                return null;
            }
        }, []);

        const createAccountSession = useCallback(async (accountId: string) => {
            try {
                const fetchClientSecret = async () => {
                    const response = await axios.post(`store/${currStoreId}/payment-gateway/stripe/account-session`,
                        {
                            accountId: accountId
                        });

                    const { client_secret: clientSecret } = response.data;
                    return clientSecret;
                }

                const instance = loadConnectAndInitialize({
                    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
                    fetchClientSecret,
                    appearance: {
                        overlays: "dialog",
                        variables: {
                            colorPrimary: "#635BFF",
                        },
                    },
                });

                setStripeConnectInstance(instance);
                return instance;

            } catch (error) {
                console.error('Error creating account session:', error);
                return null;
            }
        }, []);

        return { createStripeAccount, createAccountSession, stripeConnectInstance };
    };
