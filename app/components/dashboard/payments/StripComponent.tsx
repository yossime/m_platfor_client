"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useStripeConnect } from "@/context/useStripeConnect";
import { useProject } from "@/context/useProjectContext";
import { useStoreData } from "@/context/useStoreData";
import Button from "@/components/Library/button/Button";
import {
  ButtonContent,
  CardContent,
  StripContent,
  TextContent,
} from "../DashboardStyles";
import { FontWeight, TextSize } from "@constants/text";
import Icon from "@/components/Library/icon/Icon";
import { IconName, IconSize } from "@constants/icon";
import Text from "@/components/Library/text/Text";
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";
import Popup from "@/components/Library/general/Popup";
import PopupStrip from "./PopupStrip";
import { TextColor } from "@constants/colors";

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
`;
const StatusMessage = styled.p`
  margin-top: 20px;
  font-weight: bold;
  color: ${(props) => props.color || "#333"};
`;
const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  height: 200px;
  margin-top: auto;
  padding: 20px;
`;

const StripComponent = () => {
  // const { id: storeId } = useParams();
  // const [currStoreId, setCurrStoreId] = useState<string>(storeId as string);
  const { currentProject } = useProject();
  const [onboardingExited, setOnboardingExited] = useState<boolean>(false);
  const [accountCreatePending, setAccountCreatePending] =
    useState<boolean>(false);
  const { stripeConnectInstance, createStripeAccount, createAccountSession } =
    useStripeConnect(currentProject!);
  const {
    storeData,
    loading: storeDataLoading,
    refreshStoreData,
  } = useStoreData(currentProject!);

  const handleSignUp = async () => {
    setAccountCreatePending(true);
    setOnboardingExited(true)
    try {
      const accountId = await createStripeAccount();
      if (accountId) {
        await createAccountSession(accountId);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    } finally {
      setAccountCreatePending(false);
    }
  };

  const getAccountStatus = () => {
    if (!storeData?.stripeAccountId) return null;
    if (storeData.chargesEnabled && storeData.payoutsEnabled) {
      return null;
    }
    return (
      <>
        <Text>
          {" Your account is set up, but not yet ready to accept payments. "}
        </Text>
        <Text color={TextColor.LINK} onClick={handleSignUp}>
          {"Complete the onboarding process"}
        </Text>
      </>
    );
  };

  return (
    <StripContent>
      <CardContent>
        <Icon size={IconSize.XXLARGE} name={IconName.CREDITCARD} />
      </CardContent>
      <TextContent>
        <Text $weight={FontWeight.SEMI_BOLD} size={TextSize.TEXT1}>
          {"Stripe"}
        </Text>
        <Text>{"Available in your country"}</Text>
      </TextContent>
      <ButtonContent>
        {!storeData?.stripeAccountId && (
          <Button onClick={handleSignUp} text="Connect" />
        )}
      </ButtonContent>
      {getAccountStatus()}
      {stripeConnectInstance && onboardingExited && (
        <PopupStrip onClose={() => {setOnboardingExited(true)}}>
          <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
            <ConnectAccountOnboarding
              onExit={() => setOnboardingExited(true)}
            />
          </ConnectComponentsProvider>
        </PopupStrip>
      )}
    </StripContent>
  );
};

export default StripComponent;
