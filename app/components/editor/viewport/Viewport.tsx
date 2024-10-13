"use client";
import React, { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import styled from "styled-components";
import { CameraControls } from "../camera/Camera";
import SceneComponent from "./SceneComponent";
import { EnvironmentLoader } from "./EnvironmentLoader";

export const ViewportContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
  background-color: #717074;
`;





const Viewport: React.FC = () => {
  return (
    <ViewportContainer className="viewport">
      <Canvas>
        {/* <CameraControls /> */}
        <EnvironmentLoader />
        <ambientLight intensity={0.6} />
        <directionalLight intensity={2} position={[1, 1, 1]} castShadow />
        <SceneComponent />
      </Canvas>
    </ViewportContainer>
  );
};

export default Viewport;
