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
  StripContainer,
  StripContent,
  StripMassegContainer,
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
import PopupStrip from "./PopupStrip";
import { TextColor } from "@constants/colors";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/useUserContext";
import { ButtonMode, ButtonType, ButtonVariant } from "@constants/button";

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding: 20px;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: end;
  gap: 24px;
  width: 100%;
  height: 100%;
`;

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #e5e7eb;
`;

const StripComponent = () => {
  const { currentProject } = useProject();
  const [onboardingExited, setOnboardingExited] = useState<boolean>(false);
  const [accountCreatePending, setAccountCreatePending] =
    useState<boolean>(false);
  const { stripeConnectInstance, createStripeAccount, createAccountSession ,disconnectStripeAccount } =
    useStripeConnect(currentProject!);
  const { storeData, setStoreData } = useStoreData(
    currentProject!
  );

  const handleSignUp = async () => {
    setAccountCreatePending(true);
    setOnboardingExited(true);
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
  const router = useRouter();
  const { userData } = useUserContext();

  const handlePlus = () => {
    router.push("/pricing_plans");
  };

  const handleDisconnect = async () => {
    try {
      await disconnectStripeAccount(); 
      setStoreData(null);
      console.log("Stripe account disconnected successfully");
    } catch (error) {
      console.error("Failed to disconnect Stripe account:", error);
    }
  };
  
  
  const subsc = userData?.plan === "business";
  const getAccountStatus = () => {
    if (!storeData?.stripeAccountId) return null;
    if (storeData.chargesEnabled && storeData.payoutsEnabled) {
      if (!subsc) {
        <StatusContainer>
          <Divider />
          <StripMassegContainer>
            <Text>{"Receiving payments is a Mocart-Business feature"}</Text>
            <Text
              $cursorStyle="pointer"
              color={TextColor.LINK}
              onClick={handlePlus}
            >
              {"Upgrade"}
            </Text>
          </StripMassegContainer>
        </StatusContainer>;
      } else {
        return null;
      }
    }
    return (
      <StatusContainer>
        <Divider />
        <StripMassegContainer>
          <Text>
            {"Your account is set up, but not yet ready to accept payments."}
          </Text>
          <Text
            $cursorStyle="pointer"
            color={TextColor.LINK}
            onClick={handleSignUp}
          >
            {"Complete the onboarding process"}
          </Text>
        </StripMassegContainer>
      </StatusContainer>
    );
  };

  return (
    <StripContainer>
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
        {stripeConnectInstance && onboardingExited && (
          <PopupStrip
            onClose={() => {
              setOnboardingExited(false);
            }}
          >
            <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
              <ConnectAccountOnboarding
                onExit={() => setOnboardingExited(false)}
              />
            </ConnectComponentsProvider>
          </PopupStrip>
        )}
      </StripContent>
      {getAccountStatus()}
      <ButtonContainer>
        {storeData?.stripeAccountId && (
          <Button
          onClick={handleDisconnect}
            type={ButtonType.NEGATIVE}
            variant={ButtonVariant.SECONDARY}
            text="Disconnect"
          />
        )}
        {!subsc && storeData?.stripeAccountId && (
          <Button
            icon={IconName.SKECHLOGO}
            onClick={handlePlus}
            text="Activate"
          />
        )}
      </ButtonContainer>
    </StripContainer>
  );
};

export default StripComponent;
