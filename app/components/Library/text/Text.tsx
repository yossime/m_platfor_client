import { TextColor } from '@constants/colors';
import { createTextStyle, FontFamily, FontWeight, TextSize, TextStyleProps } from '@constants/text';
import React from 'react';

interface TextComponentProps extends TextStyleProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Text: React.FC<TextComponentProps> = ({
  size = TextSize.TEXT2,
  family = FontFamily.Figtree,
  weight = FontWeight.NORMAL,
  color = TextColor.PRIMARY_TEXT,
  cursorStyle = 'default',
  children,
  className,
  onClick
}) => {
  const getFunt = () => {
    if (size == TextSize.TEXT2 || TextSize.TEXT2) return FontFamily.Figtree
    else return FontFamily.Poppins
  }
  family = getFunt()
  const style = createTextStyle({ size, family, weight, color, cursorStyle });

  return (
    <span
      style={style}
      className={className}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default Text;

{/* <Text 
size={TextSize.TEXT1} 
family={FontFamily.Figtree} 
weight={FontWeight.NORMAL} 
color={TextColor.SECONDARY_TEXT}
>
</Text> */}