"use client";
import { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import axios from "@/utils/axios";
import SubscriptionPayment from "@/components/Subscription/SubscriptionPayment";
import { Elements } from "@stripe/react-stripe-js";
import { AlignCenter } from "lucide-react";

const PaymentPage: React.FC = () => {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get("subscription/config");
        const { publishableKey } = response.data;
        setStripePromise(loadStripe(publishableKey));
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };

    fetchConfig();
  }, []);

  if (!stripePromise) {
    return <div >Loading payment system...</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <SubscriptionPayment />
    </Elements>
  );
};

export default PaymentPage;