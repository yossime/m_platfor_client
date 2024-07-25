import { Params } from '@/components/editor/paramsType';
import React, { createContext, useState, ReactNode, useContext } from 'react';


export enum EMode {
  View,
  AddBorad,
}


interface EditorContextType {
  cameraPosition: [number, number, number];
  setCameraPosition: (position: [number, number, number]) => void;
  cameraDirection: [number, number, number];
  setCameraDirection: (direction: [number, number, number]) => void;
  dataParameters: Params;
  setDataParameters: (dataParameters: Params) => void;
  currentMode: EMode;
  setCurrentMode: (mode: EMode) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 5, 0]);
  const [cameraDirection, setCameraDirection] = useState<[number, number, number]>([0, 0, 0]);
  const [dataParameters, setDataParameters] = useState<Params>( {} as Params);
  const [currentMode, setCurrentMode] = useState<EMode>(EMode.View);


  const value: EditorContextType = { 
    cameraPosition, 
    setCameraPosition, 
    cameraDirection, 
    setCameraDirection,
    dataParameters,
    setDataParameters,
    currentMode, 
    setCurrentMode
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
