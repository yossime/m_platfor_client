import styled, { css } from 'styled-components';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode, ButtonSizeConfig, getButtonColors, getButtonColorsHover } from '@constants/button';

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
  /* justify-content: ${props => props.$iconOnly ? 'center' : 'flex-start'}; */
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
      padding: ${props.$iconOnly ? '0' : padding};
      width: ${props.$iconOnly ? height : 'auto'}; // Make width equal to height for icon-only buttons
      font-size: ${fontSize};
      background-color: ${background};
      color: ${text};
      border: 1px solid ${border};
    `;
  }}
`;

export const IconWrapper = styled.span<{ $position: 'left' | 'right' | 'center' }>`
  display: inline-flex;
  
  ${props => {
    switch(props.$position) {
      case 'left':
        return css`margin-right: 8px;`;
      case 'right':
        return css`margin-left: 8px;`;
      case 'center':
        return css`margin: 0;`;
    }
  }}
`;