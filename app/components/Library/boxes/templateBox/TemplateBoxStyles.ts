import styled from 'styled-components';
import { BaseBox } from '../BaseBoxStyles';

export const TemplateContainer = styled(BaseBox)`
  width: 184px;
  height: 236px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

export const TemplateImageContainer = styled.div`
  width: 184px;
  height: 184px;
`;

export const TemplateImage = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

export const TemplateTitle = styled.div`
  padding: 16px 0;
  width: 100%; 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1; 
`;



