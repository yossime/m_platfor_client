"use client"
import DashboardSideBar from '@/components/dashboard/DashboardSideBar';
import ProtectedRoute from '@/utils/ProtectedRoute';
import React from 'react';
import StyledChild from './StyledChild';
import { MenuProvider } from '@/context/MenuContext ';
const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>

        <StyledChild>
        <ProtectedRoute>
          <MenuProvider>
        <DashboardSideBar />
        {children}
        </MenuProvider>
          </ProtectedRoute>
          </StyledChild>
    </>
  );
};


export default EditorLayout;
