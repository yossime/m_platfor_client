import React from "react";
import { Container } from "../general/CommonStyles";
import { useEditor } from "@/context/useEditorContext";
import DragAndDrop from "@/components/Library/general/DragAndDrop";
import { uploadFile } from "@/services/upload.service";
import { useAuth } from "@/context/AuthContext";
import { CustomModel } from "@/components/editor/viewport/models/assetModels/CustomModel";

export const ModelLocal: React.FC = () => {
  const { sceneModel } = useEditor();
  const { user } = useAuth();

  const handleModelUpload = async (file: File) => {
    try {
      const modelResponse = await uploadFile(file);

      const extractModelPath = (url: string) => {
        const parts = url.split("/");
        const fileName = parts[parts.length - 1];

        return fileName;}

      const modelPath = extractModelPath(modelResponse);

      if (modelPath && user?.uid) {
        const newModel = new CustomModel(modelPath,user?.uid);
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
    </Container>
  );
};
