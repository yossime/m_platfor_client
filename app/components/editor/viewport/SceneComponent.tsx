"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
import { Canvas, ThreeEvent, useThree, useFrame } from "@react-three/fiber";
import { useEditor } from "@/context/useEditorContext";
import { CustomObject3D } from "../types";
import { ArchitectureType } from "../types";
import { Object3D, Vector3 } from "three";
import * as THREE from "three";
import { SceneService } from "./SceneService";
import { fetchProject } from "@/services/projectService";
import { useProject } from "@/context/useProjectContext";
import { CommandManager } from "./commands/CommandManager";
import OutlineEffect from "./OutlineEffect";
import { Controls } from "../camera/Camera";
import { useSelectedObject } from "../context/Selected.context";
import { OrbitControls } from "@react-three/drei";
import { SceneObject } from "./models/SceneObject";

const SceneComponent: React.FC<{ isdragging: boolean }> = ({ isdragging }) => {
  const { sceneModel, setSceneModel } = useEditor();
  const { currentProject } = useProject();
  const { raycaster, camera, mouse } = useThree();
  const [hoveredObject, setHoveredObject] = useState<CustomObject3D | null>(null);
  const commandManager = CommandManager.getInstance();
  const [model, setModel] = useState<Object3D | undefined>(undefined);
  const [selectedModels, setSelectedModels] = useState<THREE.Object3D[]>([]);
  const [selectedModel, setSelectedModel] = useState<THREE.Object3D>();
  const hoveredObjectRef = useRef<CustomObject3D | null>(null);  

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
        if (event.key === "z") {
          commandManager.undo();
        } else if (event.key === "y") {
          commandManager.redo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const buildScene = async () => {
      const scene = new SceneService();
      await scene.buildScene(ArchitectureType.TWO_CIRCLES, setModel);
      setSceneModel(scene);
    };
    buildScene();
  }, []);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(model!, true);
    if (intersects.length > 0) {
      const clickedModel = intersects[0].object as CustomObject3D;
      setSelectedModels([clickedModel]);
      if (clickedModel.interactive && clickedModel.onPointerDown) {
        const selectedObject = clickedModel.onPointerDown(event);
        if (selectedObject instanceof SceneObject) {
          setSelectedObject(selectedObject);
        }
      }
    } else {
      setSelectedModels([]);
    }
  };

  const handleHover = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(model!, true);
    if (intersects.length > 0) {
      const hoverModel = intersects[0].object as CustomObject3D;
      if (hoveredObjectRef.current !== hoverModel) { 
        handleEndHover();  
        hoveredObjectRef.current = hoverModel; 
        if (hoverModel.interactive && hoverModel.onPointerOver) {
          hoverModel.onPointerOver();
        }
      }
    }
  };

  const handleEndHover = () => {
    if (hoveredObjectRef.current && hoveredObjectRef.current.interactive && hoveredObjectRef.current.onPointerOut) {
      hoveredObjectRef.current.onPointerOut();
      hoveredObjectRef.current = null;
    }
  };

  const handleEndClick = () => {
    if (hoveredObjectRef.current && hoveredObjectRef.current.interactive && hoveredObjectRef.current.onPointerUp) {
      hoveredObjectRef.current.onPointerUp();
      hoveredObjectRef.current = null;
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
    return (
      <pointLight ref={light} color="#4400ff" intensity={1.5} distance={10} />
    );
  };

  return (
    <group onClick={handleClick} onPointerOver={handleHover} onPointerUp={handleEndClick} >
      <AnimatedLights />
      <Suspense fallback={<span>Loading...</span>}>
        {model && <primitive object={model} />}
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

      <OutlineEffect selectedModels={selectedModels} />
      {!isdragging && (
        <Controls selectedModel={selectedObject as unknown as THREE.Object3D} />
      )}
    </group>
  );
};
export default SceneComponent;
