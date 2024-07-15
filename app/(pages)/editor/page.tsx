"use client"
import ThreeDEditor from '../../components/editor/ThreeDEditor'
import SideBar from "@/components/editor/sideBar/SideBar";
import { useState } from "react";
import UnityViewer from '@/components/preView/UnityViewer';
import { useProject } from '@/context/useProjectContext';



const Editor = () => {

    const [editorMode, setEditorMode] = useState<boolean>(true);
    const { currentProject , dataParameters } = useProject();

    return (
        <>
            {editorMode ? (
                <>
                    <ThreeDEditor setEditorMode={setEditorMode} />
                    {/* <EditMediaPopup /> */}
                    <SideBar />
                </>
            ) : (
                <UnityViewer projectId={currentProject as string} setEditorMode={setEditorMode} />
            )}
        </>
    );
}
export default Editor;