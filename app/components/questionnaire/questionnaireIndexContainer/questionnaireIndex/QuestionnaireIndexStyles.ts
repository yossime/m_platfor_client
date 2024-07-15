import styled from 'styled-components';

export const IndexWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  padding: 80px;
`;

export const StageWrapper = styled.div`
  width: 273px;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
`;

export const StageFrame = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: ${props => props.isActive ? '#594ded' : '#919191'};
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
`;

export const Connector = styled.div`
  height: 19px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 9px;
  box-sizing: border-box;
`;

export const ConnectorLine = styled.div`
  align-self: stretch;
  width: 1px;
  background-color: #919191;
`;