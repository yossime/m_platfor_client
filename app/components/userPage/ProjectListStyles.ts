import styled from 'styled-components';
import { SCREEN_SIZES, MEDIA_QUERIES, NAVBAR_HEIGHTS } from '@constants/screenSizes';


export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 658px;
scrollbar-width: thin;
scrollbar-color: #DEDCFF transparent;
gap: 40px;

`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  gap: 8px;
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


export const ErrorMessage = styled.div`
  margin-bottom: 20px;
`;