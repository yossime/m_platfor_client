"use client"
import React, { createContext, useState, ReactNode, useContext } from 'react';

export enum QuestionnaireStatus {
  WebsiteType = 'WebsiteType',
  QuestionnaireBusinessName = 'QuestionnaireBusinessName',
  QuestionnaireBoards = 'QuestionnaireBoards',
  QuestionnaireTemplates = 'QuestionnaireTemplates',
}

export interface ContextDataType {
  Type: {
    value: any; 
    valid: any; 
  };
  Boards: {
    value: any[]; 
    valid: any; 
  };
  Templates: {
    value: any;
    valid: any; 
  };
  Name: {
    value: string;
    valid: any; 
  };
}

export interface QuestionnaireContextType {
  currentIndex: QuestionnaireStatus | null;
  setIndex: (index: QuestionnaireStatus | null) => void;
  contextData: ContextDataType;
  setContextData: (data: Partial<ContextDataType>) => void;
}

export const QuestionnaireContext = createContext<QuestionnaireContextType | null>(null);

export const QuestionnaireProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentIndex, setIndex] = useState<QuestionnaireStatus | null>(QuestionnaireStatus.WebsiteType);
  const [contextData, setContextDataState] = useState<ContextDataType>({
    Type: {
      value: null,
      valid: null,
    },
    Boards: {
      value: [],
      valid: null,
    },
    Templates: {
      value: null,
      valid: null,
    },
    Name: {
      value: "",
      valid: null,
    },
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
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};


export const useQuestionnaireIndex = () => {
  return useContext(QuestionnaireContext) as QuestionnaireContextType;
};
