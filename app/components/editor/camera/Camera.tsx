import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { OrbitControls } from '@react-three/drei';
import { useCamera } from '@/context/CameraContext';

export const CameraControls: React.FC = () => {
  const { camera } = useThree();
  const controls = useRef<any>(null);
  const target = useMemo(() => new Vector3(), []);
  
  const { cameraPosition, setCameraPosition, cameraDirection, setCameraDirection } = useCamera();

  const handleControlsChange = useCallback(() => {
    if (!camera) return;
    setCameraPosition([camera.position.x, camera.position.y, camera.position.z]);
    camera.getWorldDirection(target);
    setCameraDirection([target.x, target.y, target.z]);
  }, [camera, setCameraPosition, setCameraDirection, target]);

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

  return (
    <OrbitControls
      enablePan={true}
      enableRotate={true}
      ref={controls}
    />
  );
};
