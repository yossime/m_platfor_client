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

export const StageIndicator = styled.div<{ $status: 'completed' | 'current' | 'upcoming' }>`
  width: ${props => {
    switch (props.$status) {
      case 'completed': return '24px';
      case 'current': return '88px';
      default: return '24px';
    }
  }};
  height: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => {
    switch (props.$status) {
      case 'completed': return '#D9D9D9';
      case 'current': return '#594DED';
      default: return '#D9D9D9';
    }
  }};

`;



export const Connector = styled.div`
  width: 20px;
  height: 1px;
  background-color:gray ;
`;