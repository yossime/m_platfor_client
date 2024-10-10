"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, ThreeEvent, useThree, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Stars } from '@react-three/drei';

import styled from 'styled-components';
import { CameraControls } from '../camera/Camera';
import SceneComponent from './SceneComponent';

export const ViewportContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
  background-color: #717074;
`;


const Viewport: React.FC = () => {

  return (
    <ViewportContainer className="viewport">
      {/* <Canvas
      >
        <CameraControls />
        <SceneComponent />
        <Environment preset="sunset" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      </Canvas> */}

      <Canvas shadows camera={{ position: [0, 0, 0], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight
          intensity={2}
          position={[1, 1, 1]}
          castShadow
          // shadow-mapSize-width={1024}
          // shadow-mapSize-height={1024}
          // shadow-camera-far={1000}
          // shadow-camera-left={-10}
          // shadow-camera-right={10}
          // shadow-camera-top={10}
          // shadow-camera-bottom={-10}
        />
        <SceneComponent />
        {/* <OutlineEffect {...props} selectedObjects={selectedObjects} /> */}
        <OrbitControls minDistance={5} maxDistance={90} />
      </Canvas>
    </ViewportContainer>
  );
};

export default Viewport;