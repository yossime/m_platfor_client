"use client"
import React from 'react';
import styled, { css } from 'styled-components';
import ProtectedRoute from '@/components/ProtectedRoute';


const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>

        <StyledChild>
        <ProtectedRoute>
          {children}
          </ProtectedRoute>
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
