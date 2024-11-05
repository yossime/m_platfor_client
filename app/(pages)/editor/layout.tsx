import ProtectedRoute from '@/utils/ProtectedRoute';
import React from 'react';


const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
  

        <ProtectedRoute>
          {children}
          </ProtectedRoute>
  );
};




export default EditorLayout;
