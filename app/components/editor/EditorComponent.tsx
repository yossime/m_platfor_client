"use client"

import Viewport from '@/components/editor/viewport/Viewport';
import SideBar from "@/components/editor/sideBar/SideBar";
import styled from 'styled-components';
import { EditorState, useEditor } from '@/context/useEditorContext';
import UnityViewer from './preView/UnityViewer';
import { useEffect } from 'react';

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
  const { editorState } = useEditor();

  useEffect(() => {
    console.log("Current editor state:", editorState);
  }, [editorState]);

  return (
    <>
      {(editorState !== EditorState.PREVIEW) ? (
        <EditorLayout>
          <SideBar />
          <Viewport />
        </EditorLayout>
      ) : (
        <EditorLayout>
          <UnityViewer/>
        </EditorLayout>
      )}
    </>
  );
}

export default EditorComponent;