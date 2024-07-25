import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Mesh } from 'three';

interface EditorContextType {
  currentMesh: Mesh | null;
  setCurrentMesh: (mesh: Mesh | null) => void;
  cameraPosition: [number, number, number];
  setCameraPosition: (position: [number, number, number]) => void;
  cameraDirection: [number, number, number];
  setCameraDirection: (direction: [number, number, number]) => void;
  activeBoardIndex: number;
  setActiveBoardIndex: (index: number) => void;  
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentMesh, setCurrentMesh] = useState<Mesh | null>(null);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 5, 0]);
  const [cameraDirection, setCameraDirection] = useState<[number, number, number]>([0, 0, 0]);
  const [activeBoardIndex, setActiveBoardIndex]= useState<number>(-1);


  const value: EditorContextType = { 
    activeBoardIndex,
    setActiveBoardIndex,
    currentMesh, 
    setCurrentMesh, 
    cameraPosition, 
    setCameraPosition, 
    cameraDirection, 
    setCameraDirection 
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
