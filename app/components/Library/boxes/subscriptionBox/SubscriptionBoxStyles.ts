import styled from "styled-components";

export const SubscriptionBoxContainer = styled.div`
  background-color: white;
  max-width: 320px;
  min-width: 168px;
  height: 700px;
  gap: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 8px 0px #00000033;
  box-sizing: border-box; 
  flex-grow: 1;
  flex-basis: 0;
`;




export const SubscriptionTitle = styled.div`
  padding: 16px 0;
  gap:8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const SubscriptionPrice = styled.div`

`;

export const TopContainer = styled.div`
  min-height: 240px;
`;

export const PriceContainer = styled.div`
  padding: 16px 0;
  gap:4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;


export const Includes = styled.div`
  padding: 16px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap:32px;
  padding: 24px 16px;
`;
