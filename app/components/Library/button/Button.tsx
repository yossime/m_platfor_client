import React from 'react';
import Text from '@components/Library/text/Text'
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode, getButtonColors } from '@constants/button';
import { TextSize, TextColor, FontWeight, FontFamily } from '@constants/text';
import { StyledButton, IconWrapper } from './ButtonStyles';
import Icon from '@/components/Library/icon/Icon';
import { IconColor, IconName, IconSize } from '@constants/icon';

export interface ButtonProps {
  type: ButtonType;
  variant: ButtonVariant;
  size: ButtonSize;
  mode?: ButtonMode;
  text?: string;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
  ...props
}) => {
  const { text: textColor } = getButtonColors(type, variant, mode);

  const getIconSize = (buttonSize: ButtonSize): IconSize => {
    switch (buttonSize) {
      case ButtonSize.LARGE:
      case ButtonSize.MEDIUM:
        return IconSize.SMALL;
      case ButtonSize.SMALL:
      case ButtonSize.XS:
        return IconSize.SMALL;
      default:
        return IconSize.MEDIUM;
    }
  };

  const getTextSize = (buttonSize: ButtonSize): TextSize => {
    switch (buttonSize) {
      case ButtonSize.LARGE:
      case ButtonSize.MEDIUM:
        return TextSize.TEXT1;
      case ButtonSize.SMALL:
      case ButtonSize.XS:
        return TextSize.TEXT2;
      default:
        return TextSize.TEXT1;
    }
  };

  return (
    <StyledButton
      $type={type}
      $variant={variant}
      $size={size}
      $mode={mode}
      $fullWidth={fullWidth}
      onClick={mode !== ButtonMode.DISABLED ? onClick : undefined}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <IconWrapper position="left">
          <Icon name={icon} size={getIconSize(size)} />
        </IconWrapper>
      )}
      {text && (
        <Text
          size={getTextSize(size)}
          weight={FontWeight.NORMAL}
          color={textColor as TextColor}
          family={FontFamily.Figtree} 
        >
          {text}
        </Text>
      )}
      {icon && iconPosition === 'right' && (
        <IconWrapper position="right">
          <Icon name={icon} size={getIconSize(size)} />
        </IconWrapper>
      )}
    </StyledButton>
  );
};

export default Button;