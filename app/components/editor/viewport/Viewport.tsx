"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, ThreeEvent, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import { useEditor } from '@/context/useEditorContext';
import styled from 'styled-components';
// import { SceneModel } from '../interface/Scene';
// import { ArchitectureType, CustomObject3D } from '../interface/models';
import { CustomObject3D } from '../types';
import { ArchitectureType } from "../types";
import { Object3D, Vector3 } from 'three';
import * as THREE from 'three';
import { SceneService } from './SceneService';
import { fetchProject } from '@/services/projectService';
import { useProject } from '@/context/useProjectContext';
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