import React from 'react';
import { CardElement } from "@stripe/react-stripe-js";
import styled from 'styled-components';
import { TextColor } from '@constants/colors';
import { Center } from '@react-three/drei';

const CardElementContainer = styled.div`
  width: 100%;
  height: 48px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  align-items: center; 
  text-align:center;
  justify-content: center; 
`;

const CustomCardElement = () => {
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Arial, sans-serif',
        '::placeholder': {
          color: '#e2e9f0',
        },
      },
      invalid: {
        color: `${TextColor.BLACK}`,
      },
    },
    hidePostalCode: true,
  };

  return (
    <CardElementContainer>
      <CardElement options={cardElementOptions} />
    </CardElementContainer>
  );
};

export default CustomCardElement;