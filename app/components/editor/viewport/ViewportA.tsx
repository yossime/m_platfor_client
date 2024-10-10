// import React, { ReactNode } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';

// interface ViewportProps {
//     children: ReactNode;
//   }
  
//   const Viewport: React.FC<ViewportProps> = ({ children }) => {
//   return (
//     <Canvas>
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />
//       {children}
//       <OrbitControls />
//     </Canvas>
//   );
// };

// export default Viewport;



































































// // import React, { useEffect } from 'react';
// // import * as THREE from 'three';

// // import styled from 'styled-components';
// // import { fetchProject } from '@/services/projectService';
// // import { useProject } from '@/context/useProjectContext';
// // import { ArchitectureType } from '../types';
// // import { Architecture } from './models/architectures/Architecture';
// // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';




// // interface ViewportProps {
// //     onMeshClick: (mesh: THREE.Mesh) => void;
// //     selectedMesh: THREE.Mesh | null;
// // }

// // const Viewport: React.FC<ViewportProps> = ({ onMeshClick, selectedMesh }) => {
// //     const scene = new THREE.Scene();
// //     scene.background = new THREE.Color(255, 255, 255);
// //     const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
// //     // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// //     camera.position.set(0, 1, 3);
// //     const renderer = new THREE.WebGLRenderer({ antialias: true });

// //     const { currentProject } = useProject();

// //     const onLoad = (object?: THREE.Object3D) => {
// //         const model = object as THREE.Mesh;
// //         const material = new THREE.MeshBasicMaterial({ color: 'blue' })
// //         model.material = material;
// //         // model.userData.originalColor = model.material.color.getHex();
// //         scene.add(model);
// //     }
// //     useEffect(() => {
// //         const buildScene = async () => {
// //             //   const scene = new SceneService();
// //             const res = await fetchProject(currentProject || '', '');
// //             if (res.data.dataParameters) {
// //                 const parsedData = res.data.dataParameters;
// //                 // const parsedData = JSON.parse(res.data);
// //                 new Architecture(ArchitectureType.TWO_CIRCLES, { exportedScenObj: parsedData, onLoad });
// //             }
// //             else {
// //                 new Architecture(ArchitectureType.TWO_CIRCLES, { onLoad });
// //             }
// //         }
// //         buildScene();

// //     }, []);

// //     useEffect(() => {
// //         renderer.setSize(window.innerWidth, window.innerHeight);
// //         document.body.appendChild(renderer.domElement);

// //         // Add a basic light
// //         const light = new THREE.HemisphereLight(0xffffff, 0x444444);
// //         scene.add(light);

// //         // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// //         // directionalLight.position.set(5, 5, 5).normalize();
// //         // scene.add(directionalLight);

// //         // Add meshes to the scene
// //         // Assuming you have a method to add your meshes
// //         // const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
// //         // mesh.userData.originalColor = mesh.material.color.getHex(); // Store original color
// //         // scene.add(mesh);


// //         camera.position.z = 5;

// //         const controls = new OrbitControls(camera, renderer.domElement);


// //         const raycaster = new THREE.Raycaster();
// //         const mouse = new THREE.Vector2();

// //         const getIntersects = (event: MouseEvent) => {
// //             // const mouse = new THREE.Vector2();
// //             mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
// //             mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

// //             raycaster.setFromCamera(mouse, camera);

// //             return raycaster.intersectObjects(scene.children);
// //         };

// //         let currentOutline: THREE.Mesh | null = null;
// //         const handleClick = (event: MouseEvent) => {
// //             const intersects = getIntersects(event);

// //             if (intersects.length > 0) {
// //                 const selectedMesh = intersects[0].object;
// //                 if (selectedMesh instanceof THREE.Mesh) {

// //                     if (currentOutline) {
// //                         scene.remove(currentOutline); // הסרת ה-outline הקודם
// //                     }

// //                     // const outline = createOutline(selectedMesh); // יצירת outline חדש
// //                     // outline.rotation.copy(selectedMesh.rotation);
// //                     // scene.add(outline); // הוספתו לסצנה
// //                     // currentOutline = outline; // שמירת ה-outline הנוכחי

// //                     onMeshClick(selectedMesh);
// //                     // centerMeshInView(selectedMesh);
// //                 } else {
// //                     // אם אין mesh שנבחר, נסיר את ה-outline
// //                     if (currentOutline) {
// //                         scene.remove(currentOutline);
// //                         currentOutline = null;
// //                     }

// //                     console.warn("Clicked object is not a mesh");
// //                 }
// //             } else {

// //                 console.warn("No objects intersected");
// //             }
// //         };

// //         const createOutline = (mesh: THREE.Mesh) => {
// //             // ניצור חומר outline (Wireframe)
// //             const outlineMaterial = new THREE.MeshBasicMaterial({
// //                 color: 0xffff00, // צבע צהוב
// //                 side: THREE.BackSide // מאפשר לראות את ה-outline מכל הכיוונים
// //             });

// //             // ניצור העתק של ה-mesh הקיים כדי ליצור את ה-outline
// //             const outlineMesh = new THREE.Mesh(mesh.geometry, outlineMaterial);
// //             outlineMesh.scale.multiplyScalar(1.05); // נבצע הגדלה קלה כדי שה-outline יהיה מחוץ למודל

// //             // נחזיר את ה-outline שניתן להוסיף לסצנה
// //             return outlineMesh;
// //         };



// //         const centerMeshInView = (mesh: THREE.Mesh) => {
// //             const center = new THREE.Vector3();
// //             const box = new THREE.Box3().setFromObject(mesh);
// //             box.getCenter(center);
// //             const direction = center.clone().sub(camera.position).normalize();
// //             const distance = camera.position.distanceTo(center);
// //             camera.position.addVectors(center, direction.multiplyScalar(-distance));
// //             camera.lookAt(center);
// //             controls.target.copy(center);
// //             controls.update();
// //         }

// //         // const handleClick = (event: MouseEvent) => {
// //         //     console.log(event);
// //         //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
// //         //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

// //         //     raycaster.setFromCamera(mouse, camera);
// //         //     const intersects = raycaster.intersectObjects(scene.children, true);
// //         //         console.log("intersects", intersects)

// //         //     if (intersects.length > 0) {
// //         //         const clickedMesh = intersects[0].object as THREE.Mesh;
// //         //         console.log("clickedMesh", clickedMesh)
// //         //         onMeshClick(clickedMesh);
// //         //     }
// //         // };

// //         window.addEventListener('click', handleClick, false);



// //         const animate = () => {
// //             requestAnimationFrame(animate);
// //             controls.update();
// //             renderer.render(scene, camera);
// //         };
// //         animate();

// //         return () => {
// //             window.removeEventListener('click', handleClick);
// //             controls.dispose();
// //             renderer.dispose();
// //         };
// //     }, []);

// //     return (
// //         <>
// //         </>
// //     );
// // };

// // export default Viewport;
