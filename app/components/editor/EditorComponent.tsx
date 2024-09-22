"use client";

import React from "react";
import styled from "styled-components";
import Viewport from "@/components/editor/viewport/Viewport";
import SideBar from "@/components/editor/sideBar/SideBar";
import { EditorState, useEditor } from "@/context/useEditorContext";
import UnityViewer from "./preView/UnityViewer";
import JoyrideEditor from "../Library/Joyride/JoyrideEditor";
import { CameraProvider } from "@/context/CameraContext";

const EditorLayout = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;


const EditorComponent: React.FC = () => {
  const { editorState } = useEditor();

  return (
    <>
      {editorState !== EditorState.PREVIEW ? (
        <EditorLayout>
          <JoyrideEditor />
          <CameraProvider>
            <SideBar />
            <Viewport />
          </CameraProvider>
        </EditorLayout>
      ) : (
        <EditorLayout>
          <UnityViewer />
        </EditorLayout>
      )}
    </>
  );
};

export default EditorComponent;
