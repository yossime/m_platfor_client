import React from "react";
import {
  SubscriptionBoxContainer,
  SubscriptionTitle,
  Includes,
  PriceContainer,
  TopContainer,
} from "./SubscriptionBoxStyles";
import Text from "@components/Library/text/Text";
import { FontFamily, FontWeight, TextSize } from "@constants/text";
import Button from "../../button/Button";
import { ButtonSize, ButtonType, ButtonVariant } from "@constants/button";
import { TextColor } from "@constants/colors";

interface TemplateProps {
  yearly: boolean;
  price: string | number;
  title: string;
  includeTitle: string;
  includes: string[];
  buttonText: string;
  subTitle: string;
  onClick: (type: string) => void;
  clicked?: boolean;
  backgroundImage?: string;
  disabled?: boolean;
}

const SubscriptionBox: React.FC<TemplateProps> = ({
  yearly,
  price,
  subTitle,
  includes,
  includeTitle,
  buttonText,
  title,
  onClick,
}) => {

  const renderPrice = () => {
    if (typeof price === "number") {
      const salePrice = Math.floor(price - price * 0.18);
      return !yearly ? (
        <>
          <Text
            size={TextSize.H1}
            weight={FontWeight.SEMI_BOLD}
            color={TextColor.PRIMARY}
          >{`$${price}/mo`}</Text>
          <Text
            size={TextSize.TEXT2}
            weight={FontWeight.NORMAL}
            color={TextColor.PRIMARY_TEXT}
          >
            {"Billed Monthly"}
          </Text>
        </>
      ) : (
        <>
          <Text
            size={TextSize.H1}
            weight={FontWeight.SEMI_BOLD}
            color={TextColor.PRIMARY}
          >{`$${salePrice}/mo`}</Text>
          <Text
            size={TextSize.TEXT2}
            weight={FontWeight.NORMAL}
            color={TextColor.PRIMARY_TEXT}
          >
            {`$${(salePrice * 12)} Billed Annually`}
          </Text>
        </>
      );
    } else if (typeof price === "string") {
      return (
        <Text
          size={TextSize.H1}
          weight={FontWeight.SEMI_BOLD}
          color={TextColor.PRIMARY}
        >
          {price}
        </Text>
      );
    } else {
      return "Invalid price";
    }
  };

  return (
    <SubscriptionBoxContainer onClick={() => onClick(title)}>
      <TopContainer>
        <SubscriptionTitle>
          <Text size={TextSize.H2} weight={FontWeight.SEMI_BOLD}>
            {title}
          </Text>
          <Text weight={FontWeight.LIGHT} size={TextSize.H3} family={FontFamily.Poppins}>{subTitle}</Text>
        </SubscriptionTitle>
        <PriceContainer>{renderPrice()}</PriceContainer>
      </TopContainer>
      <Button
        size={ButtonSize.LARGE}
        type={ButtonType.PRIMARY}
        variant={buttonText === "Get Plus" ? ButtonVariant.PRIMARY: ButtonVariant.SECONDARY}
        text={buttonText}
        fullWidth
      ></Button>
      <Includes>
        <Text size={TextSize.TEXT2} color={TextColor.SECONDARY_TEXT} weight={FontWeight.SEMI_BOLD}>
          {includeTitle}
        </Text>
        {includes.map((item, index) => (
          <Text key={index} size={TextSize.TEXT2} weight={FontWeight.NORMAL}>
            {item}
          </Text>
        ))}
      </Includes>
    </SubscriptionBoxContainer>
  );
};

export default SubscriptionBox;
