"use client"
import React, { createContext, useState, ReactNode, useContext } from 'react';

export enum OnboardingStatus {
  BuildFor = 'BuildFor',
  WhoUsingjob = 'WhoUsingjob',
  WhoUsing = 'WhoUsing',
}

export interface ContextDataType {
  BuildFor: {
    value: string; 
    valid: boolean; 
  };
  WhoUsingjob: {
    value: string; 
    valid: boolean; 
  };
  WhoUsing: {
    value: string; 
    valid: boolean; 
  };
}

export interface OnboardingContextType {
  currentIndex: OnboardingStatus ;
  setIndex: (index: OnboardingStatus) => void;
  contextData: ContextDataType;
  setContextData: (data: Partial<ContextDataType>) => void;
}

export const OnboardingContext = createContext<OnboardingContextType | null>(null);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentIndex, setIndex] = useState<OnboardingStatus>(OnboardingStatus.BuildFor);
  const [contextData, setContextDataState] = useState<ContextDataType>({
    BuildFor: {
      value: "", 
      valid: false,
    },
    WhoUsingjob: {
      value: "", 
      valid: false,
    },
    WhoUsing: {
      value: "", 
      valid: false,
    }
  });

  const setContextData = (data: Partial<ContextDataType>) => {
    setContextDataState(prevData => ({
      ...prevData,
      ...data,
    }));
  };

  const value = {
    currentIndex,
    setIndex,
    contextData,
    setContextData,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};


export const useOnboardingIndex = () => {
  const context = useContext(OnboardingContext);
  if (context === null) {
    throw new Error('useOnboardingIndex must be used within an OnboardingProvider');
  }
  return context;
};