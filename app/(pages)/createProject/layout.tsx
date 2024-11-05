
import ProtectedRoute from '@/utils/ProtectedRoute';
import React from 'react';


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (

        <ProtectedRoute>
          {children}
          </ProtectedRoute>
  );
};


export default Layout;
