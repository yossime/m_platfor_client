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
import { CommandManager } from './commands/CommandManager';
import OutlineEffect from './OutlineEffect';
import { Controls } from '../camera/Camera';
import { useSelectedObject } from '../context/Selected.context';
import { OrbitControls } from '@react-three/drei';



const SceneComponent = () => {
  const { sceneModel, setSceneModel } = useEditor();
  const { currentProject } = useProject();
  const { raycaster, camera, mouse } = useThree();

  const commandManager = CommandManager.getInstance();
  const [model, setModel] = useState<Object3D | undefined>(undefined);
  const [selectedModels, setSelectedModels] = useState<THREE.Object3D[]>([]);
  const [selectedModel, setSelectedModel] = useState<THREE.Object3D>();

  const { selectedObject, setSelectedObject } = useSelectedObject();

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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === 'z') {
          commandManager.undo();
        } else if (event.key === 'y') {
          commandManager.redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const buildScene = async () => {
      const scene = new SceneService();
      // const res = await fetchProject(currentProject?.id || '', '');
      // if (res.data.dataParameters) {
        // const parsedData = res.data.dataParameters;
        // const parsedData = JSON.parse(res.data);
      //   await scene.buildScene(ArchitectureType.TWO_CIRCLES, setModel, parsedData);
      // }
      // else {
        await scene.buildScene(ArchitectureType.TWO_CIRCLES, setModel);
      // }

      setSceneModel(scene);
    }
    buildScene();

  }, []);
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(model!, true);
    
    if (intersects.length > 0) {
      const clickedModel = intersects[0].object as CustomObject3D;
      // console.log('Clicked on:', clickedModel.name);
      setSelectedModels([clickedModel]);

      if (clickedModel.interactive) {
        setSelectedModel(clickedModel)
        if (clickedModel.onPointerDown) {
          // clickedObject.onPointerDown(event);
          const selectedObject = clickedModel.onPointerDown(event);
          setSelectedObject(selectedObject);

        }
      }
    } else {
      setSelectedModels([]);
    }
  };




  const AnimatedLights = () => {
    useFrame(({ clock }) => {
      const t = clock.getElapsedTime();
      const x = Math.sin(t * 0.5) * 3;
      const z = Math.cos(t * 0.5) * 3;
      light.current.position.set(x, 3, z);
    });
    const light = React.useRef<THREE.PointLight>(null!);
    return <pointLight ref={light} color="#4400ff" intensity={1.5} distance={10} />;
  };




  return (
    <group>
      {/* <AnimatedLights /> */}
      <Suspense fallback={<span>Loading...</span>}>
        {model && <primitive object={model} onClick={handleClick} />}
      </Suspense>
      {/* <OrbitControls
      // ref={controlsRef}
      enablePan={true}
      enableRotate={true}
      enableZoom={true}
      // minDistance={5}
      // maxDistance={100}
      // onChange={() => setIsTransitioning(false)}
    /> */}
      <Controls selectedModel={selectedModel as THREE.Object3D} />
      <OutlineEffect selectedModels={selectedModels} />
    </group>
  );
};
export default SceneComponent
