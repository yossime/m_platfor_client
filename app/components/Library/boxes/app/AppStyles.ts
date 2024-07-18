import styled from 'styled-components';
import { TextSize, FontWeight, FontFamily, TextColor } from '@constants/text';

export const AppContainer = styled.div<{ clicked: boolean, backgroundColor: string }>`
  width: 216px;
  height: 280px;
  position: relative;
  border-radius: 16px;
  background-color: #fff;
  border: ${props => props.clicked ? '5px solid #584cec' : '1px solid #ccc'};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 32px;
  text-align: center;
  font-size: 20px;
  color: #000;
  font-family: 'Wix Madefor Text';
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.clicked ? '#f0f0ff' : '#f5f5f5'};
  }
`;

export const FrameParent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
`;

export const RectangleWrapper = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  ${AppContainer}:hover & {
    transform: scale(1.05);
  }
`;

export const ColorCube = styled.div<{ backgroundColor: string }>`
  width: 64px;
  position: relative;
  border-radius: 8px;
  background-color: ${props => props.backgroundColor};
  height: 64px;
  transition: all 0.3s ease;

  ${AppContainer}:hover & {
    transform: rotate(5deg);
  }
`;

export const ContentWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const AppTitle = styled.div`
  align-self: stretch;
  position: relative;
  line-height: 24px;
  text-transform: capitalize;
  font-weight: 600;
  font-size: ${TextSize.TEXT1};
  font-family: ${FontFamily.Figtree};
  color: ${TextColor.PRIMARY_TEXT};
  transition: all 0.3s ease;

  ${AppContainer}:hover & {
    color: ${TextColor.PRIMARY_TEXT};
  }
`;
export const Description = styled.div`
  align-self: stretch;
  position: relative;
  line-height: 24px;
  transition: all 0.3s ease;

  ${AppContainer}:hover & {
    opacity: 0.8;
  }
`;