import React from "react";
import {
  TemplateContainer,
  TemplateImageContainer,
  TemplateImage,
  TemplateTitle,
} from "./TemplateBoxStyles";
import Text from "@components/Library/text/Text";
import { FontWeight, TextSize } from "@constants/text";

interface TemplateProps {
  title: string;
  clicked: boolean;
  onClick: (type: string) => void;
  backgroundImage: string;
  disabled?: boolean;
}

const TemplateBox: React.FC<TemplateProps> = ({
  title,
  clicked,
  onClick,
  backgroundImage,
  disabled = false,
}) => {
  // backgroundImage = 'images/Sunset.jpg'

  return (
    <TemplateContainer
      $clicked={clicked}
      onClick={() => onClick(title)}
      $disabled={disabled}
    >
      <TemplateImageContainer>
        <TemplateImage src={backgroundImage} alt={title} />
      </TemplateImageContainer>
      <TemplateTitle>
        <Text $cursorStyle="pointer" size={TextSize.TEXT2}>
          {title}
        </Text>
      </TemplateTitle>
    </TemplateContainer>
  );
};

export default TemplateBox;
