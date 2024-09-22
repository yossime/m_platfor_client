"use client"
import { useStoreData } from '@/(pages)/store/hooks/useStoreData';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  height: 90vh;
  margin: auto;
  padding: 20px;
`;


const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  height: 200px;
  margin-top: auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #635BFF;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #4B44C0;
  }

  &:disabled {
    background-color: #B8B5FF;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.p`
  margin-top: 20px;
  font-weight: bold;
  color: ${props => props.color || '#333'};
`;

interface DashboardProps {
  onSignUp: () => Promise<void>;
  isLoading: boolean;
}

const PaymentGatewayDashboard: React.FC<DashboardProps> = ({ onSignUp, isLoading }) => {

  const { id: storeId } = useParams();
  const [showDashboard, setShowDashboard] = useState<boolean>(true);
  const { storeData, loading: storeDataLoading, refreshStoreData } = useStoreData(storeId as string);


  const handleSignUp = () => {
    onSignUp()
    setShowDashboard(false);
  }

  if (storeDataLoading) {
    return <div>Loading store data...</div>;
  }

  const getAccountStatus = () => {
    if (!storeData?.stripeAccountId) return null;
    if (storeData.chargesEnabled && storeData.payoutsEnabled) {
      return <StatusMessage color="green">Your account is fully set up and ready to accept payments!</StatusMessage>;
    }
    return <StatusMessage color="orange">Your account is set up, but not yet ready to accept payments. Please complete the onboarding process.</StatusMessage>;
  };

  return (
    <>
      {showDashboard && <DashboardContainer>
        <Title>Mocart Seller Dashboard</Title>

        {!storeData?.payoutsEnabled && (
          <>
            <p>Add Stripe Payment Gateway to your store</p>
            <Button onClick={handleSignUp} disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign up as a Seller'}
            </Button>
          </>
        )}

        {storeData?.stripeAccountId && (
          <StatusContainer>
            <p>Your Stripe account is set up.</p>
            {getAccountStatus()}
            <Button onClick={refreshStoreData}>Refresh Status</Button>
          </StatusContainer>
        )}
      </DashboardContainer>
      }
    </>
  );
};

export default PaymentGatewayDashboard;