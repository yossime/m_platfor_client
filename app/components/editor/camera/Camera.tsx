// import React, { useEffect, useRef } from 'react';
// import { useThree, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import { Vector3 } from "three";
// import * as THREE from "three";

// interface CameraControlsProps {
//   selectedModel: THREE.Object3D | null;
// }

// export const CameraControls: React.FC<CameraControlsProps> = ({ selectedModel }) => {
//   const { camera } = useThree();
//   const controlsRef = useRef<any>(null);
//   const animationRef = useRef<number | null>(null);
//   const targetPositionRef = useRef<Vector3 | null>(null);

//   useEffect(() => {
//     if (camera) {
//       camera.position.set(20, 20, 20);
//       camera.lookAt(0, 0, 0);
//     }
//   }, [camera]);

//   useEffect(() => {
//     if (camera && selectedModel) {
//       moveCameraToObject();
//     }
//   }, [selectedModel]);

//   useEffect(() => {
//     return () => {
//       if (animationRef.current !== null) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, []);

//   function moveCameraToObject(): void {
//     if (!selectedModel || !camera || !controlsRef.current) {
//       console.warn("Unable to move camera: missing required objects");
//       return;
//     }

//     const targetPosition = new Vector3();
//     selectedModel.getWorldPosition(targetPosition);
//     targetPositionRef.current = targetPosition;

//     const duration = 1000;
//     const startPosition = camera.position.clone();
//     const startTime = performance.now();

//     // Calculate the offset position
//     const offset = new Vector3(10, 10, 10);
//     const endPosition = targetPosition.clone().add(offset);

//     function animateCamera(): void {
//       const currentTime = performance.now();
//       const elapsedTime = currentTime - startTime;
//       const t = Math.min(elapsedTime / duration, 1);

//       camera.position.lerpVectors(startPosition, endPosition, t);
      
//       // Update OrbitControls target
//       controlsRef.current.target.copy(targetPosition);

//       // Ensure the camera is looking at the target
//       camera.lookAt(targetPosition);

//       if (t < 1) {
//         animationRef.current = requestAnimationFrame(animateCamera);
//       } else {
//         // Ensure final position and orientation
//         camera.position.copy(endPosition);
//         camera.lookAt(targetPosition);
//         controlsRef.current.update();
//       }
//     }

//     if (animationRef.current !== null) {
//       cancelAnimationFrame(animationRef.current);
//     }
//     animationRef.current = requestAnimationFrame(animateCamera);
//   }

//   // Use useFrame to continuously update camera orientation
//   useFrame(() => {
//     if (targetPositionRef.current) {
//       camera.lookAt(targetPositionRef.current);
//       controlsRef.current?.update();
//     }
//   });

//   return (
//     <OrbitControls
//       ref={controlsRef}
//       enablePan={true}
//       enableRotate={true}
//       minDistance={5}
//       maxDistance={500}
//     />
//   );
// };











import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from "three";
import CameraControls from 'camera-controls';
import { OrbitControls } from '@react-three/drei';

CameraControls.install({ THREE });

interface ControlsProps {
  selectedModel: THREE.Object3D | null;
  transitionSpeed?: number;
}

export const Controls: React.FC<ControlsProps> = ({ 
  selectedModel, 
  transitionSpeed = 0.25
}) => {
  const { camera, gl } = useThree();
  const [isFocusing, setIsFocusing] = useState(false);
  const [focus, setFocus] = useState(new THREE.Vector3());
  const cameraControlsRef = useRef<CameraControls | null>(null);
  const orbitControlsRef = useRef<any>(null);

  const pos = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);

  const cameraControls = useMemo(() => {
    const cc = new CameraControls(camera, gl.domElement);
    cc.smoothTime = transitionSpeed;
    cameraControlsRef.current = cc;
    return cc;
  }, [camera, gl.domElement, transitionSpeed]);

  // useEffect(() => {
  //   if (selectedModel) {
  //     const targetPosition = new THREE.Vector3();
  //     selectedModel.getWorldPosition(targetPosition);
  //     setFocus(targetPosition);
  //     setIsFocusing(true);
  //   }
  // }, [selectedModel]);

  // useFrame((state, delta) => {
  //   if (isFocusing && cameraControlsRef.current) {
  //     pos.set(focus.x, focus.y, focus.z + 0.2);
  //     look.set(selectedModel!.rotation.x, selectedModel!.rotation.y, selectedModel!.rotation.z - 0.2);
  //     // look.set(focus.x, focus.y, focus.z - 0.2);

  //     cameraControlsRef.current.setLookAt(
  //       state.camera.position.x, state.camera.position.y, state.camera.position.z,
  //       look.x, look.y, look.z,
  //       true
  //     );
      
  //     // Check if camera is close enough to target position
  //     if (state.camera.position.distanceTo(pos) < 0.1) {
  //       setIsFocusing(false);
  //     }
      
  //     // Sync OrbitControls with CameraControls
  //     if (orbitControlsRef.current) {
  //       orbitControlsRef.current.target.copy(look);
  //     }
  //   }
    
  //   cameraControlsRef.current?.update(delta);
  // });

  return (
    <OrbitControls
      ref={orbitControlsRef}
      // enablePan={!isFocusing}
      // enableRotate={!isFocusing}
      // enableZoom={!isFocusing}
      minDistance={5}
      maxDistance={10000}
    />
  );
};
















// import * as THREE from 'three'
// import { useState, useMemo } from 'react'
// import { Canvas, useFrame, useThree } from '@react-three/fiber'
// import CameraControls from 'camera-controls'

// CameraControls.install({ THREE })

// const randomPos = (min: number = 5, max: number = -5): number => Math.random() * (max - min) + min

// interface MomentData {
//   position: [number, number, number]
//   color: string
// }

// interface ControlsProps {
//   zoom: boolean
//   focus: THREE.Vector3
//   pos?: THREE.Vector3
//   look?: THREE.Vector3
// }

// function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }: ControlsProps) {
//   const camera = useThree((state) => state.camera)
//   const gl = useThree((state) => state.gl)
//   const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement])

//   return useFrame((state, delta) => {
//     zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(0, 0, 5)
//     zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 0, 4)

//     state.camera.position.lerp(pos, 0.5)
//     state.camera.updateProjectionMatrix()

//     controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
//     return controls.update(delta)
//   })
// }

// interface CloudProps {
//   momentsData: MomentData[]
//   zoomToView: (focusRef: THREE.Vector3) => void
// }

// function Cloud({ momentsData, zoomToView }: CloudProps) {
//   const onClick = (object: THREE.Object3D) => {
//     const targetPosition = new THREE.Vector3();
//     object.getWorldPosition(targetPosition);
//     zoomToView(targetPosition)
//   }
//   return (
//     <>
//       {momentsData.map(({ position, color }, i) => (
//         <mesh key={i} position={position} onClick={(e) => onClick(e.object)}>
//           <boxGeometry args={[0.1, 0.08, 0.003]} />
//           <meshStandardMaterial color={color} />
//         </mesh>
//       ))}
//     </>
//   )
// }

// export default function App() {
//   const [zoom, setZoom] = useState<boolean>(false)
//   const [focus, setFocus] = useState<THREE.Vector3>(new THREE.Vector3())
//   const momentsArray = useMemo<MomentData[]>(() => 
//     Array.from({ length: 500 }, () => ({
//       color: 'blue',
//       position: [randomPos(), randomPos(), randomPos()] as [number, number, number]
//     })), 
//     []
//   )

//   return (
//     <Canvas linear camera={{ position: [0, 0, 5] }}>
//       <ambientLight />
//       <directionalLight position={[150, 150, 150]} intensity={0.55} />
//       <Cloud momentsData={momentsArray} zoomToView={(focusRef) => { setZoom(!zoom); setFocus(focusRef); }} />
//       <Controls zoom={zoom} focus={focus} />
//     </Canvas>
//   )
// }




