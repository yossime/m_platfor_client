import React from "react";
import Text from "@components/Library/text/Text";
import { TextContainer } from "./CommonStyles";
import { FontFamily, FontWeight, TextSize } from "@constants/text";
import { TextColor } from "@constants/colors";

const Domain3: React.FC = () => {
  return (
    <TextContainer>
      <Text
          size={TextSize.H3}
          $family={FontFamily.Poppins}
          $weight={FontWeight.SEMI_BOLD}
      >
         Domain Propagation
      </Text>
      <Text size={TextSize.TEXT1}>
        Your work is complete. It may take up to 48 hours for your domain's new
        DNS records to propagate and your site to appear worldwide. During this
        time, your site may not be reachable under EdenIsRashi’sOffspring.com We
        will update you via email.
      </Text>
    </TextContainer>
  );
};

export default Domain3;
