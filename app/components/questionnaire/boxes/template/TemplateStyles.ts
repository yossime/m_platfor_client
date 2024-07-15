

import styled from 'styled-components';

export const TemplateContainer = styled.div`
  position: relative;
  width: 190px;
  height: 190px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
  font-size: 20px;
  color: #000;
  font-family: 'Wix Madefor Text';
`;

export const TemplateBackground = styled.div<{ backgroundImage: string; clicked: boolean }>`
  width: 190px;
  height: 168px;
  min-height: 168px;
  border-radius: 16px;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  border: ${props => props.clicked ? '5px solid #594ded' : 'none'};
  box-sizing: border-box;
`;

export const TemplateTitle = styled.div<{ clicked: boolean }>`
  position: relative;
  line-height: 24px;
  text-transform: capitalize;
  color: ${props => props.clicked ? '#594ded' : '#000'};
`;

export const TemplateTitleWrapper = styled.div`
  width: 126px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;