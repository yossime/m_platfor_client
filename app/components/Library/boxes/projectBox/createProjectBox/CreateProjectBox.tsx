// CreateProjectBox.tsx
import React from "react";
import Text from "@components/Library/text/Text";
import Icon from "@components/Library/icon/Icon";
import {
  ComingSoon,
  CreateProjectBoxContainer,
  CreateProjectText,
} from "./CreateProjectBoxStyles";
import { IconName, IconSize } from "@constants/icon";
import { FontFamily, FontWeight, TextSize } from "@constants/text";
import { IconColor, TextColor } from "@constants/colors";

interface CreateProjectBoxProps {
  onClick: () => void;
  text: string;
  clicked?: boolean;
  disabled?: boolean;
}

const CreateProjectBox: React.FC<CreateProjectBoxProps> = ({
  onClick,
  text,
  disabled = false,
  clicked = false,
}) => {
  return (
    <CreateProjectBoxContainer
      $clicked={clicked}
      onClick={onClick}
      $disabled={disabled}
    >
      {disabled && (
        <ComingSoon>
          <Text
            size={TextSize.TEXT2}
            color={TextColor.TEXT_ON_PRIMARY}
            cursorStyle="pointer"
          >
            COMING SOON
          </Text>
        </ComingSoon>
      )}
      <Icon
        name={IconName.PLUSCIRCLE}
        color={disabled ? IconColor.DISABLED : IconColor.ICONCOLOR}
      />
      <CreateProjectText>
        <Text
          cursorStyle="pointer"
          size={TextSize.TEXT2}
          color={disabled ? TextColor.DISABLED_TEXT : TextColor.PRIMARY_TEXT}
        >
          {text}
        </Text>
      </CreateProjectText>
    </CreateProjectBoxContainer>
  );
};

export default CreateProjectBox;
