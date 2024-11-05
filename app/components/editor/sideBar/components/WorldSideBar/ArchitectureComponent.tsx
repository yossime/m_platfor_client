"use client"

import React, { useEffect, useState } from "react";
import { useEditor } from "@/context/useEditorContext";
import { InputMode, InputSize } from "@constants/input";
import {
  ButtonMode,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from "@constants/button";
import { FontWeight, TextSize } from "@constants/text";
import { IconName, IconSize } from "@constants/icon";
import Icon from "@/components/Library/icon/Icon";
import Button from "@/components/Library/button/Button";
import Text from "@/components/Library/text/Text";
import { IconColor } from "@constants/colors";
import {
  SubButton,
  SubContainer,
  SubWrapper,
  Container,
  Divider,
} from "../general/CommonStyles";
import { useSidebarContext } from "@/context/SidebarContext ";
import {
  AssetModels,
  ContentDataType,
  ESkybox,
  ModelType,
} from "@/components/editor/types";
import { useSelectedObject } from "@/components/editor/context/Selected.context";
import DragAndDrop from "@/components/Library/general/DragAndDrop";
import { uploadFile } from "@/services/upload.service";
import { CustomModel } from "@/components/editor/viewport/models/assetModels/CustomModel";

const options = [
  { value: ESkybox.DEFAULT, label: "Default" },
  { value: ESkybox.DARK, label: "Dark" },
];

interface ArchitectureComponentProps {
  handleBackOrAdd: () => void;
}

export const ArchitectureComponent: React.FC<ArchitectureComponentProps> = ({
  handleBackOrAdd,
}) => {
  const { setActiveSidebarHeader } = useSidebarContext();
  const { selectedObject, setSelectedObject } = useSelectedObject();

  const { sceneModel } = useEditor();
  const [panels, setPanels] = useState<any[]>([]);

  useEffect(() => {
    if (sceneModel?.root?.architecture) {
      const scenePanels = sceneModel.root.architecture.children;
      setPanels(scenePanels);
    }
  }, [sceneModel]);

  const handleSelect = (panel: any) => {
    setActiveSidebarHeader(panel.name);
    // sceneModel?.setSelectedObject(panel);
  };

  const handleModelUpload = async (file: File) => {
    try {
      const modelResponse = await uploadFile(file);

      const extractModelPath = (url: string) => {
        const parts = url.split("/");
        const userId = parts[parts.length - 2];
        const fileName = parts[parts.length - 1].split(".")[0];

        return `${userId}/${fileName}`;
      };

      const modelPath = extractModelPath(modelResponse);

      if (sceneModel?.root?.architecture) {
        sceneModel.root.architecture.setContentModels(
          ContentDataType.BUTTON,
          AssetModels.CUSTOM_MODEL,
          modelPath
        );
        console.log(modelPath);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handlAddModel = () => {
    if (sceneModel?.root?.architecture) {
      sceneModel.root.architecture.setContentModels(
        ContentDataType.BUTTON,
        AssetModels.LIBRAY_MODEL,
        "test1"
      );
    }
  };

  return (
    <Container>
      {panels.length > 0 && (
        <SubWrapper>
          <Text $weight={FontWeight.SEMI_BOLD} size={TextSize.TEXT2}>
            My Boards
          </Text>
          <SubContainer>
            {panels.map((panel, index) => (
              <SubButton key={index}>
                <Text size={TextSize.TEXT2}>
                  Board {index + 1}: {panel.name}
                </Text>
                <Icon
                  name={IconName.TRASH}
                  color={IconColor.PRIMARY}
                  size={IconSize.SMALL}
                  onClick={() => {}}
                />
                <Icon
                  onClick={() => handleSelect(panel)}
                  name={IconName.EDIT}
                  color={IconColor.PRIMARY}
                  size={IconSize.SMALL}
                />
              </SubButton>
            ))}
          </SubContainer>
        </SubWrapper>
      )}

      <Button
        type={ButtonType.PRIMARY}
        variant={ButtonVariant.SECONDARY}
        size={ButtonSize.LARGE}
        icon={IconName.PLUS}
        onClick={handleBackOrAdd}
        mode={ButtonMode.NORMAL}
        fullWidth={true}
      />
      <Button
        type={ButtonType.PRIMARY}
        variant={ButtonVariant.SECONDARY}
        size={ButtonSize.LARGE}
        text="add model from libray"
        onClick={handlAddModel}
        mode={ButtonMode.NORMAL}
        fullWidth={true}
      />
      <DragAndDrop buttonOnly type="model" onFileAdded={handleModelUpload} />
    </Container>
  );
};

export default ArchitectureComponent;
