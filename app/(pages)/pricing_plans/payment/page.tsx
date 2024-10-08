"use client";
import { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import axios from "@/utils/axios";
import SubscriptionPayment from "@/components/Subscription/SubscriptionPayment";
import { Elements } from "@stripe/react-stripe-js";

const PaymentPage: React.FC = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get("subscription/config");
        const { publishableKey } = response.data;
        const loadedStripe = await loadStripe(publishableKey);
        setStripe(loadedStripe); 
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };

    if (!stripe) {
      fetchConfig(); 
    }
  }, [stripe]); 

  if (!stripe) {
    return <div>Loading payment system...</div>; 
  }

  return (
    <Elements stripe={stripe}>
      <SubscriptionPayment />
    </Elements>
  );
};

export default PaymentPage;
