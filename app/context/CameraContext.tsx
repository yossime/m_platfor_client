import { createContext, useState, useContext, ReactNode } from 'react';
import { Camera, Vector3 } from 'three';

interface CameraContextProps {
  cameraPosition: Vector3;
  setCameraPosition: React.Dispatch<React.SetStateAction<Vector3>>;
  cameraDirection: Vector3;
  setCameraDirection: React.Dispatch<React.SetStateAction<Vector3>>;
}

const CameraContext = createContext<CameraContextProps | undefined>(undefined);

export const CameraProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cameraPosition, setCameraPosition] = useState<Vector3>(new Vector3(50, 50, 50));
  const [cameraDirection, setCameraDirection] = useState<Vector3>(new Vector3(0, 0, 0));

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