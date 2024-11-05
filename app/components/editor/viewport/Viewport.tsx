
"use client";
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import SceneComponent from "./SceneComponent";
import DragControlComponent from "./DragControlComponent";
import { EnvironmentLoader } from "./EnvironmentLoader";

const ViewportContainer = styled.div`
  margin-top: 55px;
  flex-grow: 1;
  overflow: hidden;
  background-color: #717074;
`;


const Viewport: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <ViewportContainer className="viewport">
      <Canvas linear camera={{ position: [0, 2, 5] }}>
        <EnvironmentLoader />
        <ambientLight />
        <directionalLight intensity={2} position={[1, 1, 1]} castShadow />
        <SceneComponent isdragging={isDragging} />
        <DragControlComponent setIsDragging={setIsDragging} />
      </Canvas>
    </ViewportContainer>
  );
};

export default Viewport;
