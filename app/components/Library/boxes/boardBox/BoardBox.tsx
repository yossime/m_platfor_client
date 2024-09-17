import React from "react";
import { IconName, IconSize } from "@constants/icon";
import { BoardContainer, ContentWrapper, TextWrapper } from "./BoardBoxStyles";
import Icon from "@/components/Library/icon/Icon";
import { IconWrapper, Title, Description } from "../BaseBoxStyles";
import Text from "../../text/Text";
import { FontWeight, TextSize } from "@constants/text";
import { IconColor, TextColor } from "@constants/colors";

export enum BoxSize {
  XS = "xs",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

interface BoardProps {
  title: string;
  body?: string;
  clicked: boolean;
  onClick: (type: string) => void;
  size?: BoxSize;
  iconName?: IconName;
  iconSize?: IconSize;
  iconColor?: IconColor;
  disabled?: boolean;
}

const BoardBox: React.FC<BoardProps> = ({
  title,
  body,
  clicked,
  onClick,
  iconName,
  size = BoxSize.SMALL,
  iconSize = IconSize.MEDIUM,
  iconColor = IconColor.ICONCOLOR,
  disabled = false,
}) => {
  return (
    <BoardContainer
      $size={size}
      $clicked={clicked}
      $disabled={disabled}
      onClick={() => onClick(title)}
    >
      <ContentWrapper>
        {iconName && (
          <IconWrapper>
            <Icon
              name={iconName}
              size={iconSize}
              color={disabled ? IconColor.DISABLED : iconColor}
            />
          </IconWrapper>
        )}
        <TextWrapper>
          <Text
            $cursorStyle="pointer"
            size={TextSize.TEXT2}
            weight={FontWeight.BOLD}
            color={disabled ? TextColor.DISABLED_TEXT : TextColor.PRIMARY_TEXT}
          >
            {title}
          </Text>
          <Text
            $cursorStyle="pointer"
            size={TextSize.TEXT2}
            weight={FontWeight.NORMAL}
            color={disabled ? TextColor.DISABLED_TEXT : TextColor.PRIMARY_TEXT}
          >
            {body}
          </Text>
        </TextWrapper>
      </ContentWrapper>
    </BoardContainer>
  );
};

export default BoardBox;
