"use client"
import React, { useState } from 'react';
import { Stripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '@/utils/axios';

const CustomCardElement = () => {
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
    // hidePostalCode: true,
  };

  return <CardElement options={cardElementOptions} />;
};

const SubscriptionForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [plan, setPlan] = useState('basic');
  const [interval, setInterval] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountInfo, setDiscountInfo] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isFreeMonth, setIsFreeMonth] = useState(false);

  const handleDiscountValidation = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('payments/validate-discount', {
        code: discountCode
      });

      const data = response.data;
      console.log("validate-discount", response.data)
      if (data.valid) {
        setDiscountInfo(data);
        setIsFreeMonth(data.isFreeMonth || false);
      } else {
        setDiscountInfo(null);
        setIsFreeMonth(false);
        setError(data.message);
        console.log('Invalid discount code', data.message);
      }
    } catch (error) {
      console.error('Error validating discount:', error);
      setError('Error validating discount code');
    }
    setLoading(false);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (isFreeMonth) {
        const response = await axios.post('payments/create-free-subscription', {
          plan,
          interval,
          discountCode,
        });
        console.log('Free month subscription created:', response.data);
        // Handle success (e.g., show a success message, redirect user)
      } else {
        if (!stripe || !elements) {
          throw new Error('Stripe not initialized');
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
          throw new Error("Couldn't find the card element. Please try again.");
        }

        // Create payment method
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (paymentMethodError) {
          throw new Error(paymentMethodError.message);
        }

        const subscriptionResponse = await axios.post('payments/create-subscription', {
          paymentMethodId: paymentMethod.id,
          plan,
          interval,
          discountCode,
        });

        const { subscriptionId } = subscriptionResponse.data;

        console.log('Subscription created:', subscriptionId);
        // Handle success (e.g., show a success message, redirect user)
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      setError(error instanceof Error ? error.message : 'Failed to create subscription. Please try again.');
    }

    setLoading(false);
  };

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit}>
        <select value={plan} onChange={(e) => setPlan(e.target.value)}>
          <option value="basic">Basic</option>
          <option value="pro">Pro</option>
        </select>
        <select value={interval} onChange={(e) => setInterval(e.target.value)}>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        {!isFreeMonth && <CustomCardElement />}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div>
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="Enter discount code"
          />
          <button type="button" onClick={handleDiscountValidation} disabled={loading}>
            Apply Discount
          </button>
        </div>
        {discountInfo && (
          <div>
            Discount applied: {isFreeMonth ? 'Free month' : `${discountInfo.discountAmount} off`}
            {!isFreeMonth && discountInfo.duration !== 'forever' && ` for ${discountInfo.durationInMonths || 1} month(s)`}
          </div>
        )}
        <button type="submit" disabled={(!stripe && !isFreeMonth) || loading}>
          {isFreeMonth ? 'Start Free Month' : 'Subscribe'}
        </button>
      </form>
    </>
  );
};

interface SubscriptionComponentProps {
  stripePromise: Promise<Stripe | null> | null;
}

const SubscriptionComponent = ({ stripePromise }: SubscriptionComponentProps) => (
  <Elements stripe={stripePromise}>
    <SubscriptionForm />
  </Elements>
);

export default SubscriptionComponent;