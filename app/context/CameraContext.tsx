import { createContext, useState, useContext, ReactNode } from 'react';
import { Vector3, Euler } from 'three';

interface CameraContextProps {
  cameraPosition: Vector3;
  setCameraPosition: React.Dispatch<React.SetStateAction<Vector3>>;
  cameraRotation: Euler;
  setCameraRotation: React.Dispatch<React.SetStateAction<Euler>>;
  cameraDirection: Vector3;
  setCameraDirection: React.Dispatch<React.SetStateAction<Vector3>>;
}

const CameraContext = createContext<CameraContextProps | undefined>(undefined);

export const CameraProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cameraPosition, setCameraPosition] = useState<Vector3>(new Vector3(0, 0, 0));
  const [cameraRotation, setCameraRotation] = useState<Euler>(new Euler(0, 0, 0));
  const [cameraDirection, setCameraDirection] = useState<Vector3>(new Vector3(0, 0, 1));

  return (
    <CameraContext.Provider value={{ cameraPosition, setCameraPosition, cameraRotation, setCameraRotation, cameraDirection, setCameraDirection }}>
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
