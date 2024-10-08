"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, ThreeEvent, useThree, useFrame } from '@react-three/fiber';
import { useEditor } from '@/context/useEditorContext';
import { CustomObject3D } from '../types';
import { ArchitectureType } from "../types";
import { Object3D, Vector3 } from 'three';
import * as THREE from 'three';
import { SceneService } from './SceneService';
import { fetchProject } from '@/services/projectService';
import { useProject } from '@/context/useProjectContext';
import { EventManager } from './utils/EventManager';



const SceneComponent = () => {
    const { sceneModel, setSceneModel } = useEditor();
    const { currentProject } = useProject();
    const eventManager = EventManager.getInstance();
  
    const [model, setModel] = useState<Object3D | undefined>(undefined);
  
    // useEffect(() => {
    //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    //       const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
    //       event.returnValue = confirmationMessage; 
    //       return confirmationMessage;
    //   };
  
    //   window.addEventListener('beforeunload', handleBeforeUnload);
  
    //   return () => {
    //     window.removeEventListener('beforeunload', handleBeforeUnload);
    //   };
    // }, []);
  
    useEffect(() => {
      const buildScene = async () => {
        const scene = new SceneService();
        const res = await fetchProject(currentProject || '', '');
        if (res.data.dataParameters) {
          const parsedData = res.data.dataParameters;
          // const parsedData = JSON.parse(res.data);
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
        <AnimatedLights />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <ambientLight intensity={0.3} />
        <Suspense fallback={<span>Loading...</span>}>
          {model && <primitive object={model} />}
        </Suspense>
      </group>
    );
  };
  export default SceneComponent