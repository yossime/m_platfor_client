import React from "react";
import styled from "styled-components";
import { IconName, IconSize } from "@constants/icon";
import { TextColor } from "@constants/colors";
import { FontWeight, TextSize } from "@constants/text";
import Icon from "../icon/Icon";
import Text from "../text/Text";
import { ButtonMode, ButtonSize, ButtonType, ButtonVariant } from "@constants/button";
import Button from "../button/Button";

interface DataObfuscatorProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  textweight? :FontWeight;

}

const DataObfuscatorWrapper = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
  overflow: hidden;
`;

const DataObfuscatorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;

`;

const DataObfuscatorContent = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  gap: 8px;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

const DataObfuscator: React.FC<DataObfuscatorProps> = ({
  title,
  children,
  isOpen,
  onToggle,
  textweight = FontWeight.SEMI_BOLD,
}) => {
  const handleToggle = () => {
    onToggle(!isOpen);
  };

  return (
    <DataObfuscatorWrapper>
      <DataObfuscatorHeader onClick={handleToggle}>
        <Text
          size={TextSize.TEXT2}
          weight={textweight}
          color={TextColor.PRIMARY_TEXT}
        >
          {title}
        </Text>
        <Icon
          name={isOpen ? IconName.MINUS : IconName.PLUS}
          size={IconSize.SMALL}
          onClick={handleToggle}
        />
      </DataObfuscatorHeader>
      <DataObfuscatorContent $isOpen={isOpen}>{children}</DataObfuscatorContent>
    </DataObfuscatorWrapper>

  );
};

export default DataObfuscator;
