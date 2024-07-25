"use client"
import { useState } from "react";
import UnityViewer from '@/components/preView/UnityViewer';
import { useProject } from '@/context/useProjectContext';
import Viewport from '@/components/editor/viewport/Viewport';



const Editor = () => {

    const [editorMode, setEditorMode] = useState<boolean>(true);
    const { currentProject , dataParameters } = useProject();

    return (
        <>
                <Viewport/>
            {/* {editorMode ? (
                <>
                    <ThreeDEditor setEditorMode={setEditorMode} />
                    <EditMediaPopup />
                    <SideBar />
                </>
            ) : (
                <UnityViewer projectId={currentProject as string} setEditorMode={setEditorMode} />
            )} */}
        </>
    );
}
export default Editor;