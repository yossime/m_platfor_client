import { useEditor } from "@/context/useEditorContext";
import {
  ContentDataType,
  EConfigType,
  EConfiguration,
  FormatBoard,
  IContentMaterial,
  IContentText,
  ISceneObject,
} from "../../types";
import { Board } from "../../viewport/models/boards/Board";

export const useBoardContent = () => {
  const { sceneModel } = useEditor();

  const getSelectedObject = (): ISceneObject | null => {
    if (!sceneModel) {
      console.warn("Scene model is not initialized");
      return null;
    }
    return sceneModel.getSelectedObject() ;
  };
  const getContentText = (type: ContentDataType): IContentText | null => {
    const selectedObject = getSelectedObject();
    if (!selectedObject) {
      console.warn("No object selected");
      return null;
    }
    return selectedObject.getContentText?.(type) ?? null;
  };

  const setContentText = (type: ContentDataType, value: string): void => {
    const selectedObject = getSelectedObject();
    if (!selectedObject) {
      console.warn("No object selected");
      return;
    }
    if (selectedObject.setContentText) {
      selectedObject.setContentText(type, { text: value });
    } else {
      console.warn("Selected object does not support setting content text");
    }
  };

  const getContentMaterial = (
    type: ContentDataType
  ): IContentMaterial | null => {
    const selectedObject = getSelectedObject();
    if (!selectedObject) {
      console.warn("No object selected");
      return null;
    }
    return selectedObject.getContentMaterial?.(type) ?? null;
  };

  const setContentMaterial = (
    type: ContentDataType,
    material: IContentMaterial
  ): void => {
    const selectedObject = getSelectedObject();
    if (!selectedObject) {
      console.warn("No object selected");
      return;
    }
    if (selectedObject.setContentMaterial) {
      try {
        selectedObject.setContentMaterial(type, material);
      } catch (error) {
        console.error("Error setting content material:", error);
      }
    } else {
      console.warn("Selected object does not support setting content material");
    }
  };

  const setConfiguration = (type: EConfigType, config: EConfiguration) => {
    const selectedObject = getSelectedObject();
    if (!selectedObject) {
      console.warn("No object selected");
      return null;
    }
    (selectedObject as Board).setConfiguration(type, config);
  };

  const getConfiguration = (): Map<EConfigType, EConfiguration> | null => {
    const selectedObject = getSelectedObject();
    if (!selectedObject) {
      console.warn("No object selected");
      return null;
    }
    return (selectedObject as Board).getConfiguration() ?? null;
  };

  const setLogoConfiguration = (type: EConfigType, config: EConfiguration) => {
    const selectedObject = getSelectedObject();
    if (!selectedObject) {
      console.warn("No object selected");
      return null;
    }
    (selectedObject as Board).setLogoConfiguration(type, config);
  };


  const getLogoConfiguration = (
  ): Map<EConfigType, EConfiguration> | null => {
    const selectedObject = getSelectedObject();
    if (!selectedObject) {
      console.warn("No object selected");
      return null;
    }
    return (selectedObject as Board).getLogoConfiguration?.() ?? null;
  };

  const setFormat = (format: FormatBoard) => {
    const selectedObject = getSelectedObject();
    if (!selectedObject) {
      console.warn("No object selected");
      return null;
    }
    (selectedObject as Board).setFormat(format);
  };

  const getFormat = (): FormatBoard | null => {
    const selectedObject = getSelectedObject();
    if (!selectedObject) {
      console.warn("No object selected");
      return null;
    }
    if (selectedObject instanceof Board) {
        return selectedObject.getFormat() ?? null;
      } else {
        console.warn("Selected object is not of type Board");
        return null;
      }  };


  return {
    getConfiguration,
    setConfiguration,
    getLogoConfiguration,
    setLogoConfiguration,
    setFormat,
    getFormat,
    getContentText,
    setContentText,
    getContentMaterial,
    setContentMaterial,
  };
};
