"use client"
import React from 'react';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode } from '@constants/button';
import Button from '../button/Button';
import { useProject } from '@/context/useProjectContext';
import axios from '@/utils/axios';
import { IconName } from '@constants/icon';
import { useEditor, EditorState } from '@/context/useEditorContext';

const previewApi = "https://server-cloud-run-service-kruirvrv6a-uc.a.run.app/preview";

const EditorButton: React.FC = () => {
  const { editorMode, currentProject } = useProject();
  const { editorState, setEditorState, sceneModel } = useEditor();

  const initiatePreview = async (): Promise<void> => {
    setEditorState(EditorState.LOADING);
    try {
        const dataParameters = await sceneModel?.exportToJson();
        if (dataParameters && currentProject) {
          await axios.post(`${previewApi}/${currentProject}`, dataParameters);
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
      if (response.status === 200) {
        setEditorState(EditorState.PREVIEW);
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

  console.log("Current editor :", editorState);

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