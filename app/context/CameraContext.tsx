import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CameraContextProps {
  cameraPosition: [number, number, number];
  setCameraPosition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  cameraDirection: [number, number, number];
  setCameraDirection: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

const CameraContext = createContext<CameraContextProps | undefined>(undefined);

export const CameraProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [cameraDirection, setCameraDirection] = useState<[number, number, number]>([0, 0, 1]);

  return (
    <CameraContext.Provider value={{ cameraPosition, setCameraPosition, cameraDirection, setCameraDirection }}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCamera = (): CameraContextProps => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCamera must be used within a CameraProvider");
  }
  return context;
};
