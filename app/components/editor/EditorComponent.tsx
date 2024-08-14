"use client"

import Viewport from '@/components/editor/viewport/Viewport';
import SideBar from "@/components/editor/sideBar/SideBar";
import styled from 'styled-components';
import { useEditor } from '@/context/useEditorContext';
import { ISceneObject } from './interface/models';
import UnityViewer from './preView/UnityViewer';
import { useProject } from '@/context/useProjectContext';
import axios from '@/utils/axios';

export const EditorLayout = styled.div`
  display: flex;
  height: calc(100vh - 55px);
  top: 55px;
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
  const { previewMode } = useProject();
  const { sceneModel, setSceneModel } = useEditor();


  const onClick = async () => {
    const json = sceneModel?.exportToJson();
    // console.log('json json json json json json',json)
    // try {
    //   const response = await axios.post('http://localhost:3500/preview/tytytytyty', json, {
    //   });
    //   console.log('response: ' + response);
    // } catch (error) {
    //   console.error('Error fetching project:', error);
    //   throw error;
    // }
    console.log("json: " + json);
  }

  return (
    <>
      {!previewMode ? (
        <EditorLayout>
          <button onClick={onClick}>click</button>
          <SideBar />
          <Viewport />
        </EditorLayout>
      ) : (
        <EditorLayout>
          <UnityViewer projectId='1234'/>
        </EditorLayout>
      )}
    </>
  );
}

export default EditorComponent;