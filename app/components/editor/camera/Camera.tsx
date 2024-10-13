import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useCamera } from '@/context/CameraContext';
import { Euler, Vector3 } from "three";
import * as THREE from "three";


interface CameraControlsProps {
  selectedModel: THREE.Object3D | null;
}

// export const CameraControls: React.FC = () => {
export const CameraControls: React.FC<CameraControlsProps> = ({ selectedModel }) => {
  const { camera } = useThree();
  // const { cameraDirection, cameraPosition } = useCamera();

  // useEffect(() => {
  //   if (camera) {
  //     camera.updateMatrixWorld();

  //     const direction = new Vector3();
  //     camera.getWorldDirection(direction);
  //     camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
  //   }
  // }, [camera, cameraPosition, cameraDirection]);

  useEffect(() => {
    if (camera) {
      // camera.updateMatrixWorld();

      const direction = new Vector3();
      // camera.getWorldDirection(direction);
      camera.position.set(20,20,2);
    }
  }, [camera]);

   useEffect(() => {
    if (camera && selectedModel) {
      // const targetPosition = selectedObject?.position;
      // camera.position.lerp(new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z + 5), 0.05);
      // camera.lookAt(targetPosition);
      moveCameraToObject(5)
    }
  }, [selectedModel]);

  // useFrame(() => {
  //   if (camera && selectedObject) {
  //     const targetPosition = selectedObject?.position;
  //     camera.position.lerp(new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z + 5), 0.05);
  //     camera.lookAt(targetPosition);
  //   }
  // });

      function moveCameraToObject(index: number): void {
      const target = selectedModel; // בחירת האובייקט לפי אינדקס
      console.log(target?.name)
      if(!target) {
        console.warn("MoveCameraToObject")
        return;
      }
      const targetPosition = new Vector3();

      target.getWorldPosition(targetPosition)

      // פונקציה לאנימציית תנועת המצלמה
      const duration = 1000; // משך הזמן לאנימציה במילישניות
      const startPosition = camera.position.clone();
      const startTime = performance.now();

      function animateCamera(): void {
        // console.log(camera.position)
        const currentTime = performance.now();
        const elapsedTime = currentTime - startTime;
        const t = Math.min(elapsedTime / duration, 1); // חישוב יחס הזמן (מ-0 עד 1)
        // camera.position.copy(targetPosition)

        // תנועת המצלמה בצורה לינארית
        camera.position.lerpVectors(startPosition, new THREE.Vector3(targetPosition.x +10, targetPosition.y + 10, targetPosition.z + 10), t);
        if(!target) {
          console.warn("camera.lookAt(target.position);")
          return;
        }
        // camera.lookAt(targetPosition);

        if (t < 1) {
          requestAnimationFrame(animateCamera); // ממשיך את האנימציה
        }
      }
      requestAnimationFrame(animateCamera);
    }

    useEffect(() => {
      console.log("camap", camera.position)
    },[camera.position])

  return (
    <OrbitControls 
      // target={[cameraDirection.x, cameraDirection.y, cameraDirection.z]} 
      enablePan={true} 
      enableRotate={true} 
      minDistance={5} 
      // maxDistance={500} 
    />
  );
};


// const CameraController: React.FC<{ currentIndex: number; objects: THREE.Vector3[] }> = ({ currentIndex, objects }) => {
//   const cameraRef = useRef<THREE.PerspectiveCamera>(null);

//   useFrame(() => {
//     if (cameraRef.current) {
//       const targetPosition = objects[currentIndex];
//       const camera = cameraRef.current;
//       camera.position.lerp(new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z + 5), 0.05);
//       camera.lookAt(targetPosition);
//     }
//   });

//   return <perspectiveCamera ref={cameraRef} position={[10, 10, 10]} />;
// };