import styled, { css } from 'styled-components';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode, ButtonSizeConfig, getButtonColors, getButtonColorsHover } from '@constants/button';

interface StyledButtonProps {
  $type: ButtonType;
  $variant: ButtonVariant;
  $size: ButtonSize;
  $mode: ButtonMode;
  $fullWidth: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};

  ${props => props.$mode !== 'disabled' && css`
    &:hover:not(:disabled) {
      background-color: ${getButtonColorsHover(props.$type, props.$variant, props.$mode)};
    }
  `}
  
  ${props => {
    const { height, padding, fontSize } = ButtonSizeConfig[props.$size];
    const { background, text, border } = getButtonColors(props.$type, props.$variant, props.$mode);
    
    return css`
      height: ${height};
      padding: ${padding};
      font-size: ${fontSize};
      background-color: ${background};
      color: ${text};
      border: 1px solid ${border};
    `;
  }}
`;

export const IconWrapper = styled.span<{ position: 'left' | 'right' }>`
  display: inline-flex;
  ${props => css`
    margin-${props.position === 'left' ? 'right' : 'left'}: 8px;
  `}
`;