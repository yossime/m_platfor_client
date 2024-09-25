import React from "react";
import Text from "@/components/Library/text/Text";
import { FontWeight, TextSize } from "@constants/text";
import {
  ContentContainer,
  DashboardTitle,
  PaymentContent,

} from "../DashboardStyles";
import StripComponent from "./StripComponent";

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
          <StripComponent />
        </PaymentContent>
      </ContentContainer>
    </>
  );
};

export default DashboardPayments;
