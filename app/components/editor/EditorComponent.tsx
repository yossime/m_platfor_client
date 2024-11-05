"use client";

import React from "react";
import styled from "styled-components";
import SideBar from "@/components/editor/sideBar/SideBar";
import { EditorState, useEditor } from "@/context/useEditorContext";
import UnityViewer from "./preView/UnityViewer";
import { CameraProvider } from "@/context/CameraContext";
import { SidebarProvider } from "@/context/SidebarContext ";
import Viewport from "./viewport/Viewport";
import { EnvironmentProvider } from "@/context/EnvironmentContext";
import { SelectedObjectProvider } from "./context/Selected.context";
import WalkthroughEditor from "../Library/walkthrough/WalkthroughEditor";

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
          <WalkthroughEditor />
          <SelectedObjectProvider>
            <EnvironmentProvider>
              <CameraProvider>
                <SidebarProvider>
                  <SideBar />
                  <Viewport />
                </SidebarProvider>
              </CameraProvider>
            </EnvironmentProvider>
          </SelectedObjectProvider>
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
