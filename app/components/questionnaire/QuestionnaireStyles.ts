
import styled from 'styled-components';

export const QuestionnaireWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1900px;
  min-width: 600px;
  height: 100%;
  min-height: 200px;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const HorizontalLine = styled.div`
  position: absolute;
  bottom: 10%; 
  width: 100%;
  height: 0.1px;
  background-color: rgba(219, 219, 219, 1);
`;

export const VerticalLine = styled.div`
  position: absolute;
  top: 5%;
  left: 20%; 
  width: 0.1px; 
  height: 80%; 
  background-color: rgba(219, 219, 219, 1);
`;