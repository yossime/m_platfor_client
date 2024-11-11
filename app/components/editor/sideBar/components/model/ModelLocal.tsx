"use client";
import React, { useRef, useState } from "react";
import { Container } from "../general/CommonStyles";
import Popup from "@/components/Library/general/Popup";
import Button from "@/components/Library/button/Button";
import { ButtonSize, ButtonType, ButtonVariant } from "@constants/button";
import { AddModelMenu } from "./modelMenu";
import { IconName } from "@constants/icon";
import GeneratorComponent from "./GeneratorComponent";
import { useEditor } from "@/context/useEditorContext";
import LoadingSpinner from "@/components/Library/general/LoadingSpinner";
import {
  WidgetButton,
  WidgetContainer,
} from "../chooseBoard/ChooseBoardWidgetStyles";
import Tooltip from "@/components/Library/general/Tooltip";
import { CustomModel } from "@/components/editor/viewport/models/assetModels/CustomModel";
import { useAuth } from "@/context/AuthContext";
import { AssetModel } from "@/components/editor/viewport/models/assetModels/AssetModel";
import { useSelectedObject } from "@/components/editor/context/Selected.context";
import { useProject } from "@/context/useProjectContext";
import styled from "styled-components";
import { useModels } from "@/hooks/useUserModels";
import { UserModel } from "./models.types";
import { GenerateModel } from "@/components/editor/viewport/models/assetModels/GenerateModel";

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;


export const ModelLocal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenGenerator, setIsOpenGenerator] = useState(false);

  const parentRef = useRef(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleOpenGenerator = () => {
    handleClose(), setIsOpenGenerator(true);
  };
  const handleCloseGenerator = () => setIsOpenGenerator(false);

  const { sceneModel } = useEditor();
  const [selectedModel, setSelectedModel] = useState<UserModel | null>(null);
  const { setSelectedObject } = useSelectedObject();
  const { currentProject } = useProject();
  const [models, setModels] = useState<UserModel[]>([]);

  // const { models, isLoading } = useModels(currentProject?.id!);

  const modelref = useRef<AssetModel | null>(null);
  const { user } = useAuth();

  const handleMouseDown = async (model: UserModel, event: React.MouseEvent) => {
    setSelectedModel(model);

    if (model.model && user?.uid) {
      const newModel = new GenerateModel(model.model, user?.uid);
      await newModel.loadModelAndDisplay();
      if (sceneModel?.root && newModel.getModel() && sceneModel.root) {
        sceneModel.root.addAssets(newModel);
        modelref.current = newModel;
        setSelectedObject(modelref.current);
      }
    }
  };

  return (
    <Container ref={parentRef}>
      <Button
        type={ButtonType.PRIMARY}
        variant={ButtonVariant.SECONDARY}
        size={ButtonSize.LARGE}
        text="Add model"
        icon={IconName.PLUS}
        onClick={handleOpen}
      />
      {isOpen && (
        <Popup
          isCentered={false}
          onClose={handleClose}
          closeButton={false}
          parentRef={parentRef}
          height={292}
          width={216}
        >
          <AddModelMenu
            onClose={handleClose}
            handleOpenGenerator={handleOpenGenerator}
          />
        </Popup>
      )}
      {isOpenGenerator && (
        <Popup
          isCentered={false}
          parentRef={parentRef}
          onClose={handleCloseGenerator}
          title="Ai 3D Generator"
          height={560}
          width={565}
        >
          <GeneratorComponent handleCloseGenerator={handleCloseGenerator} setModels={setModels}/>
        </Popup>
      )}

      {/* {isLoading ? (
        <LoadingSpinner />
      ) : ( */}
        <WidgetContainer>
          {models.map((model) => (
            <Tooltip
              delay={800}
              content={model.name}
              key={model.id || model.name}
            >
              <WidgetButton
                onMouseDown={(e) => handleMouseDown(model, e)}
                $clicked={selectedModel === model}
              >
                <ProductImage src={model.image} alt={model.name} />
              </WidgetButton>
            </Tooltip>
          ))}
        </WidgetContainer>
      {/* )} */}
    </Container>
  );
};
