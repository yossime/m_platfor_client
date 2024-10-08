import styled from 'styled-components';
import { BaseProjectBox } from '../BaseProjectBoxStyles';

export const ProjectBoxContainer = styled(BaseProjectBox)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

export const ProjectImageContainer = styled.div`
  width: 144px;
  height: 144px;
`;

export const ProjectImage = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

export const ProjectTitle = styled.div`
  padding: 16px 0;
  width: 100%; 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1; 
`;

export const DeleteIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 1;
`;