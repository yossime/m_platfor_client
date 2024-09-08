"use client"
import React from 'react';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode } from '@constants/button';
import Button from '../button/Button';
import { useProject } from '@/context/useProjectContext';
import axios from '@/utils/axios';
import { IconName } from '@constants/icon';
import { useEditor, EditorState } from '@/context/useEditorContext';
import { createSoundManager } from '@/components/editor/utils/SoundManager';

const previewApi = "https://server-cloud-run-service-kruirvrv6a-uc.a.run.app/preview";

// const previewApi = "http://localhost:3500/preview";

const EditorButton: React.FC = () => {
  const { editorMode, currentProject } = useProject();
  const { editorState, setEditorState, sceneModel } = useEditor();

  const { playNotificationSound, stopNotificationSound } = createSoundManager();


  const initiatePreview = async (): Promise<void> => {
    setEditorState(EditorState.LOADING);
    try {
        const dataParameters = await sceneModel?.exportToJson();
        console.log(dataParameters)
        if (currentProject && dataParameters) {
          await axios.post(`${previewApi}/${currentProject}`, {dataParameters});
            checkPreviewStatus();
        } else {
            throw new Error('Missing data parameters or current project');
        }
    } catch (error) {
        console.error('Failed to initiate preview:', error);
        setEditorState(EditorState.EDITING);
    }
};


  const checkPreviewStatus = async (): Promise<void> => {
    try {
      const response = await axios.get(`${previewApi}/${currentProject}`);
      console.log("response.status",response.status, currentProject)
      if (response.status === 200) {
        setEditorState(EditorState.PREVIEW);
        console.log("response",response)
        playNotificationSound()
      } else if(response.status === 201){
        setTimeout(checkPreviewStatus, 5000); 
      }
      else{
        console.error("No existing project")
      }
    } catch (error) {
      console.error('Failed to check preview status:', error);
      setEditorState(EditorState.EDITING);
    }
  };

  const handleButtonClick = () => {
    if (editorState === EditorState.EDITING) {
      initiatePreview();
    } else {
      setEditorState(EditorState.EDITING);
    }
  };

  const getButtonText = (): string => {
    switch (editorState) {
      case EditorState.EDITING:
        return "Preview";
      case EditorState.LOADING:
        return "Loading...";
      case EditorState.PREVIEW:
        return "Edit";
    }
  };

  if (!editorMode) return null;


  document.addEventListener('click', stopNotificationSound);


  return (
    <Button
      type={ButtonType.PRIMARY}
      variant={ButtonVariant.PRIMARY}
      mode={editorState === EditorState.LOADING ? ButtonMode.DISABLED : ButtonMode.NORMAL}
      size={ButtonSize.SMALL}
      text={getButtonText()}
      onClick={handleButtonClick}
      icon={editorState === EditorState.LOADING ? IconName.SPINNERGAP : undefined}
    />
  );
};

export default EditorButton;