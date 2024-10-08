"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, ThreeEvent, useThree, useFrame } from '@react-three/fiber';
import {  Environment, Stars } from '@react-three/drei';

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
      <Canvas
      >
        <CameraControls />
        <SceneComponent />
        <Environment preset="sunset" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      </Canvas>
    </ViewportContainer>
  );
};

export default Viewport;