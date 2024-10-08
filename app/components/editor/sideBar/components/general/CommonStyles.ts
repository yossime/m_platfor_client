import { Trash2 } from 'lucide-react';
import styled from 'styled-components';




export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 32px;
  overflow: visible;
`;

export const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 100%;
  gap: 8px;
  overflow: visible;
`;


export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #e5e7eb;
`;
export const Divider2 = styled.div`
  width: 100%;
  height: 2px;
  background-color: #e5e7eb;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: start;
  margin-top: 8px;
`;

export const SubButton = styled.button`
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


export const FileDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const FileName = styled.span`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

export const DeleteIcon = styled(Trash2)`
  cursor: pointer;
  color: red;
`;
