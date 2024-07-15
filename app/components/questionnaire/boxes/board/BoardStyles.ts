// BoardStyles.ts
import styled from 'styled-components';
import { TextSize, FontWeight, TextFont, TextColor } from '@constants/text';

export const BoardContainer = styled.div<{ clicked: boolean }>`
  width: 216px;
  height: 280px;
  position: relative;
  border-radius: 16px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 32px;
  text-align: center;
  font-family: 'Wix Madefor Text';
  transition: all 0.3s ease;

  ${({ clicked }) => clicked && `
    border: 5px solid #584cec;
  `}

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ContentWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
`;

export const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const Title = styled.div`
  ${TextSize.TEXT2};
  ${FontWeight.BLOB};
  ${TextFont.TEXT2};
  ${TextColor.primary_text};
  line-height: 24px;
  text-transform: capitalize;
`;

export const Description = styled.div`
  ${TextSize.TEXT1};
  ${FontWeight.NORMAL};
  ${TextFont.TEXT1};
  ${TextColor.primary_text};
  align-self: stretch;
  line-height: 24px;
`;