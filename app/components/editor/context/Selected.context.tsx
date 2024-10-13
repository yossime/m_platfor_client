import React, { createContext, useState, ReactNode, useContext } from 'react';
import { ISceneObject } from '../types';



interface SelectedObjectContextType {
  selectedObject: ISceneObject | null;
  setSelectedObject: (object: ISceneObject | null) => void;
}

const SelectedObjectContext = createContext<SelectedObjectContextType | undefined>(undefined);

export const SelectedObjectProvider = ({ children }: { children: ReactNode }) => {
  const [selectedObject, setSelectedObject] = useState<ISceneObject | null>(null);

  return (
    <SelectedObjectContext.Provider value={{ selectedObject, setSelectedObject }}>
      {children}
    </SelectedObjectContext.Provider>
  );
};

export const useSelectedObject = () => {
  const context = useContext(SelectedObjectContext);
  if (!context) {
    throw new Error('useSelectedObject must be used within a SelectedObjectProvider');
  }
  return context;
};
