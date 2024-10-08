import React, { ReactNode } from "react";
import styled from "styled-components";
import Icon from "@/components/Library/icon/Icon";
import { IconName, IconSize } from "@constants/icon";
import { BackgroundColor, IconColor } from "@constants/colors";

interface PopupProps {
  children: ReactNode;
  onClose: () => void;
}

const PopupContent = styled.div`
  position: fixed;
  top: 71px;
  right: 16px;
  background-color: ${BackgroundColor.GREY_BACKGROUND};
  max-height: 600px;
  padding: 20px;
  width: 283px;
  border-radius: 4px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background-color: aliceblue;
`;

const ChildrenContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
`;

const SignUpPopup: React.FC<PopupProps> = ({ children, onClose }) => {
  return (
    <PopupContent>
      <CloseButton>
        <Icon
          onClick={onClose}
          name={IconName.X}
          size={IconSize.SMALL}
          color={IconColor.ICONCOLOR}
        />
      </CloseButton>
      <ChildrenContent>{children}</ChildrenContent>
    </PopupContent>
  );
};

export default SignUpPopup;
