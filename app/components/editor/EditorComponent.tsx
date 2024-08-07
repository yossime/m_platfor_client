"use client"

import Viewport from '@/components/editor/viewport/Viewport';
import SideBar from "@/components/editor/sideBar/SideBar";

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FBXLoader } from 'three-stdlib';
import { SceneModel } from './interface/Scene';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';
import { useEditor } from '@/context/useEditorContext';
import { Board } from './interface/Board';
import { BoardType, IContentData, IContentDataType, ISceneObject } from './interface/models';
import { Product, ProductType } from './interface/Product';

export const EditorLayout = styled.div`
  display: flex;
  height: calc(100vh - 55px);
  top:55px;
  margin-top: 55px;
  flex: 1;
  overflow: hidden;
`;

export const ResizableHandle = styled.div`
  width: 5px;
  background-color: #d0d0d0;
  cursor: col-resize;
`;
const EditorComponent: React.FC = () => {

  // const [sceneModel, setSceneModel] = useState<SceneModel | null>(null);
  // const archUrl = 'https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/Barbiz.fbx?alt=media&token=8a94f967-363b-48c8-8d71-ad3a620e672b';
  // const archUrl = 'https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/architectures%2FBarbizKip1.fbx?alt=media';
  const { sceneModel, setSceneModel } = useEditor();
  const [childrenList, setChildrenLis] = useState<ISceneObject[] | null>(null);

  // const { camera, scene } = useThree();

  // useEffect(() => {

  //     const loader = new FBXLoader();
  //     loader.load(
  //         archUrl,
  //         (fbx) => {
  //           setSceneModel(new SceneModel('B', fbx, camera as PerspectiveCamera));
  //             console.log("fbx", fbx);
  //         },
  //         undefined,
  //         (error) => {
  //             console.error('An error happened:', error);
  //         }
  //     )


  // }, [archUrl]);

  const handleClick = () => {
    const arch = sceneModel?.root;
    const newBoard = new Board(BoardType.Product);

    arch?.addChild(newBoard);
    const children = arch?.getChildren();
    // console.log("children", children);
    if (children?.length) {

      // console.log("if (children?.length)", children);
      
      setChildrenLis(children)
    }
  }

  const handleAddProdect = () => {
    const arch = sceneModel?.root;
    const prodect = new Product(ProductType.Poudiom)

    arch?.children[0].addChild(prodect)

  }

  const handleCheingColor = async () => {
    const arch = sceneModel?.root;
    const buttonContent: IContentData = {
      type: IContentDataType.BUTTON,
      name: 'SubmitButton',
      texture: {
        diffuse: {
          url: 'https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/textura_4.jpeg?alt=media&token=642299bf-7758-4516-a0ae-9ac132c26c9f'
        }
      },
      // text: {
      //     content: 'Submit',
      //     fontSize: 14,
      //     color: '#000000'
      // }
    };
    // arch?.displayEmptySlots()
    // console.log("sceneModel?.root?.children", sceneModel?.root?.getChildren()); 
    // await (arch?.children[0] as Board).addContentData(buttonContent)

    console.log("getSelectedObject", sceneModel?.getSelectedObject()); 

  }



  return (
    <EditorLayout>
      <button onClick={handleClick}>click</button>
      <button onClick={handleCheingColor}>cheing color</button>
      <button onClick={handleAddProdect}>add prodect</button>
      <h1>{sceneModel?.root?.type}</h1>
      <h1>{sceneModel?.root?.children[0]?.type}</h1>


      {/* {childrenList?.map((child: ISceneObject, index: number) => (
          <button key={index}>{child.type}</button>
      ))} */}


      <SideBar />
      <Viewport />
    </EditorLayout>
  );
}

export default EditorComponent;