import React, { useEffect, useRef, useState } from "react";
import { Container } from "../general/CommonStyles";
import { getModelsName } from "@/services/model.service";
import { useEditor } from "@/context/useEditorContext";
import Icon from "@/components/Library/icon/Icon";
import Text from "@/components/Library/text/Text";
import { IconColor, TextColor } from "@constants/colors";
import { FontWeight, TextSize } from "@constants/text";
import { IconName, IconSize } from "@constants/icon";
import Tooltip from "@/components/Library/general/Tooltip";
import { useSidebarContext } from "@/context/SidebarContext ";
import { useSelectedObject } from "@/components/editor/context/Selected.context";
import {
  DraggedWidgetContainer,
  WidgetButton,
  WidgetContainer,
} from "../chooseBoard/ChooseBoardWidgetStyles";
import { LibrayModel } from "@/components/editor/viewport/models/assetModels/LibrayModel";
import { AssetModel } from "@/components/editor/viewport/models/assetModels/AssetModel";
import DragAndDrop from "@/components/Library/general/DragAndDrop";
import { AssetModels } from "@/components/editor/types";
import { uploadFile } from "@/services/upload.service";

export const ModelLibrary: React.FC = () => {
  const { sceneModel } = useEditor();
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const { setActiveSidebarHeader } = useSidebarContext();
  const { setSelectedObject } = useSelectedObject();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  const draggingWidgetRef = useRef<string | null>(null);
  const modelref = useRef<AssetModel | null>(null);
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    const fetchLandscapes = async () => {
      const data = await getModelsName();
      if (data.files) {
        setModels(data.files);
      }
    };
    fetchLandscapes();
  }, []);

  const handleMouseDown = async (model: string, event: React.MouseEvent) => {
    setSelectedModel(model);
    const newModel = new LibrayModel(model);
    await newModel.loadModelAndDisplay();
    if (sceneModel?.root && newModel && sceneModel.root) {
      // console.log("model",newModel.name)
      sceneModel.root.addAssets(newModel);
      modelref.current = newModel;
      setSelectedObject(modelref.current);
      // if (modelref.current.name) setActiveSidebarHeader(modelref.current.name);
    }

    draggingWidgetRef.current = model;
    setInitialPosition({ x: event.pageX, y: event.pageY });
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const deltaX = Math.abs(event.pageX - initialPosition.x);
    const deltaY = Math.abs(event.pageY - initialPosition.y);
    if ((deltaX > 5 || deltaY > 5) && draggingWidgetRef.current) {
      draggingWidgetRef.current;
    }
    setMousePosition({ x: event.pageX, y: event.pageY });
  };

  const handleMouseUp = () => {
    setSelectedModel(null);

    if (
      (sceneModel?.root?.architecture?.finishDraging() &&
        draggingWidgetRef.current,
      modelref.current)
    ) {
      // setSelectedObject(modelref.current);
      // if (modelref.current.name) setActiveSidebarHeader(modelref.current.name);
    }
    draggingWidgetRef.current = null;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
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
        sceneModel.root.addModels(AssetModels.CUSTOM_MODEL, modelPath);
        console.log(modelPath);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <Container>
      <DragAndDrop buttonOnly type="model" onFileAdded={handleModelUpload} />

      <WidgetContainer>
        {models.map((model) => (
          <Tooltip delay={800} key={model} content={model}>
            <WidgetButton
              key={model}
              onMouseDown={(e) => handleMouseDown(model, e)}
              $clicked={selectedModel === model}
            >
              <Icon
                name={IconName.ALIGNTOP}
                size={IconSize.MEDIUM}
                color={IconColor.ICONCOLOR}
              />
              <Text
                $cursorStyle="pointer"
                size={TextSize.TEXT2}
                $weight={FontWeight.NORMAL}
                color={TextColor.PRIMARY_TEXT}
              >
                {model}
              </Text>
            </WidgetButton>
          </Tooltip>
        ))}
        {draggingWidgetRef.current && (
          <DraggedWidgetContainer
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              pointerEvents: "none",
            }}
          >
            <WidgetButton
              key={draggingWidgetRef.current}
              $clicked={selectedModel === draggingWidgetRef.current}
            >
              <Icon
                name={IconName.ALIGNTOP}
                size={IconSize.MEDIUM}
                color={IconColor.ICONCOLOR}
              />
              <Text
                $cursorStyle="pointer"
                size={TextSize.TEXT2}
                $weight={FontWeight.NORMAL}
                color={TextColor.PRIMARY_TEXT}
              >
                {draggingWidgetRef.current}
              </Text>
            </WidgetButton>
          </DraggedWidgetContainer>
        )}
      </WidgetContainer>
    </Container>
  );
};
