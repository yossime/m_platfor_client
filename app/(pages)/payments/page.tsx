"use client"
import { useEffect, useState } from "react";
import SubscriptionForm from "./SubscriptionForm";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import axios from "@/utils/axios";


export default function App() {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get('http://localhost:3500/payments/config');
        const { publishableKey } = response.data;
        setStripePromise(loadStripe(publishableKey));
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };

    fetchConfig();
  }, []);
  return (
    <div>
      <h1>Subscribe to our service</h1>
      <SubscriptionForm stripePromise={stripePromise} />
    </div>
  );
}