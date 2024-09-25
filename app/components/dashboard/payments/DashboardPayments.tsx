import React from "react";
import Text from "@/components/Library/text/Text";
import { FontWeight, TextSize } from "@constants/text";
import {
  CardContent,
  StripContent,
  ContentContainer,
  DashboardTitle,
  PaymentContent,
  TextContent,
  ButtonContent,
} from "../DashboardStyles";
import Icon from "@/components/Library/icon/Icon";
import { IconName, IconSize } from "@constants/icon";
import Button from "@/components/Library/button/Button";

const DashboardPayments: React.FC = () => {
  return (
    <>
      <ContentContainer>
        <DashboardTitle>
          <Text $weight={FontWeight.SEMI_BOLD} size={TextSize.D3}>
            {"Third-party payment providers"}
          </Text>
          <Text size={TextSize.TEXT1}>
            {
              "Connect a Payment Provider: Create an account with a payment service and set it up in your Mocart store to start receiving payments."
            }
          </Text>
        </DashboardTitle>

        <PaymentContent>
          <StripContent>
            <CardContent>
            <Icon size={IconSize.XXLARGE} name={IconName.CREDITCARD}/>
            </CardContent>
            <TextContent>
            <Text $weight={FontWeight.SEMI_BOLD} size={TextSize.TEXT1}>
            {"Stripe"}
          </Text>
          <Text>
            {"Available in your country"}
          </Text>
            </TextContent>
            <ButtonContent>
              <Button text="Connect"/>
            </ButtonContent>
          </StripContent>
        </PaymentContent>
      </ContentContainer>
    </>
  );
};

export default DashboardPayments;
