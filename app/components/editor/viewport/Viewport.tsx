// "use client"
// import React, { useState, useEffect, Suspense } from 'react';
// import { Canvas, ThreeEvent } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import { useEditor } from '@/context/useEditorContext';
// import styled from 'styled-components';
// import { SceneModel } from '../interface/Scene';
// import { ArchitectureType, CustomObject3D } from '../interface/models';
// import { Object3D } from 'three';



// export const ViewportContainer = styled.div`
//   flex-grow: 1;
//   overflow: hidden;
// `;



// const data = {
//   "name": null,
//   "type": "Barbiz",
//   "position": null,
//   "rotation": null,
//   "scale": {
//     "x": 1,
//     "y": 1,
//     "z": 1
//   },
//   "children": [
//     {
//       "name": null,
//       "type": "DisplayStands",
//       "position": {
//         "x": -9.313225746154785e-10,
//         "y": 0,
//         "z": -8.673617379884035e-19
//       },
//       "rotation": {
//         "x": -1.4106487788571324e-7,
//         "y": -2.443317225831709e-7,
//         "z": 1.0471978187560862
//       },
//       "scale": {
//         "x": 1,
//         "y": 1,
//         "z": 1
//       },
//       "children": [],
//       "contentData": []
//     },
//     {
//       "name": null,
//       "type": "DisplayStands",
//       "position": {
//         "x": -9.313225746154785e-10,
//         "y": 0,
//         "z": -8.673617379884035e-19
//       },
//       "rotation": {
//         "x": 1.4106511450440104e-7,
//         "y": -2.443316844269843e-7,
//         "z": 2.094395399093645
//       },
//       "scale": {
//         "x": 1,
//         "y": 1,
//         "z": 1
//       },
//       "children": [],
//       "contentData": []
//     },
//     {
//       "name": null,
//       "type": "DisplayStands",
//       "position": {
//         "x": -4.656612873077393e-10,
//         "y": 1.4901161193847656e-8,
//         "z": 4.656612873077393e-10
//       },
//       "rotation": {
//         "x": -2.8212997449372784e-7,
//         "y": 0,
//         "z": 0
//       },
//       "scale": {
//         "x": 1,
//         "y": 1,
//         "z": 1
//       },
//       "children": [],
//       "contentData": []
//     }
//   ],
//   "contentData": []
// }

// const json = JSON.stringify(data, null, 2)
// interface SceneComponentProps {
//   sceneModel: SceneModel;
// }


// const SceneComponent = () => {
//   const archUrl = 'https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/architectures%2FBarbizKip1.fbx?alt=media';
//   const { sceneModel, setSceneModel } = useEditor();
//   const [model, setModel] = useState<Object3D | null>(null);


//   useEffect(() => {
//     // setSceneModel(new SceneModel(ArchitectureType.Barbiz, setModel));
//     const buildScene = async () => {
//       const scene = new SceneModel(setModel);
//       const sceneModel = await scene.buildingFromScratch(ArchitectureType.Barbiz);
//       // const sceneModel = scene.buildSceneObjectFromJson(json);

//       console.log("sceneModel", sceneModel)
//       console.log("sceneModel.getModel()", sceneModel.getModel())



//       setSceneModel(scene);
//     }
//     buildScene();
//   }, [archUrl]);

//   const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
//     const object = event.object as CustomObject3D;
//     event.stopPropagation();
//     let selected = null;
//     if (object.interactive) {
//       if (object.onPointerDown) {
//         selected = object.onPointerDown(event);
//       }
//     }
//     sceneModel?.setSelectedObject(selected)
//   }
//   return (
//     <group onPointerDown={handlePointerDown}>
//       {/* <PerspectiveCamera makeDefault position={[5, 5, 5]} /> */}

//       <Suspense fallback={<span>Loading...</span>}>
//         {model && <primitive object={model} />}
//       </Suspense>
//     </group>
//   );
// };




// const Viewport = () => {

//   return (
//     <ViewportContainer>
//       <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
//         <Canvas style={{ height: '100%', width: '100%' }}>
//           <OrbitControls />
//           <ambientLight />
//           {/* <gridHelper /> */}
//           <SceneComponent />
//         </Canvas>
//       </div>
//     </ViewportContainer>
//   );
// };

// export default Viewport;


"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, ThreeEvent, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import { useEditor } from '@/context/useEditorContext';
import styled from 'styled-components';
import { SceneModel } from '../interface/Scene';
import { ArchitectureType, CustomObject3D } from '../interface/models';
import { Object3D, Vector3 } from 'three';
import * as THREE from 'three';

export const ViewportContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
  background: linear-gradient(to bottom, #1e1e2e, #2a2a3a);
`;

const SceneComponent = () => {
  const { sceneModel, setSceneModel } = useEditor();
  const [model, setModel] = useState<Object3D | null>(null);

  useEffect(() => {
    const buildScene = async () => {
      const scene = new SceneModel(setModel);
      const sceneModel = await scene.buildingFromScratch(ArchitectureType.Barbiz);
      setSceneModel(scene);
      // console.log(sceneModel.addChild,"ggggggggggggggggggggg")
    }
    buildScene();
  }, []);

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    const object = event.object as CustomObject3D;
    event.stopPropagation();
    let selected = null;
    if (object.interactive) {
      if (object.onPointerDown) {
        selected = object.onPointerDown(event);
      }
    }
    sceneModel?.setSelectedObject(selected)
  }

  const CameraController = () => {
    const { camera } = useThree();
    useEffect(() => {
      // Adjusted camera position to start higher //yossi
      camera.position.set(5, 35, 5);
      camera.lookAt(new Vector3(0, 0, 0));
    }, [camera]);
    return null;
  };

  const AnimatedLights = () => {
    useFrame(({ clock }) => {
      const t = clock.getElapsedTime();
      const x = Math.sin(t * 0.5) * 3;
      const z = Math.cos(t * 0.5) * 3;
      light.current.position.set(x, 3, z);
    });
    const light = React.useRef<THREE.PointLight>(null!);
    return <pointLight ref={light} color="#ffaa00" intensity={1.5} distance={10} />;
  };

  return (
    <group onPointerDown={handlePointerDown}>
      <CameraController />
      <AnimatedLights />
      <Suspense fallback={<span>Loading...</span>}>
        {model && <primitive object={model} />}
      </Suspense>
    </group>
  );
};

const Viewport = () => {
  return (
    <ViewportContainer>
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <Canvas style={{ height: '100%', width: '100%' }}
          camera={{ fov: 75, near: 0.1, far: 1000, position: [5, 8, 5] }} //yossi - Adjusted initial camera position
        >
          <OrbitControls enableDamping dampingFactor={0.05} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <SceneComponent />
          <Environment preset="sunset" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        </Canvas>
      </div>
    </ViewportContainer>
  );
};

export default Viewport;