"use client";
import React, { useRef, useState } from "react";
import { useEditor } from "@/context/useEditorContext";
import DragAndDrop from "@/components/Library/general/DragAndDrop";
import { uploadFile } from "@/services/upload.service";
import { useAuth } from "@/context/AuthContext";
import { CustomModel } from "@/components/editor/viewport/models/assetModels/CustomModel";
import GeneratorComponent from "./GeneratorComponent";
import Popup from "@/components/Library/general/Popup";
import Button from "@/components/Library/button/Button";
import { ButtonSize, ButtonType, ButtonVariant } from "@constants/button";
import { IconName } from "@constants/icon";
import styled from "styled-components";




export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 16px;
  padding: 16px;

`;


export const AddModelMenu: React.FC = () => {
  const { sceneModel } = useEditor();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const parentRef = useRef(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleModelUpload = async (file: File) => {
    try {
      const modelResponse = await uploadFile(file);

      const extractModelPath = (url: string) => {
        const parts = url.split("/");
        const fileName = parts[parts.length - 1];

        return fileName;
      };

      const modelPath = extractModelPath(modelResponse);

      if (modelPath && user?.uid) {
        const newModel = new CustomModel(modelPath, user?.uid);
        await newModel.loadModelAndDisplay();
        if (sceneModel?.root && newModel && sceneModel.root) {
          sceneModel.root.addAssets(newModel);
        }
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <Container>
      <DragAndDrop buttonOnly type="model" onFileAdded={handleModelUpload} />
      {isOpen && (
          <Popup
          onClose={handleClose}
          title="Sample Popup"
          isCentered
          height={558}
          width={565}
          >
          <GeneratorComponent />
        </Popup>
      )}
      <Button
        type={ButtonType.PRIMARY}
        variant={ButtonVariant.SECONDARY}
        size={ButtonSize.LARGE}
        text="Ai 3D Generator"
        icon={IconName.PLUS}
        onClick={handleOpen}
      />
    </Container>
  );
};
