"use client";
import React from "react";
import {
  ButtonType,
  ButtonVariant,
  ButtonSize,
  ButtonMode,
} from "@constants/button";
import { useProject } from "@/context/useProjectContext";
import axios from "@/utils/axios";
import { IconName, IconSize } from "@constants/icon";
import { useEditor, EditorState } from "@/context/useEditorContext";
import { createSoundManager } from "@/components/editor/utils/SoundManager";
import Button from "../Library/button/Button";
import Icon from "../Library/icon/Icon";
import Tooltip from "../Library/general/Tooltip";

const previewApi =
  "https://server-cloud-run-service-kruirvrv6a-uc.a.run.app/preview";

const EditorButtons: React.FC = () => {
  const { editorMode, currentProject } = useProject();
  const { editorState, setEditorState, sceneModel } = useEditor();

  const { playNotificationSound, stopNotificationSound } = createSoundManager();

  const initiatePreview = async (): Promise<void> => {
    setEditorState(EditorState.LOADING);
    try {
      const dataParameters = await sceneModel?.exportToJson();
      console.log(dataParameters);
      if (currentProject && dataParameters) {
        await axios.post(`${previewApi}/${currentProject}`, { dataParameters });
        checkPreviewStatus();
      } else {
        throw new Error("Missing data parameters or current project");
      }
    } catch (error) {
      console.error("Failed to initiate preview:", error);
      setEditorState(EditorState.EDITING);
    }
  };

  const checkPreviewStatus = async (): Promise<void> => {
    try {
      const response = await axios.get(`${previewApi}/${currentProject}`);
      console.log("response.status", response.status, currentProject);
      if (response.status === 200) {
        setEditorState(EditorState.PREVIEW);
        console.log("response", response);
        playNotificationSound();
      } else if (response.status === 201) {
        setTimeout(checkPreviewStatus, 5000);
      } else {
        console.error("No existing project");
      }
    } catch (error) {
      console.error("Failed to check preview status:", error);
      setEditorState(EditorState.EDITING);
    }
  };

  const handlePreviewClick = () => {
    if (editorState === EditorState.EDITING) {
      initiatePreview();
    } else {
      setEditorState(EditorState.EDITING);
    }
  };

  const getIcon = (): IconName => {
    switch (editorState) {
      case EditorState.EDITING:
        return IconName.PLAYCIRCLE;
      case EditorState.LOADING:
        return IconName.SPINNERGAP;
      case EditorState.PREVIEW:
        return IconName.EDIT;
    }
  };

  if (!editorMode) return null;

  document.addEventListener("click", stopNotificationSound);

  const handlePublishClick = () => {
    console.log("button clicked");
  };

  return (
    <>
        <Tooltip content={"Preview your environment in play mode"}>
        <Icon
          name={getIcon()}
          size={IconSize.LARGE}
          onClick={handlePreviewClick}
        />
      </Tooltip>
      <Tooltip content={"Make your site live!"}>
        <Button
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.SMALL}
          text={"Publish"}
          onClick={handlePublishClick}
          icon={IconName.EXPORT}
        />
      </Tooltip>
    </>
  );
};

export default EditorButtons;
