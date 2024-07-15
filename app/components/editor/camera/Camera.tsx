// import React, { useEffect, useRef, useCallback } from 'react';
// import { useFrame, useThree } from '@react-three/fiber';
// import { Vector3 } from 'three';
// import { OrbitControls } from '@react-three/drei';

// interface CameraControlsProps {
//   cameraPosition: [number, number, number];
//   setCameraPosition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
//   cameraDirection: [number, number, number];
//   setCameraDirection: React.Dispatch<React.SetStateAction<[number, number, number]>>;
// }

// export const CameraControls: React.FC<CameraControlsProps> = ({ cameraPosition, setCameraPosition, cameraDirection, setCameraDirection }) => {
//   const { camera } = useThree();
//   const controls = useRef<any>(null); 
//   const target = new Vector3();


//   const handleControlsChange = useCallback(() => {
//     setCameraPosition([camera.position.x, camera.position.y, camera.position.z]);
//     camera.getWorldDirection(target);
//     setCameraDirection([target.x, target.y, target.z]);
//   }, [camera, setCameraPosition, setCameraDirection, target]);

//   useEffect(() => {
//     if (controls.current) {
//       controls.current.addEventListener('change', handleControlsChange);
//     }

//     return () => {
//       if (controls.current) {
//         controls.current.removeEventListener('change', handleControlsChange);
//       }
//     };
//   }, [handleControlsChange]);

//   return <OrbitControls
//     enablePan={true}
//     enableRotate={true}
//     ref={controls}
//   />;
// };


import React, { useEffect, useRef, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { OrbitControls } from '@react-three/drei';

interface CameraControlsProps {
  cameraPosition: [number, number, number];
  setCameraPosition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  cameraDirection: [number, number, number];
  setCameraDirection: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

export const CameraControls: React.FC<CameraControlsProps> = ({
  cameraPosition,
  setCameraPosition,
  cameraDirection,
  setCameraDirection
}) => {
  const { camera } = useThree();
  const controls = useRef<any>(null);

  const handleControlsChange = useCallback(() => {
    const target = new Vector3();
    setCameraPosition([camera.position.x, camera.position.y, camera.position.z]);
    camera.getWorldDirection(target);
    setCameraDirection([target.x, target.y, target.z]);
  }, [camera, setCameraPosition, setCameraDirection]);

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