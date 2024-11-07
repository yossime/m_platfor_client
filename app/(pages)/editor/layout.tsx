import ProtectedRoute from '@/utils/ProtectedRoute';
import React from 'react';


const NewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
  

        <ProtectedRoute>
          {children}
          </ProtectedRoute>
  );
};




export default NewLayout;
