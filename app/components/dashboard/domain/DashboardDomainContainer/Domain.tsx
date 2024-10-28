
import React, { useState } from "react";
import Text from "@components/Library/text/Text";
import {  TextContainer } from "./CommonStyles";
import { FontFamily, FontWeight, TextSize } from "@constants/text";

const Domain: React.FC = () => {


  return (
      <TextContainer>
        <Text
          size={TextSize.H3}
          $family={FontFamily.Poppins}
          $weight={FontWeight.SEMI_BOLD}
        >
          Set it up!
        </Text>
        <Text size={TextSize.TEXT1}>
          Log into your domain host's site. Find your domain settings page and
          locate the name server records. Return to the this Mocart domains page
          and follow the instructions.
        </Text>
      </TextContainer>
  );
};

export default Domain;
