"use client";
import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { DragControls } from "three/addons/controls/DragControls.js";
import { Mesh, MeshStandardMaterial } from "three";
import { CustomObject3D } from "../types";

const DragControlComponent: React.FC<{
  setIsDragging: (dragging: boolean) => void;
}> = ({ setIsDragging }) => {
  const { camera, gl, scene } = useThree();
  const { raycaster, mouse } = useThree();
  

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object as CustomObject3D;
        
        if (clickedObject.userData?.draggable === false) {
          event.stopPropagation();
        } 
      }
    };

    gl.domElement.addEventListener('pointerdown', handlePointerDown, true);
    return () => {
      gl.domElement.removeEventListener('pointerdown', handlePointerDown, true);
    };
  }, [camera, gl, mouse, raycaster, scene]);


  useEffect(() => {
    const controls = new DragControls(scene.children, camera, gl.domElement);
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
