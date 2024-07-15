// CommonStyles.ts
import styled from 'styled-components';

export const Container = styled.div`
  width: 95%;
  height: 95%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  /* background-color: plum; */


`;

export const ContentWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 56px 0;
`;

export const TextContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  margin-top: 32px;
  padding: 0 0 40px;

`;