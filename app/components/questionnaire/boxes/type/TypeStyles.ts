// import styled from 'styled-components';
// import { TextSize, FontWeight, TextFont, TextColor } from '@constants/text';

// export const TypeContainer = styled.div<{ clicked: boolean }>`
//   width: 232px;
//   height: 208px;
//   position: relative;
//   border-radius: 16px;
//   background-color: ${props => props.clicked ? '#c3c1e1' : '#fff'};
//   border: 1px solid #ccc;
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
//   padding: 32px;
//   text-align: center;
//   transition: all 0.3s ease;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//   }

//   &:active {
//     transform: translateY(0);
//     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//   }
// `;

// export const TypeContent = styled.div`
//   align-self: stretch;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
//   gap: 24px;
// `;

// export const IconWrapper = styled.div`
//   width: 72px;
//   height: 72px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
// `;

// export const IconBackground = styled.div`
//   width: 64px;
//   position: relative;
//   border-radius: 8px;
//   background-color: #ebebeb;
//   height: 64px;
// `;

// export const TypeTitle = styled.div`
//   align-self: stretch;
//   position: relative;
//   line-height: 24px;
//   text-transform: capitalize;
//   font-weight: 600;
//   font-size: ${TextSize.TEXT1};
//   font-family: ${TextFont.TEXT1};
//   color: ${TextColor.primary_text};
// `;

import styled from 'styled-components';
import { TextSize, FontWeight, TextFont, TextColor } from '@constants/text';

export const TypeContainer = styled.div<{ clicked: boolean }>`
  width: 232px;
  height: 208px;
  position: relative;
  border-radius: 16px;
  background-color: ${props => props.clicked ? '#c3c1e1' : '#fff'};
  border: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 32px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.clicked ? '#b3b1d1' : '#f5f5f5'};
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

export const TypeContent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
`;

export const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  ${TypeContainer}:hover & {
    transform: scale(1.1);
  }
`;

export const IconBackground = styled.div`
  width: 64px;
  position: relative;
  border-radius: 8px;
  background-color: #ebebeb;
  height: 64px;
  transition: all 0.3s ease;

  ${TypeContainer}:hover & {
    background-color: #d1d1d1;
  }
`;

export const TypeTitle = styled.div`
  align-self: stretch;
  position: relative;
  line-height: 24px;
  text-transform: capitalize;
  font-weight: 600;
  font-size: ${TextSize.TEXT1};
  font-family: ${TextFont.TEXT1};
  color: ${TextColor.primary_text};
  transition: all 0.3s ease;

  ${TypeContainer}:hover & {
    color: ${TextColor.secondary_text};
  }
`;