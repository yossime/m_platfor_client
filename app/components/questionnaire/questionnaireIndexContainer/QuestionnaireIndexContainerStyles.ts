import styled from 'styled-components';

export const IndexContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  overflow: hidden;
`;

export const IndexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
  max-width: 1200px;
  overflow-x: auto;
  /* background-color:lime; */
`;

export const StageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StageFrame = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.isActive ? '#594ded' : '#919191'};
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
`;

export const Connector = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConnectorLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #919191;
`;