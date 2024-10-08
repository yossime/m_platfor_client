"use client"
import ProtectedRoute from '@/utils/ProtectedRoute';
import React from 'react';
import styled from 'styled-components';


const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>

        <ProtectedRoute>
          {children}
          </ProtectedRoute>
    </>
  );
};




export default EditorLayout;
