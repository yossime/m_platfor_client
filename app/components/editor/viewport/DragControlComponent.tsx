"use client";
import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { DragControls } from "three/addons/controls/DragControls.js";
import { Mesh, MeshStandardMaterial } from "three";

const DragControlComponent: React.FC<{
  setIsDragging: (dragging: boolean) => void;
}> = ({ setIsDragging }) => {
  const { camera, gl, scene } = useThree();
  
//   useEffect(() => {

// // רשימה של אירועים נפוצים
// const commonEvents = [
//   "click", "dblclick", "mousedown", "mouseup", "mouseover", "mouseout",
//   "keydown", "keyup", "keypress", "scroll", "resize", "focus", "blur", "change",
//   "input", "submit", "load", "unload", "error", "contextmenu","dragstart"
// ];

// // להאזין לכל אירוע ברשימה ולהדפיס אותו לקונסול
// commonEvents.forEach((eventType) => {
//   gl.domElement.addEventListener(eventType, (event) => {
//     event.stopPropagation()
//     // console.log(`Event triggered: ${event.type}`, event);
//     switch (event.type) {
//       case "dragstart":
//         console.log("dragstart")
//         break;
    
//       default:
//         break;
//     }
//   });
// });


//   // return () => document.removeEventListener("dragstart", );
// }, []);

  useEffect(() => {
    const controls = new DragControls(scene.children, camera, gl.domElement);
    controls.addEventListener("dragstart", (event) => {
      // event.stopPropagation(); 


      const object = event.object as Mesh;
      setIsDragging(true);
      if (!object.userData?.draggable) {
        controls.enabled = false;
        // controls.dispatchEvent({ type: "dragend",object:object });
        setIsDragging(false);
      } else {
      }
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
