import styled, { css } from 'styled-components';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode, ButtonSizeConfig, getButtonColors } from '@constants/button';

interface StyledButtonProps {
  buttonType: ButtonType;
  variant: ButtonVariant;
  size: ButtonSize;
  mode: ButtonMode;
  fullWidth: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: ${props => props.mode === ButtonMode.DISABLED ? 'not-allowed' : 'pointer'};
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  ${props => {
    const { height, padding } = ButtonSizeConfig[props.size];
    const { background, text, border } = getButtonColors(props.buttonType, props.variant, props.mode);
    
    return css`
      height: ${height}px;
      padding: ${padding};
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