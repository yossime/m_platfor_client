"use client"
import React from 'react';
import ProtectedRoute from '@/utils/ProtectedRoute';
import {OnboardingProvider} from '@/context/useOnboarding'


const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    

        <ProtectedRoute>
            <OnboardingProvider>
          {children}
            </OnboardingProvider>
          </ProtectedRoute>
  
  );
};


export default EditorLayout;
