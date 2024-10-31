
"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useEnvironmentContext } from "@/context/EnvironmentContext";
import * as THREE from "three";

export const EnvironmentLoader: React.FC = () => {
  const {
    currentEnvironment,
    setCurrentEnvironment,
    environment: textures,
  } = useEnvironmentContext();
  const { gl } = useThree();
  const [processedEnvMap, setProcessedEnvMap] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (textures.length > 0 && !currentEnvironment) {
      setCurrentEnvironment(textures[0]);
    }
  }, [textures, currentEnvironment, setCurrentEnvironment]);

  useEffect(() => {
    const loadEnvironmentTexture = async () => {
      if (currentEnvironment?.texture) {
        const pmremGenerator = new THREE.PMREMGenerator(gl);
        pmremGenerator.compileEquirectangularShader();
        
        const envMap = pmremGenerator.fromEquirectangular(currentEnvironment.texture).texture;
        setProcessedEnvMap(envMap);

        pmremGenerator.dispose();
      }
    };

    loadEnvironmentTexture();

    return () => {
      processedEnvMap?.dispose();
    };
  }, [currentEnvironment, gl]);

  return (
    <Suspense fallback={null}>
      {processedEnvMap ? (
        <Environment
          backgroundIntensity={0.4}
          environmentIntensity={0.2}
          map={processedEnvMap}
          background
          backgroundBlurriness={0}
        />
      ) : null}
    </Suspense>
  );
};
