import styled from 'styled-components';
import { BaseProjectBox } from '../BaseProjectBoxStyles';

export const CreateProjectBoxContainer = styled(BaseProjectBox)`
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export const CreateProjectContainer = styled.div`
gap: 16px;
  
`

export const CreateProjectText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 15px;
`;

export const ComingSoon = styled.div`
  position: absolute;
  width: 100%;
  height: 20px;
  background-color: #584CEC;
  top: 20px;
`