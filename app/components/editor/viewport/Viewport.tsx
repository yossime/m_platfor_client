"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEditor } from '@/context/useEditorContext';
import styled from 'styled-components';
import { SceneModel } from '../interface/Scene';
import { ArchitectureType, CustomObject3D } from '../interface/models';
import { Object3D } from 'three';


import { getAuthDownloadUrl } from "@/services/firebase";

export const ViewportContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;




// const headerBoard: IHeaderBoard = {
//     name: 'headerboard',
//     type: 'HeaderBoard',
//     title: {
//         text: "Welcome to Our Store",
//         color: "#ffffff",
//         scale: [1, 1, 1]
//     },
//     subTitle: {
//         text: "subTitle",
//         color: "#ffffff",
//         scale: [1, 1, 1]
//     },
//     materialParams: { map: 'https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/textura_4.jpeg?alt=media&token=642299bf-7758-4516-a0ae-9ac132c26c9f' },
// }



// const productBoard: IProductBoard = {
//     maxDisplay: 6,
//     name: "ProductBoard",
//     type: 'ProductBoard',
//     title: {
//         text: "Welcome to Our Store",
//         color: "purple",
//         scale: [1, 1, 1]
//     },
//     displays: [
//         {
//             materialParams: { color: "pink" },
//             products: [
//                 {
//                     // src: 'Podium',
//                     src: 'heartglass1',
//                     // src: 'Klee',
//                     title: {
//                         text: "Product Title 0",
//                         color: "purple",
//                         scale: [0.1, 0.1, 0.1]
//                     },
//                     description: {
//                         text: "Product Description 0",
//                         color: "yellow",
//                         scale: [0.1, 0.1, 0.1]
//                     },
//                     buttons: {
//                         price: {
//                             text: { text: "$299" },
//                             material: {
//                                 color: "#FF5733"
//                             },
//                             type: null
//                         },
//                         addToCart: {
//                             type: null,

//                             text: {
//                                 text: "111 Add 2 Cart",
//                                 color: "#ffffff"
//                             },
//                             material: {
//                                 color: "#FF5733"
//                             }
//                         },
//                         quickView: {
//                             type: null,

//                             text: {
//                                 text: "111 Quick View",
//                                 color: "#ffffff"
//                             },
//                             material: {
//                                 color: "#33C1FF"
//                             }
//                         },
//                         buyNow: {
//                             type: null,

//                             text: {
//                                 text: "111 Buy Now",
//                                 color: "#ffffff"
//                             },
//                             material: {
//                                 color: "#75FF33"
//                             }
//                         }
//                     },
//                     type: 'Podium'
//                 }
//             ],
//             type: 'Podium'
//             // type: 'PodiumModelOrigin'
//         },
//         {

//             materialParams: { color: "pink" },
//             products: [
//                 {
//                     src: 'heartglass1',


//                     title: {
//                         text: "Product Title 1",
//                         color: "blue",
//                         scale: [0.1, 0.1, 0.1]
//                     },
//                     description: {
//                         text: "Product Description 1",
//                         color: "black",
//                         scale: [0.1, 0.1, 0.1]
//                     },
//                     buttons: {
//                         price: {
//                             text: { text: "$299" },
//                             material: {
//                                 color: "#FF5733"
//                             },
//                             type: null
//                         },
//                         addToCart: {
//                             type: null,

//                             text: {
//                                 text: "Add 2 Cart",
//                                 color: "#ffffff"
//                             },
//                             material: {
//                                 color: "#FFC300"
//                             }
//                         },
//                         quickView: {
//                             type: null,

//                             text: {
//                                 text: "Quick View",
//                                 color: "#ffffff"
//                             },
//                             material: {
//                                 color: "#C70039"
//                             }
//                         },
//                         buyNow: {
//                             type: null,

//                             text: {
//                                 text: "Buy Now",
//                                 color: "#ffffff"
//                             },
//                             material: {
//                                 color: "#900C3F"
//                             }
//                         }
//                     },
//                     type: 'Podium'
//                 }
//             ],
//             type: 'Podium'
//         },
//         {
//             materialParams: { color: "pink" },
//             products: [
//                 {

//                     title: {
//                         text: "Product Title 2",
//                         color: "#ffffff",
//                         scale: [0.1, 0.1, 0.1]
//                     },
//                     description: {
//                         text: "Product Description 2",
//                         color: "#cccccc",
//                         scale: [0.1, 0.1, 0.1]
//                     },
//                     buttons: {
//                         price: {
//                             text: { text: "$299" },
//                             material: {
//                                 color: "#FF5733"
//                             },
//                             type: null
//                         },
//                         addToCart: {
//                             type: null,

//                             text: {
//                                 text: "Add 2 Cart",
//                                 color: "#ffffff"
//                             },
//                             material: {
//                                 color: "#DAF7A6"
//                             }
//                         },
//                         quickView: {
//                             type: null,

//                             text: {
//                                 text: "Quick View",
//                                 color: "#ffffff"
//                             },
//                             material: {
//                                 color: "#FF6F61"
//                             }
//                         },
//                         buyNow: {
//                             type: null,

//                             text: {
//                                 text: "Buy Now",
//                                 color: "#ffffff"
//                             },
//                             material: {
//                                 color: "#D5AAFF"
//                             }
//                         }
//                     },
//                     type: 'Podium',

//                 }
//             ],
//             type: 'Podium'
//         },
//         {
//             materialParams: { color: "pink" },
//             products: [
//                 {


//                     title: {
//                         text: "Product Title 3",
//                         color: "#ffffff",
//                         scale: [0.1, 0.1, 0.1]
//                     },
//                     description: {
//                         text: "Product Description 3",
//                         color: "#cccccc",
//                         scale: [0.1, 0.1, 0.1]
//                     },
//                     buttons: {
//                         price: {
//                             text: { text: "$299" },
//                             material: {
//                                 color: "#FF5733"
//                             },
//                             type: null
//                         },
//                         addToCart: {
//                             type: null,
//                             text: {
//                                 text: "Add 2 Cart",
//                                 color: "#ffffff"
//                             },
//                             material: {
//                                 color: "#00BFFF"
//                             }
//                         },
//                         quickView: {
//                             type: null,
//                             text: {
//                                 text: "Quick View",
//                                 color: "#ffffff"
//                             },
//                             material: {
//                                 color: "#FF1493"
//                             }
//                         },
//                         buyNow: {
//                             type: null,
//                             text: {
//                                 text: "Buy dd Now",
//                                 color: "#ffffff"
//                             },
//                             material: {
//                                 color: "#32CD32"
//                             }
//                         }
//                     },
//                     type: 'Podium'
//                 }
//             ],
//             type: 'Podium'
//         }
//     ]
// }





// const params: IParams = {
//     architecture: "Barbiz",
//     materialParams: { color: 'purple' },
//     maxSlot: 5,
//     boards: [
//         headerBoard,
//         productBoard,
//     ],
// }



const data = {
  "name": null,
  "type": "Barbiz",
  "position": null,
  "rotation": null,
  "scale": {
    "x": 1,
    "y": 1,
    "z": 1
  },
  "children": [
    {
      "name": null,
      "type": "DisplayStands",
      "position": {
        "x": -9.313225746154785e-10,
        "y": 0,
        "z": -8.673617379884035e-19
      },
      "rotation": {
        "x": -1.4106487788571324e-7,
        "y": -2.443317225831709e-7,
        "z": 1.0471978187560862
      },
      "scale": {
        "x": 1,
        "y": 1,
        "z": 1
      },
      "children": [],
      "contentData": []
    },
    {
      "name": null,
      "type": "DisplayStands",
      "position": {
        "x": -9.313225746154785e-10,
        "y": 0,
        "z": -8.673617379884035e-19
      },
      "rotation": {
        "x": 1.4106511450440104e-7,
        "y": -2.443316844269843e-7,
        "z": 2.094395399093645
      },
      "scale": {
        "x": 1,
        "y": 1,
        "z": 1
      },
      "children": [],
      "contentData": []
    },
    {
      "name": null,
      "type": "DisplayStands",
      "position": {
        "x": -4.656612873077393e-10,
        "y": 1.4901161193847656e-8,
        "z": 4.656612873077393e-10
      },
      "rotation": {
        "x": -2.8212997449372784e-7,
        "y": 0,
        "z": 0
      },
      "scale": {
        "x": 1,
        "y": 1,
        "z": 1
      },
      "children": [],
      "contentData": []
    }
  ],
  "contentData": []
}

const json = JSON.stringify(data, null, 2)
interface SceneComponentProps {
  sceneModel: SceneModel;
}


const SceneComponent = () => {
  const archUrl = 'https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/architectures%2FBarbizKip1.fbx?alt=media';
  const { sceneModel, setSceneModel } = useEditor();
  const [model, setModel] = useState<Object3D | null>(null);
  // const { camera, scene, gl } = useThree();
  // const raycaster = new Raycaster();
  // const pointer = new Vector2();

  //   useEffect(() => {
  //       function onPointerDown(event: PointerEvent) {
  //           // Calculate pointer position in normalized device coordinates
  //           pointer.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
  //           pointer.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;

  //           // Update the picking ray with the camera and pointer position
  //           raycaster.setFromCamera(pointer, camera);

  //           // Calculate objects intersecting the picking ray
  //           const intersects = raycaster.intersectObjects(scene.children, true);

  //           for (let i = 0; i < intersects.length; i++) {
  //               const object = intersects[i].object as CustomObject3D;
  //               if (object.onPointerDown) {
  //                   object.onPointerDown(event);
  //                   break;
  //               }
  //           }
  //       }

  //       // Add event listener
  //       gl.domElement.addEventListener('pointerdown', onPointerDown);

  //       // Clean up
  //       return () => {
  //           gl.domElement.removeEventListener('pointerdown', onPointerDown);
  //       };
  //   }, [camera, scene, gl, raycaster]);


  useEffect(() => {
    // setSceneModel(new SceneModel(ArchitectureType.Barbiz, setModel));
    const buildScene = async () => {
      const scene = new SceneModel(setModel);
      const sceneModel = await scene.buildingFromScratch(ArchitectureType.Barbiz);
      // const sceneModel = scene.buildSceneObjectFromJson(json);

      console.log("sceneModel", sceneModel)
      console.log("sceneModel.getModel()", sceneModel.getModel())



      setSceneModel(scene);
    }
    buildScene();
  }, [archUrl]);

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
  return (
    <group onPointerDown={handlePointerDown}>
      {/* <PerspectiveCamera makeDefault position={[5, 5, 5]} /> */}

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
        <Canvas style={{ height: '100%', width: '100%' }}>
          <OrbitControls />
          <ambientLight />
          <gridHelper />
          <SceneComponent />
        </Canvas>
      </div>
    </ViewportContainer>
  );
};

export default Viewport;

