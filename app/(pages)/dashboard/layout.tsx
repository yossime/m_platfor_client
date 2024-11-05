import DashboardSideBar from '@/components/dashboard/DashboardSideBar';
import ProtectedRoute from '@/utils/ProtectedRoute';
import React from 'react';
import StyledChild from './StyledChild';
import { MenuProvider } from '@/context/MenuContext ';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (

        <ProtectedRoute>
        <StyledChild>
          <MenuProvider>
        <DashboardSideBar />
        {children}
        </MenuProvider>
          </StyledChild>
          </ProtectedRoute>
  );
};


export default Layout;
