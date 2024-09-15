import Text from "@components/Library/text/Text";
import {
  SubscriptionContainer,
  ItemsContainer,
  TextContainer,
  MenuContainer,
  MenuItem,
  ContentWrapper,
} from "./SubscriptionStyles";
import React, { useState } from "react";
import SubscriptionBox from "../Library/boxes/subscriptionBox/SubscriptionBox";
import { FontFamily, FontWeight, TextSize } from "@constants/text";
import { TextColor } from "@constants/colors";
import { Plans, useSubscription } from "@/context/useSubscriptionContext";
import {  useRouter } from "next/navigation";

interface BoxData {
  title: Plans;
  subTitle: string;
  includeTitle: string;
  includes: string[];
  buttonText: string;
  price: string | number;
}

const data: BoxData[] = [
  {
    title: Plans.Starter,
    includeTitle: "Starter plan includes:",
    includes: [
      "Design unique web spaces",
      "Publish 3D environments",
      "1 GB Cloud Storage",
    ],
    buttonText: "Sign up for free",
    subTitle: "Entrepreneurs & Freelancers",
    price: "Free",
  },
  {
    title: Plans.Plus,
    includeTitle: "Everything on starter, and:",
    includes: [
      "3 GB Cloud Storage in total",
      "Design Kit Access",
      "Custom domain",
      "Remove Mocart branding",
      "24/7 customer service",
    ],
    buttonText: "Get Plus",
    subTitle: "SMB",
    price: 21,
  },
  {
    title: Plans.Business,
    includeTitle: "Everything on Plus, and:",
    includes: [
      "50 GB Cloud Storage in total",
      "Accept payments",
      "Display 50 products for sale",
    ],
    buttonText: "Get Business",
    subTitle: "E-tailers",
    price: 36,
  },
  {
    title: Plans.Enterprise,
    includeTitle: "Everything on Business, and:",
    includes: [
      "Unlimited Cloud Storage",
      "Custom Professional Design",
      "VR Customization",
      "Display 500+ products",
    ],
    buttonText: "ask for a quote",
    subTitle: "Ask us for a quote",
    price: "Custom",
  },
];

const SubscriptionPlan: React.FC = () => {
  const {
    setMonPrice,
    yearly,
    setYearly,
    setPlan,
    plan,
  } = useSubscription();
  const router = useRouter();

  const handleClick = (plan: Plans, price: number | string) => {
    setPlan(plan);
    if (typeof price === "number") {
      setMonPrice(price);
    }
    router.push("/pricing_plans/payment");

  };

  return (
    <SubscriptionContainer>
      <TextContainer>
        <Text
          size={TextSize.D1}
          family={FontFamily.Poppins}
          weight={FontWeight.SEMI_BOLD}
          color={TextColor.PRIMARY_TEXT}
        >
          Pricing Plans
        </Text>
        <Text
          size={TextSize.H3}
          family={FontFamily.Poppins}
          weight={FontWeight.NORMAL}
          color={TextColor.PRIMARY_TEXT}
        >
          Get started with the free plan
        </Text>
      </TextContainer>
      <ContentWrapper>
        <MenuContainer>
          <MenuItem
            $side="left"
            $active={yearly}
            onClick={() => setYearly(true)}
          >
            <Text size={TextSize.TEXT1} color={TextColor.PRIMARY_TEXT}>
              {"Yearly (Save 18%)"}
            </Text>
          </MenuItem>
          <MenuItem
            $side="right"
            $active={!yearly}
            onClick={() => setYearly(false)}
          >
            <Text
              size={TextSize.TEXT1}
              weight={FontWeight.NORMAL}
              color={TextColor.PRIMARY_TEXT}
            >
              {"Monthly"}
            </Text>
          </MenuItem>
        </MenuContainer>

        <ItemsContainer>
          {data.map((item, index) => (
            <SubscriptionBox
              key={index}
              yearly={yearly}
              price={item.price}
              buttonText={item.buttonText}
              includes={item.includes}
              includeTitle={item.includeTitle}
              title={item.title}
              subTitle={item.subTitle}
              onClick={() => handleClick(item.title, item.price)}
            />
          ))}
        </ItemsContainer>
      </ContentWrapper>
    </SubscriptionContainer>
  );
};

export default SubscriptionPlan;
