import styled from 'styled-components';

export const Container = styled.div`
width: 100%;
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
  justify-content: flex-start;
  width: 100%;
  text-align: start;
  gap: 8px;
`;


export const WaitContainer = styled.div`
background-color: aliceblue;

  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  text-align: center;
  gap: 8px;
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