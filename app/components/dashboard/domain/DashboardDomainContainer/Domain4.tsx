import React from "react";
import Text from "@components/Library/text/Text";
import { TextContainer1 } from "./CommonStyles";
import { FontFamily, FontWeight, TextSize } from "@constants/text";
import { TextColor } from "@constants/colors";

const Domain4: React.FC = () => {
  return (
    <TextContainer1>
      <Text
        size={TextSize.H3}
        $family={FontFamily.Poppins}
        $weight={FontWeight.SEMI_BOLD}
      >
        Check it out under -
      </Text>
      <Text size={TextSize.TEXT1} color={TextColor.LINK}>
        Check it out under -
      </Text>
    </TextContainer1>
  );
};

export default Domain4;
