"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, ThreeEvent, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import { useEditor } from '@/context/useEditorContext';
import styled from 'styled-components';
// import { SceneModel } from '../interface/Scene';
// import { ArchitectureType, CustomObject3D } from '../interface/models';
import { ArchitectureType, CustomObject3D } from '../interface/types';
import { Object3D, Vector3 } from 'three';
import * as THREE from 'three';
import { SceneService } from './SceneService';

export const ViewportContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
  background: linear-gradient(to bottom, #1e1e2e, #2a2a3a);
`;

const SceneComponent = () => {
  const { sceneModel, setSceneModel } = useEditor();
  const [model, setModel] = useState<Object3D | null>(null);

  useEffect(() => {
    const buildScene = async () => {
      // const scene = new SceneModel(setModel);
      // const sceneModel = await scene.buildingFromScratch(ArchitectureType.TOW_CIRCLES);
      // setSceneModel(scene);
      const scene = new SceneService();
      const sceneModel = await scene.buildScene(ArchitectureType.TWO_CIRCLES, setModel)
      setSceneModel(scene);

      // console.log(sceneModel.addChild,"ggggggggggggggggggggg")
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

const Viewport = () => {
  return (
    <ViewportContainer>
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <Canvas style={{ height: '100%', width: '100%' }}
          camera={{ fov: 75, near: 0.1, far: 1000, position: [5, 8, 5] }} //yossi - Adjusted initial camera position
        >
          <OrbitControls enableDamping dampingFactor={0.05} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <SceneComponent />
          <Environment preset="sunset" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        </Canvas>
      </div>
    </ViewportContainer>
  );
};

export default Viewport;