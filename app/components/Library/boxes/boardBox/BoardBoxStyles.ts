import styled from 'styled-components';
import { BaseBox } from '../BaseBoxStyles';
import { BoxSize } from './BoardBox';

interface Boxsize{
  $size:BoxSize
}

export const BoardContainer = styled(BaseBox)<Boxsize>`
  width: 144px;
  max-height: 144px;
  border-radius: 4px;
  align-items: center; 
  justify-content: center;
  text-align: center;


  ${props => {
    switch(props.$size) {
      case 'small':
        return`
          width: 144px;
        `;
      case 'medium':
        return `
          width: 184px;
        `;
      default: 
        return`
          width: 144px;
          height: 144px;
        `;
    }
  }}
`;


export const ContentWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px;

`;

export const TextWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  word-wrap: break-word;
  gap: 8px;
`;

