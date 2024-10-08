
import { TextColor } from "@constants/colors";
import {
  FontFamily,
  FontWeight,
  TextLine,
  TextSize,
  TextStyleProps,
} from "@constants/text";
import React from "react";
import styled from "styled-components";

const StyledText = styled.span<TextStyleProps>`
  font-size: ${({ size }) => size};
  font-family: ${({ $family: family }) => {
    switch (family) {
      case FontFamily.Poppins:
        return 'var(--font-poppins)';
      case FontFamily.Figtree:
        return 'var(--font-figtree)';
      default:
        return 'var(--font-figtree)'; 
    }
  }};
  font-weight: ${({ $weight: weight }) => weight};

  color: ${({ color }) => color};
  cursor: ${({ $cursorStyle }) => $cursorStyle || "default"};
  white-space: pre-wrap;
  white-space: pre-wrap;
  line-height: ${({ size }) => {
    switch (size) {
      case TextSize.D1:
        return TextLine.D1;
      case TextSize.D2:
        return TextLine.D2;
      case TextSize.D3:
        return TextLine.D3;
      case TextSize.H1:
        return TextLine.H1;
      case TextSize.H2:
        return TextLine.H2;
      case TextSize.H3:
        return TextLine.H3;
      case TextSize.TEXT1:
        return TextLine.TEXT1;
      case TextSize.TEXT2:
        return TextLine.TEXT2;
      default:
        return TextLine.TEXT2;
    }
  }};`;

interface TextComponentProps extends TextStyleProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Text = React.forwardRef<HTMLSpanElement, TextComponentProps>(
  (
    {
      size = TextSize.TEXT2,
      $family: family = FontFamily.Figtree,
      $weight: weight = FontWeight.NORMAL,
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
        $family={family}
        $weight={weight}
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
