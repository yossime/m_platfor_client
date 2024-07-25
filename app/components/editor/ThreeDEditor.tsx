import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useEditor } from "@/context/useEditorContext";
import { CameraControls } from './camera/Camera';
import { useProject } from "@/context/useProjectContext";
import { TextboxWithText } from './laoder/LoadText';
import { CustomEnvironment } from './laoder/LaodHDR';
import Sidebar from './sideBar/SideBar';

interface ThreeDEditorProps {
  setEditorMode: (mode: boolean) => void;
}

const ThreeDEditor: React.FC<ThreeDEditorProps> = ({ setEditorMode }) => {
  const { currentProject } = useProject();
  const { dataParameters } = useProject();
  const {  cameraPosition, setCameraPosition, cameraDirection, setCameraDirection } = useEditor();
  const [externalText] = useState<string>("Hello, 3D World!");
  
  console.log(dataParameters,'dddddddddddddd');


  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', display: 'flex' }}>
      <Sidebar/>
      <div style={{ flex: 1 }}>
        <Canvas>
          <Suspense fallback={null}>
            <CameraControls
              cameraPosition={cameraPosition}
              setCameraPosition={setCameraPosition as React.Dispatch<React.SetStateAction<[number, number, number]>>}
              cameraDirection={cameraDirection}
              setCameraDirection={setCameraDirection as React.Dispatch<React.SetStateAction<[number, number, number]>>}
            />
            <ambientLight />
            <TextboxWithText text={externalText} />
            {/* <CustomEnvironment url={`https://server-cloud-run-service-kruirvrv6a-uc.a.run.app/environment?type=${dataParameters?.enviromentType}`} /> */}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeDEditor;