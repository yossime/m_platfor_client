import styled, { css } from 'styled-components';
import { BackgroundColor, BorderColor, SemanticColors, TextColor } from '@constants/colors'; 

export const BaseBox = styled.div<{ $clicked: boolean; $disabled: boolean }>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  background-color: ${BackgroundColor.PRIMARY_BACKGROUND};
  border: 1px solid ${BorderColor.UI_BORDER};
  /* color: ${TextColor.SECONDARY_TEXT}; */

  &:hover:not(:disabled) {
    ${props => !props.$clicked && css`
      background-color: ${BackgroundColor.PRIMARY_BACKGROUND_HOVER};
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    `}
  }

  &:active:not(:disabled) {
    background-color: ${SemanticColors.PRIMARY_SELECTED};
    border: 1px solid ${SemanticColors.PRIMARY};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  }

  ${props => props.$clicked && !props.$disabled && css`
    background-color: ${SemanticColors.PRIMARY_SELECTED};
    border: 1px solid ${SemanticColors.PRIMARY};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  `}

  ${props => props.$disabled && css`
    background-color: ${BackgroundColor.DISABLED_BACKGROUND};
    color: ${TextColor.DISABLED_TEXT};
    cursor: not-allowed;
    pointer-events: none;
  `}
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  color: inherit;
  line-height: 24px;
  text-transform: capitalize;
`;

export const Description = styled.div`
  color: inherit;
  line-height: 24px;
`;