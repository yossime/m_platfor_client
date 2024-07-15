import React from 'react';
import Text from '@components/Library/text/Text'
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode, getButtonColors } from '@constants/buttton';
import { TextSize, TextColor } from '@constants/text';
import { StyledButton, IconWrapper } from './ButtonStyles';
import Icon from '@/components/Library/icon/Icon';
import { IconName, IconSize, IconColor } from '@constants/icon';

type IconNameType = keyof typeof IconName;
type IconSizeType = keyof typeof IconSize;
type IconColorType = keyof typeof IconColor;

export interface ButtonProps {
  type: ButtonType;
  variant: ButtonVariant;
  size: ButtonSize;
  mode?: ButtonMode;
  text?: string;
  icon?: IconNameType;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type,
  variant,
  size,
  mode = ButtonMode.NORMAL,
  text,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
}) => {
  const { text: textColor } = getButtonColors(type, variant, mode);

  const iconSize: IconSizeType = size === ButtonSize.LARGE || size === ButtonSize.MEDIUM ? 'MEDIUM' : 'SMALL';

  const getTextSize = (buttonSize: ButtonSize): keyof typeof TextSize => {
    switch (buttonSize) {
      case ButtonSize.LARGE:
      case ButtonSize.MEDIUM:
        return 'TEXT1';
      case ButtonSize.SMALL:
      case ButtonSize.XS:
        return 'TEXT2';
      default:
        return 'TEXT1';
    }
  };

  const getTextColorKey = (color: string): keyof typeof TextColor => {
    return Object.keys(TextColor).find(key => TextColor[key as keyof typeof TextColor] === color) as keyof typeof TextColor || 'primary_text';
  };

  return (
    <StyledButton
      buttonType={type}
      variant={variant}
      size={size}
      mode={mode}
      fullWidth={fullWidth}
      onClick={mode !== ButtonMode.DISABLED ? onClick : undefined}
    >
      {icon && iconPosition === 'left' && (
        <IconWrapper position="left">
          <Icon name={icon} size={iconSize} color={textColor as IconColorType} />
        </IconWrapper>
      )}
      {text && (
        <Text
          size={getTextSize(size)}
          weight="NORMAL"
          color={getTextColorKey(textColor)}
        >
          {text}
        </Text>
      )}
      {icon && iconPosition === 'right' && (
        <IconWrapper position="right">
          <Icon name={icon} size={iconSize} color={textColor as IconColorType} />
        </IconWrapper>
      )}
    </StyledButton>
  );
};

export default Button;