"use client"
import React from 'react';
import styled, { css } from 'styled-components';
import { EditorProvider } from '@context/useEditorContext'


const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>

        <StyledChild>
        <EditorProvider>
          {children}
          </EditorProvider>
          </StyledChild>
    </>
  );
};

const StyledChild = styled.div`
  ${props => css`
    height: 100vh; 
    overflow: hidden; 
  `}
`;

export default EditorLayout;
