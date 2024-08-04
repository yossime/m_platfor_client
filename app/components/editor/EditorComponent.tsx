"use client"

import Viewport from '@/components/editor/viewport/Viewport';
import SideBar from "@/components/editor/sideBar/SideBar";

import styled from 'styled-components';

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

  return (

    <EditorLayout>
      <SideBar />
      {/* <Viewport /> */}
    </EditorLayout>
  );
}

export default EditorComponent;