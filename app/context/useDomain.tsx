"use client"
import React, { createContext, useState, ReactNode, useContext } from 'react';

export enum DomainStatus {
  Domain1 = 'Domain1',
  Domain2 = 'Domain2',
  Domain3 = 'Domain3',
  Domain4 = 'Domain4',
}


export interface DomainContextType {
  currentIndex: DomainStatus | null;
  setIndex: (index: DomainStatus | null) => void;
}

export const DomainContext = createContext<DomainContextType | null>(null);

export const DomainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentIndex, setIndex] = useState<DomainStatus | null>(DomainStatus.Domain1);


  const value = {
    currentIndex,
    setIndex,
  };

  return (
    <DomainContext.Provider value={value}>
      {children}
    </DomainContext.Provider>
  );
};


export const useDomainIndex = () => {
  return useContext(DomainContext) as DomainContextType;
};
