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

export const ViewportContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
  background-color: #717074;
`;

const SceneComponent = () => {
  const { sceneModel, setSceneModel } = useEditor();
  const { currentProject } = useProject();

  const [model, setModel] = useState<Object3D | undefined>(undefined);

  useEffect(() => {
    const buildScene = async () => {
      const scene = new SceneService();
      const res = await fetchProject(currentProject || '', '');
      if(res.data) {
        const parsedData = JSON.parse(res.data.dataParameters);
        await scene.buildScene(ArchitectureType.TWO_CIRCLES, setModel, parsedData);
      }
      else {
        await scene.buildScene(ArchitectureType.TWO_CIRCLES, setModel);
      }

      setSceneModel(scene);
    }
    buildScene();

  }, []);


  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    const object = event.object as CustomObject3D;
    event.stopPropagation();
    // console.log("event.target", event.object)
    let selected = null;
    if (object.interactive) {
      if (object.onPointerDown) {
        selected = object.onPointerDown(event);
      }
    }
    // sceneModel?.setSelectedObject(selected)
  }

  const CameraController = () => {
    const { camera } = useThree();
    useEffect(() => {
      // Adjusted camera position to start higher //yossi
      camera.position.set(5, 35, 5);
      camera.lookAt(new Vector3(0, 0, 0));
    }, [camera]);
    return null;
  };

  const AnimatedLights = () => {
    useFrame(({ clock }) => {
      const t = clock.getElapsedTime();
      const x = Math.sin(t * 0.5) * 3;
      const z = Math.cos(t * 0.5) * 3;
      light.current.position.set(x, 3, z);
    });
    const light = React.useRef<THREE.PointLight>(null!);
    return <pointLight ref={light} color="#ffaa00" intensity={1.5} distance={10} />;
  };

  return (
    <group onPointerDown={handlePointerDown}>
      <CameraController />
      <AnimatedLights />
      <Suspense fallback={<span>Loading...</span>}>
        {model && <primitive object={model} />}
      </Suspense>
    </group>
  );
};

const Viewport: React.FC = () => {

  return (
    <ViewportContainer className="viewport">
        <Canvas 
        >
          <CameraControls/>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <SceneComponent />
          <Environment preset="sunset" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        </Canvas>
    </ViewportContainer>
  );
};

export default Viewport;