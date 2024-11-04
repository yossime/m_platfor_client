"use client"
// import { IParams } from '@/components/editor/interface/paramsType';
import { SceneService } from '@/components/editor/viewport/SceneService';
// import { SceneModel } from '@/components/editor/interface/Scene';
import React, { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from 'react';


export enum EMode {
  View,
  AddBorad,
}


export enum EditorState {
  EDITING,
  LOADING,
  PREVIEW
}

interface EditorContextType {
  cameraPosition: [number, number, number];
  setCameraPosition: (position: [number, number, number]) => void;
  cameraDirection: [number, number, number];
  setCameraDirection: (direction: [number, number, number]) => void;
  // dataParameters:  IParams | null;
  // setDataParameters: Dispatch<SetStateAction<IParams | null>>; 
  currentMode: EMode;
  setCurrentMode: (mode: EMode) => void;
  activeBoardIndex: number;
  setActiveBoardIndex: (index: number) => void;  
  sceneModel: SceneService | null;
  setSceneModel: (model: SceneService) => void;
  // sceneModel: SceneModel | null;
  // setSceneModel: (model: SceneModel) => void;
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
  walkthroughEnabled:boolean;
  setIsWalkthroughEnabled:(status:boolean)=>void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 5, 0]);
  const [cameraDirection, setCameraDirection] = useState<[number, number, number]>([0, 0, 0]);
  const [walkthroughEnabled, setIsWalkthroughEnabled] = useState(true);

  // const [dataParameters, setDataParameters] = useState<IParams | null>(null);
  const [currentMode, setCurrentMode] = useState<EMode>(EMode.View);
  const [activeBoardIndex, setActiveBoardIndex]= useState<number>(-1);
  const [sceneModel, setSceneModel] = useState<SceneService | null>(null);
  // const [sceneModel, setSceneModel] = useState<SceneModel | null>(null);
  const [editorState, setEditorState] = useState<EditorState>(EditorState.EDITING);



  const value: EditorContextType = { 
    setIsWalkthroughEnabled,
    walkthroughEnabled,
    editorState,
    setEditorState,
    activeBoardIndex,
    setActiveBoardIndex,
    cameraPosition, 
    setCameraPosition, 
    cameraDirection, 
    setCameraDirection,
    // dataParameters,
    // setDataParameters,
    currentMode, 
    setCurrentMode,
    sceneModel,
    setSceneModel,
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
