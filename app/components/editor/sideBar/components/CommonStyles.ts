import styled from 'styled-components';




export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px;
  gap: 32px;
  overflow: visible;
`;


export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
`;


export const BoardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BoardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: start;
  margin-top: 8px;
`;

export const BoardButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  gap: 16px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  transition: background-color 0.2s;
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 3px 3px rgba(0, 0, 0, 0.15);  


  &:hover {
    background-color: #f9fafb;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 3px 3px rgba(0, 0, 0, 0.15);  
  }
`;


