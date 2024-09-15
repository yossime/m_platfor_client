import { TextColor } from "@constants/colors";
import {
  FontFamily,
  FontWeight,
  TextSize,
  TextStyleProps,
} from "@constants/text";
import React from "react";



export const createTextStyle = ({
  size,
  family,
  weight,
  color,
  cursorStyle
}: TextStyleProps) => ({
  fontSize: size,
  fontFamily: family,
  fontWeight: weight,
  color: color,
  cursor: cursorStyle,
  whiteSpace: 'pre-wrap'
});

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
      cursorStyle = "default",
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
    const style = createTextStyle({ size, family, weight, color, cursorStyle });

    return (
      <span ref={ref} style={style} className={className} onClick={onClick}>
        {children}
      </span>
    );
  }
);

Text.displayName = 'Text';

export default Text;