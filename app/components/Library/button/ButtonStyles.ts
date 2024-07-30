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
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);

  ${props => props.$mode !== 'disabled' && css`
    &:hover:not(:disabled) {
      background-color: ${getButtonColorsHover(props.$type, props.$variant, props.$mode)};
      transform: translateY(-0.5px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 3px 3px rgba(0, 0, 0, 0.15);  
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