"use client";
import React, { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import styled from "styled-components";
import SceneComponent from "./SceneComponent";
import { EnvironmentLoader } from "./EnvironmentLoader";

export const ViewportContainer = styled.div`
margin-top: 55px;
  flex-grow: 1;
  overflow: hidden;
  background-color: #717074;
`;

const Viewport: React.FC = () => {
  return (
    <ViewportContainer className="viewport">
      <Canvas linear camera={{ position: [0, 0, 5] }}>
        {/* <CameraControls /> */}
        <EnvironmentLoader />
        <ambientLight />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        {/* <directionalLight intensity={2} position={[1, 1, 1]} castShadow /> */}
        <SceneComponent />
      </Canvas>
    </ViewportContainer>
  );
};

export default Viewport;
