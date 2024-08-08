"use client"

import Viewport from '@/components/editor/viewport/Viewport';
import SideBar from "@/components/editor/sideBar/SideBar";
import styled from 'styled-components';
import { useEditor } from '@/context/useEditorContext';
import { ISceneObject } from './interface/models';
import UnityViewer from './preView/UnityViewer';
import { useProject } from '@/context/useProjectContext';

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

  return (
    <>
      {!previewMode ? (
        <EditorLayout>
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