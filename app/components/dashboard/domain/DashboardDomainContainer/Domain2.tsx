import React from "react";
import Text from "@components/Library/text/Text";
import { TextContainer, TextContainerDomain } from "./CommonStyles";
import { FontFamily, FontWeight, TextSize } from "@constants/text";
import { TextColor } from "@constants/colors";

const Domain2: React.FC = () => {
  return (
    <TextContainer>
      <Text
        size={TextSize.TEXT2}
        $family={FontFamily.Poppins}
        $weight={FontWeight.SEMI_BOLD}
        color={TextColor.PRIMARY_TEXT}
      >
        On your domain provider's website, enter the required values, and verify
        your connection
      </Text>

      <Text
        size={TextSize.TEXT2}
        $weight={FontWeight.BOLD}
        color={TextColor.PRIMARY_TEXT}
      >
        CNAME
      </Text>
      <TextContainerDomain>
        <Text
          size={TextSize.TEXT2}
          $weight={FontWeight.NORMAL}
          color={TextColor.PRIMARY_TEXT}
        >
          Name
        </Text>
        <Text
          size={TextSize.TEXT1}
          $weight={FontWeight.NORMAL}
          color={TextColor.PRIMARY_TEXT}
        >
          www
        </Text>

        <Text
          size={TextSize.TEXT2}
          $weight={FontWeight.NORMAL}
          color={TextColor.PRIMARY_TEXT}
        >
          Required value
        </Text>
        <Text
          size={TextSize.TEXT1}
          $weight={FontWeight.NORMAL}
          color={TextColor.PRIMARY_TEXT}
        >
        websites.simkami.com
        </Text>
      </TextContainerDomain>
    </TextContainer>
  );
};

export default Domain2;
