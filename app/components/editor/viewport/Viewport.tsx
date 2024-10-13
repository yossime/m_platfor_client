"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, ThreeEvent, useThree, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Stars } from '@react-three/drei';

import styled from "styled-components";
import { CameraControls } from "../camera/Camera";
import SceneComponent from "./SceneComponent";
import { useEnvironmentContext } from "@/context/EnvironmentContext";
import * as THREE from "three";

export const ViewportContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
  background-color: #717074;
`;

const EnvironmentLoader: React.FC = () => {
  const { currentEnvironment, setCurrentEnvironment, textures } = useEnvironmentContext();
  const { gl } = useThree();
  const [processedEnvMap, setProcessedEnvMap] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    if (textures.length > 0 && !currentEnvironment) {
      setCurrentEnvironment(textures[0]);
    }
  }, [textures, currentEnvironment, setCurrentEnvironment]);

  useEffect(() => {
    console.log(currentEnvironment)
    if (currentEnvironment) {
      const pmremGenerator = new THREE.PMREMGenerator(gl);
      pmremGenerator.compileEquirectangularShader();
      const envMap = pmremGenerator.fromEquirectangular(currentEnvironment).texture;
      setProcessedEnvMap(envMap);

      return () => {
        envMap.dispose();
        pmremGenerator.dispose();
      };
    }
  }, [currentEnvironment, gl]);

  return processedEnvMap ? (
    <Environment map={processedEnvMap} background backgroundBlurriness={0.3} />

  ) : null;
};



const Viewport: React.FC = () => {


  return (
    <ViewportContainer className="viewport">
      <Canvas shadows>
        {/* <EnvironmentLoader />  */}
        {/* <CameraControls/> */}
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
        {/* <OrbitControls minDistance={5} maxDistance={90} /> */}
      </Canvas>
    </ViewportContainer>
  );
};

export default Viewport;




