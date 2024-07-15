import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Html, OrbitControls } from '@react-three/drei';
import { useEditor } from "@/context/useEditorContext";
import { CameraControls } from './camera/Camera';
import { Mesh } from 'three';
import { useProject } from "@/context/useProjectContext";
import { useProjectData } from "@/hooks/useProjectData";
import AddText from './controlPanl/AddText';
import AddCubeButton from './controlPanl/AddElement';
import { TextboxWithText } from './laoder/LoadText';
import { CustomEnvironment } from './laoder/LaodHDR';
// import AddImage from './controlPanl/AddImage';
import LoadModel from './laoder/Laoder';
import ControlsPanel from './controlPanl/ControlsPanel';
import { VideoObject } from './controlPanl/AddImage';
import axios from '@/utils/axios';


interface ThreeDEditorProps {
  setEditorMode: (mode: boolean) => void;
}

const ThreeDEditor: React.FC<ThreeDEditorProps> = ({ setEditorMode }) => {
  const { currentProject } = useProject();
  const { dataParameters, setDataParameters } = useProject();
  const { setCurrentMesh, cameraPosition, setCameraPosition, cameraDirection, setCameraDirection } = useEditor();
  const [externalText, setExternalText] = useState<string>("Hello, 3D World!");
  const [boxes, setBoxes] = useState<{ id: number, position: [number, number, number], color: string }[]>([]);

  const addCube = () => {
    const newPosition: [number, number, number] = [
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
    ];
    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const newBox = { id: boxes.length, position: newPosition, color: newColor };
    setBoxes([...boxes, newBox]);
  };
const getFbx = async () =>  {
  try 
{const responsefbx = await axios.get(`/project/fbx/${currentProject}`, {
});}
  catch (error: any) {
    console.error(error);
  }
}
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <AddText setExternalText={setExternalText} />
      <AddCubeButton onClick={addCube} />
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
           <CustomEnvironment url={`https://server-cloud-run-service-kruirvrv6a-uc.a.run.app/environment?type=${dataParameters?.enviromentType}`} />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-3, 0, 0]} />
          <Box position={[3, 0, 0]} />
          <Box position={[0, -3, 0]} />
          {boxes.map((box) => (
            <Box
              key={box.id}
              position={box.position}
              onClick={(e) => setCurrentMesh(e.object as Mesh)}
            >
              <meshStandardMaterial attach="material" color={box.color} />
            </Box>
          ))}
          {/* <VideoObject/> */}
          {/* <AddImage /> */}
          <LoadModel type={'FBX'} url={`https://server-cloud-run-service-kruirvrv6a-uc.a.run.app/project/fbx/1dxd87kpcKWUQo4mSxYl`} position={[0, 0, 0]} />
        </Suspense>
      </Canvas>
      <ControlsPanel />
      <button onClick={() =>setEditorMode(false)} >preview</button>
    </div>
  );
};

export default ThreeDEditor;
