import styled, { css } from "styled-components";
import {
  ButtonType,
  ButtonVariant,
  ButtonSize,
  ButtonMode,
  ButtonSizeConfig,
  getButtonColors,
  getButtonColorsHover,
} from "@constants/button";

interface StyledButtonProps {
  $type: ButtonType;
  $variant: ButtonVariant;
  $size: ButtonSize;
  $mode: ButtonMode;
  $fullWidth: boolean;
  $iconOnly: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  cursor:pointer ;
  border-radius: 4px;
  min-width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  ${(props) =>
    props.$mode !== "disabled" &&
    css`
      &:hover:not(:disabled) {
        background-color: ${getButtonColorsHover(
          props.$type,
          props.$variant,
          props.$mode
        )};
   
      }
    `}

  ${(props) => {
    const { height, padding, fontSize } = ButtonSizeConfig[props.$size];
    const { background, text, border } = getButtonColors(
      props.$type,
      props.$variant,
      props.$mode
    );

    return css`
      height: ${height};
      padding: ${props.$iconOnly ? "0" : padding};
      width: ${props.$iconOnly
        ? height
        : "auto"}; // Make width equal to height for icon-only buttons
      font-size: ${fontSize};
      background-color: ${background};
      color: ${text};
      border: 1px solid ${border};
    `;
  }}
`;

export const IconWrapper = styled.span<{
  $position: "left" | "right" | "center";
}>`
  display: inline-flex;

  ${(props) => {
    switch (props.$position) {
      case "left":
        return css`
          margin-right: 8px;
        `;
      case "right":
        return css`
          margin-left: 8px;
        `;
      case "center":
        return css`
          margin: 0;
        `;
    }
  }}
`;
