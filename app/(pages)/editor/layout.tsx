"use client"
import ProtectedRoute from '@/utils/ProtectedRoute';
import React from 'react';
import styled from 'styled-components';


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
  position: relative;
  height: 100vh;
  padding-top: 55px;
  display: flex;
  overflow: hidden;
`;



export default EditorLayout;
