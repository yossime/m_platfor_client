"use client"
import ProtectedRoute from '@/components/ProtectedRoute';
import React from 'react';


const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProtectedRoute>
        {children}
      </ProtectedRoute>
    </>
  );
};



export default UserLayout;
