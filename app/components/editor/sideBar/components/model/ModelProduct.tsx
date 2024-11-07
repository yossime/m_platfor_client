import React, { useRef, useState } from "react";
import { Container } from "../general/CommonStyles";
import { useEditor } from "@/context/useEditorContext";
import Tooltip from "@/components/Library/general/Tooltip";
import { useSelectedObject } from "@/components/editor/context/Selected.context";
import { AssetModel } from "@/components/editor/viewport/models/assetModels/AssetModel";
import { useProject } from "@/context/useProjectContext";
import { useProducts } from "@/context/useProducts";
import { Product } from "@/components/dashboard/types/product.types";
import { CustomModel } from "@/components/editor/viewport/models/assetModels/CustomModel";
import styled from "styled-components";
import { BackgroundColor, BorderColor, SemanticColors } from "@constants/colors";
import LoadingSpinner from "@/components/Library/general/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";

export const WidgetContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

export const WidgetButton = styled.button<{ $clicked: boolean }>`
  width: 133px;
  height: 100px;
  padding: 0;
  background-color: ${BackgroundColor.PRIMARY_BACKGROUND};
  border: 1px solid ${BorderColor.UI_BORDER};
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.9;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background-color: ${BackgroundColor.PRIMARY_BACKGROUND_HOVER};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled),
  ${(props) =>
    props.$clicked &&
    `
    background-color: ${SemanticColors.PRIMARY_SELECTED};
    border-color: ${SemanticColors.PRIMARY};
  `}

  &:disabled {
    background-color: ${BackgroundColor.DISABLED_BACKGROUND};
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

export const ModelProduct: React.FC = () => {
  const { sceneModel } = useEditor();
  const [selectedModel, setSelectedModel] = useState<Product | null>(null);
  const { setSelectedObject } = useSelectedObject();
  const { currentProject } = useProject();
  const { products,isLoading } = useProducts(currentProject?.id!);

  const modelref = useRef<AssetModel | null>(null);
  const { user } = useAuth();

  const handleMouseDown = async (model: Product, event: React.MouseEvent) => {
    setSelectedModel(model);
    
    const filenameAndType = (url: string) => {
      const parts = url.split("/");
      const fileName = parts[parts.length - 1];
      return fileName;}

      
      if (model.model && user?.uid) {
      const fileNme = filenameAndType(model.model);
      const newModel = new CustomModel(fileNme,user?.uid);
      await newModel.loadModelAndDisplay();
      if (sceneModel?.root && newModel.getModel() && sceneModel.root) {
        sceneModel.root.addAssets(newModel);
        modelref.current = newModel;
        setSelectedObject(modelref.current);
      }
    }
  };


  return (
    <Container>
      {isLoading ? <LoadingSpinner/> :
      <WidgetContainer>
        {products.map((product) => (
          <Tooltip delay={800} key={product.SKU} content={product.description}>
            <WidgetButton
              key={product.SKU}
              onMouseDown={(e) => handleMouseDown(product, e)}
              $clicked={selectedModel === product}
            >
              <ProductImage src={product.image} alt={product.title} />
            </WidgetButton>
          </Tooltip>
        ))}
      </WidgetContainer>}
    </Container>
  );
};
