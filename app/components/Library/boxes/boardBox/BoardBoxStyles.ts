import styled from 'styled-components';
import { BaseBox } from '../BaseBoxStyles';

export const BoardContainer = styled(BaseBox)`
  width: 144px;
  height: 144px;
  border-radius: 4px;
  padding: 16px, 0px, 16px, 0px;
  align-items: center; 
  justify-content: center;
  text-align: center;
`;


export const ContentWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const TextWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  gap: 8px;
`;

