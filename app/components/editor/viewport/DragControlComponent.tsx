"use client";
import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { DragControls } from "three/addons/controls/DragControls.js";
import { Mesh, MeshStandardMaterial } from "three";

const DragControlComponent: React.FC<{
  setIsDragging: (dragging: boolean) => void;
}> = ({ setIsDragging }) => {
  const { camera, gl, scene } = useThree();

  useEffect(() => {
    const controls = new DragControls(scene.children, camera, gl.domElement);

    controls.addEventListener("dragstart", (event) => {
      const object = event.object as Mesh;
      setIsDragging(true);
      // if (object.userData?.draggable) {
      // } else {


      //   // controls.enabled = false;
      // }
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


// "use client";
// import React, { useEffect, useRef } from "react";
// import { useThree } from "@react-three/fiber";
// import { Vector2, Vector3, Raycaster, Mesh, Plane } from "three";
// import { OrbitControls } from "three-stdlib";

// const DragControlManualComponent: React.FC<{
//   setIsDragging: (dragging: boolean) => void;
// }> = ({ setIsDragging }) => {
//   const { camera, gl, scene } = useThree();
//   const raycaster = useRef(new Raycaster());
//   const mouse = useRef(new Vector2());
//   const selectedObject = useRef<Mesh | null>(null);
//   const offset = useRef(new Vector3());
//   const dragPlane = useRef(new Plane(new Vector3(0, 1, 0))); // מישור הגרירה (מישור XY במקרה זה)
//   const orbitControls = useRef<OrbitControls | null>(null);

//   useEffect(() => {
//     orbitControls.current = new OrbitControls(camera, gl.domElement);

//     const onMouseDown = (event: MouseEvent) => {
//       event.stopPropagation();

//       mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

//       raycaster.current.setFromCamera(mouse.current, camera);
//       const intersects = raycaster.current.intersectObjects(scene.children, true);

//       if (intersects.length > 0) {
//         const intersectedObject = intersects[0].object as Mesh;
//         if (intersectedObject.userData?.draggable) {
//           selectedObject.current = intersectedObject;
//           setIsDragging(true);
//           orbitControls.current!.enabled = false; // מניעת תנועת מצלמה בזמן גרירה

//           // חישוב היסט בין מיקום האובייקט לנקודת הפגיעה
//           const intersectPoint = intersects[0].point;
//           offset.current.copy(intersectPoint).sub(intersectedObject.position);

//           // עדכון מישור הגרירה כך שיעבור דרך נקודת הפגיעה
//           dragPlane.current.setFromNormalAndCoplanarPoint(
//             new Vector3(0, 1, 0), // וקטור נורמל למישור (שולט בכיוון הגרירה)
//             intersectedObject.position
//           );

//           gl.domElement.addEventListener("mousemove", onMouseMove);
//           gl.domElement.addEventListener("mouseup", onMouseUp);
//         }
//       }
//     };

//     const onMouseMove = (event: MouseEvent) => {
//       event.stopPropagation();

//       if (selectedObject.current) {
//         mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
//         mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

//         raycaster.current.setFromCamera(mouse.current, camera);
//         const intersectPoint = new Vector3();

//         // חישוב נקודת הפגיעה במישור הגרירה
//         if (raycaster.current.ray.intersectPlane(dragPlane.current, intersectPoint)) {
//           selectedObject.current.position.copy(intersectPoint).sub(offset.current);
//         }
//       }
//     };

//     const onMouseUp = (event: MouseEvent) => {
//       event.stopPropagation();
//       setIsDragging(false);
//       selectedObject.current = null;
//       orbitControls.current!.enabled = true; // הפעלת תנועת מצלמה לאחר סיום גרירה

//       gl.domElement.removeEventListener("mousemove", onMouseMove);
//       gl.domElement.removeEventListener("mouseup", onMouseUp);
//     };

//     gl.domElement.addEventListener("mousedown", onMouseDown);

//     return () => {
//       gl.domElement.removeEventListener("mousedown", onMouseDown);
//       gl.domElement.removeEventListener("mousemove", onMouseMove);
//       gl.domElement.removeEventListener("mouseup", onMouseUp);
//     };
//   }, [camera, gl, scene, setIsDragging]);

//   return null;
// };

// export default DragControlManualComponent;
