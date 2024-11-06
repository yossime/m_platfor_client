import {
  ContentDataType,
  EConfigType,
  EConfiguration,
  FormatBoard,
  ContentMaterial,
  InputField,
  InputLabelType,
  TextParams,
} from "../../../types";
import { Board } from "../../../viewport/models/boards/Board";
import { FormBoardABC } from "../../../viewport/models/boards/formBoards";
import { useSelectedObject } from "@/components/editor/context/Selected.context";

export const useBoardContent = () => {
  const { selectedObject } = useSelectedObject();


  const getContentText = (type: ContentDataType): TextParams| null => {
    if (!selectedObject) {
      console.log("No object selected");
      return null;
    }
    return selectedObject.getContentText?.(type) ?? null;
  };

  const setContentText = (type: ContentDataType, propertie: Partial<TextParams>): void => {
    if (!selectedObject) {
      console.warn("No object selected");
      return;
    }
    if (selectedObject.setContentText) {
      selectedObject.setContentText(type,  propertie );
    } else {
      console.warn("Selected object does not support setting content text");
    }
  };

  const getFormInput = (type: ContentDataType, label:InputLabelType): InputField | null => {
    if (!selectedObject) {
      console.warn("No object selected");
      return null;
    }
    return (selectedObject as FormBoardABC).getFormInput?.(type,label) ?? null;
  };

  const setFormInput = (type: ContentDataType,label:InputLabelType, input: InputField): void => {
    if (!selectedObject) {
      console.warn("No object selected");
      return;
    }
      (selectedObject as FormBoardABC).setFormInput(type,label,  input );
  };

  const getContentMaterial = (
    type: ContentDataType
  ): ContentMaterial | null => {
    if (!selectedObject) {
      console.warn("No object selected");
      return null;
    }
    return selectedObject.getContentMaterial?.(type) ?? null;
  };

  const setContentMaterial = (
    type: ContentDataType,
    material: ContentMaterial
  ): void => {
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
    if (!selectedObject) {
      console.warn("No object selected");
      return null;
    }
    (selectedObject as Board).setConfiguration(type, config);
  };

  const getConfiguration = (): Map<EConfigType, EConfiguration> | null => {
    if (!selectedObject) {
      console.warn("No object selected");
      return null;
    }
    return (selectedObject as Board).getConfiguration() ?? null;
  };

  const setLogoConfiguration = (type: EConfigType, config: EConfiguration) => {
    if (!selectedObject) {
      console.warn("No object selected");
      return null;
    }
    (selectedObject as Board).setLogoConfiguration(type, config);
  };


  const getLogoConfiguration = (
  ): Map<EConfigType, EConfiguration> | null => {
    if (!selectedObject) {
      console.warn("No object selected");
      return null;
    }
    return (selectedObject as Board).getLogoConfiguration?.() ?? null;
  };

  const setFormat = (format: FormatBoard) => {
    if (!selectedObject) {
      console.warn("No object selected");
      return null;
    }
    (selectedObject as Board).setFormat(format);
  };

  const getFormat = (): FormatBoard | null => {
    if (!selectedObject) {
      return null;
    }
    if (selectedObject instanceof Board) {
        return selectedObject.getFormat() ?? null;
      } else {
        return null;
      }  };


  return {
    setFormInput,
    getFormInput,
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
