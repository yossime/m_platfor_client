"use client"
import React, { useEffect, useState } from "react";
import {
  ButtonType,
  ButtonVariant,
  ButtonSize,
} from "@constants/button";
import { useProject } from "@/context/useProjectContext";
import axios from "@/utils/axios";
import { IconName, IconSize } from "@constants/icon";
import { useEditor, EditorState } from "@/context/useEditorContext";
import { createSoundManager } from "@/components/editor/utils/SoundManager";
import Button from "../Library/button/Button";
import Icon from "../Library/icon/Icon";
import Tooltip from "../Library/general/Tooltip";
import PublishPopup from "../editor/publish/PublishPopup";
import PublishPopupContent from "../editor/publish/PublishPopupContent";

const EditorButtons: React.FC = () => {
  const {  currentProject } = useProject();
  const { editorState, setEditorState, sceneModel } = useEditor();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { playNotificationSound, stopNotificationSound } = createSoundManager();

  const initiatePreview = async (): Promise<void> => {
    setEditorState(EditorState.LOADING);
    try {
      const dataParameters = await sceneModel?.exportToJson();

      if (currentProject && dataParameters) {
        await axios.post(`preview/${currentProject.id}`, { dataParameters });
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
      const response = await axios.get(`preview/${currentProject}`);
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


  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("click", stopNotificationSound);
    }
    return () => {
      document.removeEventListener("click", stopNotificationSound);
    };
  }, []);


  const handlePublishClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <Tooltip content={"Preview your environment in play mode"}>
        <Icon
          shouldRotate={editorState === EditorState.LOADING ? true : false}
          name={getIcon()}
          size={IconSize.LARGE}
          onClick={handlePreviewClick}
        />
      </Tooltip>
      <div className="navbarButton"></div>
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
      {showPopup && <PublishPopup onClose={() => {handlePublishClick()}}><PublishPopupContent/></PublishPopup>}
    </>
  );
};

export default EditorButtons;
