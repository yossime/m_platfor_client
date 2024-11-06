"use client";
import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import SceneComponent from "./SceneComponent";
import DragControlComponent from "./DragControlComponent";
import { EnvironmentLoader } from "./EnvironmentLoader";
import { Controls } from "../camera/Camera";
import { useSelectedObject } from "../context/Selected.context";
import * as THREE from "three";

const ViewportContainer = styled.div`
  margin-top: 55px;
  flex-grow: 1;
  overflow: hidden;
  background-color: #717074;
`;

const Viewport: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { selectedObject } = useSelectedObject();

  // useEffect(() => {
  //   const viewportContainer = document.querySelector(".viewport");
  
  //   if (viewportContainer) {
  //     const handleCustomPointer = (event: Event) => {
  //       const customEvent = event as CustomEvent;
  //       const originalEvent = customEvent.detail?.originalEvent as PointerEvent;
  
  //       if (originalEvent && !originalEvent.defaultPrevented) {
  //         originalEvent.preventDefault();
  
  //         const newEvent = new PointerEvent(originalEvent.type, originalEvent);
  //         viewportContainer.dispatchEvent(newEvent);
  //       }
  //     };
  
  //     viewportContainer.addEventListener("mypointerdown", handleCustomPointer as EventListener);
  
  //     return () => {
  //       viewportContainer.removeEventListener("mypointerdown", handleCustomPointer as EventListener);
  //     };
  //   }
  // }, []);
  

  return (
    <ViewportContainer className="viewport">
      <Canvas linear camera={{ position: [0, 2, 5] }}>
        <EnvironmentLoader />
        <ambientLight />
        <directionalLight intensity={2} position={[1, 1, 1]} castShadow />
        <SceneComponent />
        <DragControlComponent setIsDragging={setIsDragging} />
        {!isDragging && (
          <Controls selectedModel={selectedObject as unknown as THREE.Object3D} />
        )}
      </Canvas>
    </ViewportContainer>
  );
};

export default Viewport;
