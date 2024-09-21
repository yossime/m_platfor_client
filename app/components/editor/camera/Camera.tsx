import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3, Euler } from 'three';
import { OrbitControls } from '@react-three/drei';
import { useCamera } from '@/context/CameraContext';

export const CameraControls: React.FC = () => {
  const { camera } = useThree();
  const controls = useRef<any>(null);
  
  const { cameraPosition, setCameraPosition, cameraRotation, setCameraRotation, cameraDirection, setCameraDirection } = useCamera();

  const handleControlsChange = useCallback(() => {
    if (!camera) return;

    setCameraPosition(camera.position.clone());

    // setCameraRotation(camera.rotation.clone());

    const target = new Vector3();
    camera.getWorldDirection(target);
    setCameraDirection(target.clone());
  }, [camera, setCameraPosition, setCameraRotation, setCameraDirection]);

  useEffect(() => {
    const currentControls = controls.current;
    if (currentControls) {
      currentControls.addEventListener('change', handleControlsChange);
    }

    return () => {
      if (currentControls) {
        currentControls.removeEventListener('change', handleControlsChange);
      }
    };
  }, [handleControlsChange]);

  useEffect(() => {
    if (cameraPosition) {
      camera.position.copy(cameraPosition); 
    }
    // if (cameraRotation) {
    //   camera.rotation.copy(cameraRotation); 
    // }
    if (cameraDirection) {
      camera.lookAt(cameraDirection); 
    }
  }, [cameraPosition, cameraRotation, cameraDirection, camera]);

  return (
    <OrbitControls
      enablePan={true}
      enableRotate={true}
      ref={controls}
    />
  );
};
