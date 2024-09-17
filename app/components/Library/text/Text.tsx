
import { TextColor } from "@constants/colors";
import {
  FontFamily,
  FontWeight,
  TextSize,
  TextStyleProps,
} from "@constants/text";
import React from "react";
import styled from "styled-components";

const StyledText = styled.span<TextStyleProps>`
  font-size: ${({ size }) => size};
  font-family: ${({ family }) => {
    switch (family) {
      case FontFamily.Poppins:
        return 'var(--font-poppins)';
      case FontFamily.Figtree:
        return 'var(--font-figtree)';
      default:
        return 'var(--font-figtree)'; 
    }
  }};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
  cursor: ${({ $cursorStyle }) => $cursorStyle || "default"};
  white-space: pre-wrap;
`;

interface TextComponentProps extends TextStyleProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Text = React.forwardRef<HTMLSpanElement, TextComponentProps>(
  (
    {
      size = TextSize.TEXT2,
      family = FontFamily.Figtree,
      weight = FontWeight.NORMAL,
      color = TextColor.PRIMARY_TEXT,
      $cursorStyle = "default",
      children,
      className,
      onClick,
    },
    ref
  ) => {
    const getFont = () => {
      if (size === TextSize.TEXT2 || size === TextSize.TEXT1) return FontFamily.Figtree;
      else return FontFamily.Poppins;
    };
    family = getFont();

    return (
      <StyledText
        ref={ref}
        size={size}
        family={family}
        weight={weight}
        color={color}
        $cursorStyle={$cursorStyle}
        className={className}
        onClick={onClick}
      >
        {children}
      </StyledText>
    );
  }
);

Text.displayName = 'Text';

export default Text;
