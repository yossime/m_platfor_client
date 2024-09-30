import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 215px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 658px;
  gap: 40px;
  margin-bottom: 80px;
`;


export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
