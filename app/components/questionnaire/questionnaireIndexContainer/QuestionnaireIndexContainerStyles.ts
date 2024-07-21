import styled from 'styled-components';

export const IndexContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

export const IndexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  max-width: 1200px;
`;

export const StageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const StageIndicator = styled.div<{ status: 'completed' | 'current' | 'upcoming' }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => {
    switch (props.status) {
      case 'completed': return '#594ded';
      case 'current': return 'white';
      default: return 'transparent';
    }
  }};
  border: 1px solid ${props => {
    switch (props.status) {
      case 'completed': return 'transparent';
      case 'current': return '#594ded';
      default: return '#C5C7D0';
    }
  }};
`;

export const InnerCircle = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #594ded;
  color: white;
`;

export const Connector = styled.div`
  width: 20px;
  height: 1px;
  background-color:gray ;
`;