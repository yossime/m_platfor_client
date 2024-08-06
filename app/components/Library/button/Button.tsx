import React from 'react';
import Text from '@components/Library/text/Text'
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode, getButtonColors } from '@constants/button';
import { TextSize, FontWeight, FontFamily } from '@constants/text';
import { StyledButton, IconWrapper } from './ButtonStyles';
import Icon from '@/components/Library/icon/Icon';
import { IconName, IconSize } from '@constants/icon';
import { IconColor, TextColor } from '@constants/colors';

export interface ButtonProps {
  type: ButtonType;
  variant: ButtonVariant;
  size: ButtonSize;
  mode?: ButtonMode;
  text?: string;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  iconOnly?: boolean; // New prop
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
  iconOnly = false, // New prop with default value
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

  const getIconColor = (mode: ButtonMode, variant: ButtonVariant): IconColor => {
    switch (mode) {
      case ButtonMode.DISABLED:
        return IconColor.DISABLED;
      default:
        if (variant === ButtonVariant.PRIMARY)
          return IconColor.LIGHT;
        else
        return IconColor.ICONCOLOR;
    }
  }

  return (
    <StyledButton
      $type={type}
      $variant={variant}
      $size={size}
      $mode={mode}
      $fullWidth={fullWidth}
      $iconOnly={iconOnly} // Pass the new prop to StyledButton
      onClick={mode !== ButtonMode.DISABLED ? onClick : undefined}
      {...props}
    >
      {icon && (iconOnly || iconPosition === 'left') && (
        <IconWrapper position={iconOnly ? 'center' : 'left'}>
          <Icon name={icon} size={getIconSize(size)} color={getIconColor(mode, variant)} />
        </IconWrapper>
      )}
      {text && !iconOnly && (
        <Text
          size={getTextSize(size)}
          weight={FontWeight.NORMAL}
          color={textColor as TextColor}
          family={FontFamily.Figtree}
        >
          {text}
        </Text>
      )}
      {icon && !iconOnly && iconPosition === 'right' && (
        <IconWrapper position="right">
          <Icon name={icon} size={getIconSize(size)} color={getIconColor(mode, variant)} />
        </IconWrapper>
      )}
    </StyledButton>
  );
};

export default Button;