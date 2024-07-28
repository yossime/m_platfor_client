"use client"

import { useEffect, useState } from "react";
import UnityViewer from '@/components/preView/UnityViewer';
import { useProject } from '@/context/useProjectContext';
import Viewport from '@/components/editor/viewport/Viewport';
import SideBar from "@/components/editor/sideBar/SideBar";
import styled from 'styled-components';
import { useEditor } from "@/context/useEditorContext";
import { IParams }  from '@/components/editor/interface/paramsType';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const SidebarContainer = styled.div`
  margin-top: 50px;
  width: 256px;
  background-color: #f3f4f6;
  height: 100vh;
  padding: 16px;
  margin-bottom: 40px;
  overflow-y: auto;
`;

const ViewportContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

const Editor = () => {
    const [editorMode, setEditorMode] = useState<boolean>(true);
    const { setDataParameters } = useEditor();


      useEffect(() => {

        const dataParameters: IParams = {
            // architecture: project.data.Templates || '',
            architecture: 'Barbiz',
    
            materialParams: {},
            maxSlot: 5,
            boards: []
          };
      
          for (let i = 0; i < 5; i++) {
            dataParameters.boards.push({
              type: null,
              name: null
            });
          }
    
          // setDataParameters(dataParameters);
      },[]);
  

    return (
        <Container>
        {/* {    <SidebarContainer>
                <SideBar />
            </SidebarContainer>} */}
            <ViewportContainer>
                <Viewport />
            </ViewportContainer>
        </Container>
    );
}

export default Editor;