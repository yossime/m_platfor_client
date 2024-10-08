import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useCamera } from '@/context/CameraContext';
import { Euler, Vector3 } from "three";

export const CameraControls: React.FC = () => {
  const { camera } = useThree();
  const { cameraDirection, cameraPosition } = useCamera();

  useEffect(() => {
    if (camera) {
      camera.updateMatrixWorld();

      const direction = new Vector3();
      camera.getWorldDirection(direction);
      camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    }
  }, [camera, cameraPosition, cameraDirection]);

  return (
    <OrbitControls 
      target={[cameraDirection.x, cameraDirection.y, cameraDirection.z]} 
      enablePan={true} 
      enableRotate={true} 
      minDistance={5} 
      maxDistance={50} 
    />
  );
};
