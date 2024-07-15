"use client"
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { FBXLoader } from 'three-stdlib';
import { Group, Mesh } from 'three';
import { useLoader } from '@react-three/fiber';
import { useEditor } from '@context/useEditorContext';
import { LaoderChildren } from './LaoderChildren';

interface LoadModelProps {
  type: 'GLB' | 'FBX';
  url: string;
  position: [number, number, number];
}

// const LoadModel: React.FC<LoadModelProps> = ({ type, url, position }) => {
//   const { setCurrentMesh } = useEditor();
  
//   const onclicked = (mesh: Mesh) => {
//     console.log('clicked', mesh);
//     setCurrentMesh(mesh);
//   }

//   let object: Group | undefined;

//   // Load the model based on the type
//   if (type === 'GLB') {
//     const { scene } = useGLTF(url);
//     object = scene;
//   } else if (type === 'FBX') {
//     object = useLoader(FBXLoader, url);
//   }

//   // If no object is loaded, return null
//   if (!object) return null;

//   return <group position={position}>{LaoderChildren(object, onclicked)}</group>;
// };
const LoadModel: React.FC<LoadModelProps> = ({ type, url, position }) => {
  const { setCurrentMesh } = useEditor();
  const gltfResult = useGLTF(url);
  const fbxResult = useLoader(FBXLoader, url);
  
  const onclicked = (mesh: Mesh) => {
    console.log('clicked', mesh);
    setCurrentMesh(mesh);
  }

  let object: Group | undefined;
  if (type === 'GLB') {
    object = gltfResult.scene;
  } else if (type === 'FBX') {
    object = fbxResult;
  }

  if (!object) return null;

  return <group position={position}>{LaoderChildren(object, onclicked)}</group>;
};

export default LoadModel;