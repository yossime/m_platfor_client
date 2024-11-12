"use client";
import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";
import { CustomObject3D } from "../types";
import DragControls  from "./utils/CustomDragControls";

const DragControlComponent: React.FC<{
  setIsDragging: (dragging: boolean) => void;
}> = ({ setIsDragging }) => {
  const { camera, gl, scene } = useThree();
  

  useEffect(() => {
    const controls = new DragControls(scene.children, camera, gl.domElement as any);
    controls.addEventListener("dragstart", () => {
      setIsDragging(true);
    });

    controls.addEventListener("drag", (event) => {
      const draggedObject = event.object as Mesh;
      const material = draggedObject.material as MeshStandardMaterial;
      if (material && "emissive" in material) {
        material.emissive.setHex(0xaaaaaa);
      }
    });

    controls.addEventListener("dragend", (event) => {
      setIsDragging(false);
      const draggedObject = event.object as Mesh;
      const material = draggedObject.material as MeshStandardMaterial;
      if (material && "emissive" in material) {
        material.emissive.setHex(0x000000);
      }
    });

    return () => controls.dispose();
  }, [camera, gl, scene, setIsDragging]);

  return null;
};





export default DragControlComponent;
