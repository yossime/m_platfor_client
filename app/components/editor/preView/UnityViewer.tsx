import { useAuth } from '@/context/AuthContext';
import { useProject } from '@/context/useProjectContext';
import React from 'react';
import styled from 'styled-components';




const ViewerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  flex-grow: 1;
`;

const UnityViewer: React.FC = () => {
  const {  currentProject } = useProject();
  const { user } = useAuth();

  return (
    <ViewerContainer>
      <StyledIframe
        title={`WebGL Viewer`}
        // src={` https://storage.googleapis.com/preview-storage-bucket/vmIGbcusznhyqC5vzYcQ/index.html`}

        src={` https://storage.googleapis.com/preview-storage-bucket/${user?.uid}/${currentProject}/index.html`}
      />
    </ViewerContainer>
  );
};

export default UnityViewer;