// ProjectListStyles.ts
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const ProjectGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
`;

export const ProjectCube = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const CreateProjectCube = styled(ProjectCube)`
  background-color: #e6f7ff;
  justify-content: center;
  
  &:hover {
    background-color: #bfe6ff;
  }
`;

export const ProjectTitle = styled.div`
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
`;

export const ProjectDetails = styled.div`
  width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  text-align: center;
`;

export const ErrorMessage = styled.div`
  margin-bottom: 20px;
`;