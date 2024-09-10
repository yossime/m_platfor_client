"use client"
import ProtectedRoute from '@/components/ProtectedRoute';
import { NAVBAR_HEIGHTS } from '@constants/screenSizes';
import React from 'react';
import styled from 'styled-components';


const UserLayout = ({ children }: { children: React.ReactNode }) => {
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
  height: 100vh;
  padding-top: ${NAVBAR_HEIGHTS.LAPTOP}px; 
  overflow-y: auto;
  position: relative;
  display: flex;
  justify-content: center;
`;



export default UserLayout;
