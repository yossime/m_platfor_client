import styled from 'styled-components';
import { NAVBAR_HEIGHTS, MEDIA_QUERIES } from '@constants/screenSizes';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 658px;
  height: calc(100vh - ${NAVBAR_HEIGHTS.LAPTOP});
  gap: 24px;
  padding: 64px, 0px, 64px, 0px;
  margin: ${NAVBAR_HEIGHTS.LAPTOP} auto 0;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: #DEDCFF transparent;

`;

export const IndexContainer = styled.div`
  width: 580px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  flex-shrink: 0;

`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  gap: 16px;
  flex-shrink: 0;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
  flex-shrink: 0;
  margin-bottom: 20px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;