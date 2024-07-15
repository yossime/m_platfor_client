import axios from 'axios';
import React, { useEffect, useRef } from 'react';


const privewApi = "http://localhost:3500"
export const sendHeartbeat = async (projectName: string): Promise<void> => {
  await axios.post(`${privewApi}/${projectName}/heartbeat`);
};

interface UnityViewerProps {
  projectId: string;
  setEditorMode: (mode: boolean) => void;

}



const UnityViewer: React.FC<UnityViewerProps> = ({ projectId ,setEditorMode }) => {
  const projectUrl = `${privewApi}/${projectId}`;
  const heartbeatIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    heartbeatIntervalRef.current = window.setInterval(() => {
      sendHeartbeat(projectId).catch(console.error);
    }, 30000); 

    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
    };
  }, [projectId]);

  return (
    <div>
      <button onClick={() => setEditorMode(false)} >editor</button>

      <h2>Unity Viewer: {projectId}</h2>
      <iframe
        title={`Unity WebGL Viewer - ${projectId}`}
        src={projectUrl}
        width="800"
        height="600"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default UnityViewer;