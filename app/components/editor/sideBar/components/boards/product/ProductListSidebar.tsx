import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useProject } from "@/context/useProjectContext";
import { Product } from "@/components/dashboard/types/product.types";
import { useProducts } from "@/context/useProducts";
import Text from "@/components/Library/text/Text";
import { BackgroundColor, TextColor } from "@constants/colors";
import { useRouter } from "next/navigation";
import Icon from "@/components/Library/icon/Icon";
import { IconName } from "@constants/icon";
import Button from "@/components/Library/button/Button";
import {
  ButtonMode,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from "@constants/button";
import { useEditor } from "@/context/useEditorContext";
import { ProductBoardABC } from "@/components/editor/viewport/models/boards/productBoards";
import { ProductBoard, ProductStand } from "@/components/editor/types";

const ProductsWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 70px;
`;

const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  background-color: #ffffff;
  min-height: 64px;
  padding: 10px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const TextCell = styled.div`
  padding: 10px;
  align-items: center;
  text-align: center;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-left: 10px;
`;

const CenteredMessage = styled.div`
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  color: #555;
  height: 100%;
`;

const ButtonContainer = styled.div`
  position: absolute;
  height: 72px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${BackgroundColor.ALL_GREY_BACKGROUND};
  padding: 10px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
`;

const ProductImage = styled.img`
  width: 56px;
  height: 56px;
  object-fit: cover;
`;
const ProductListSidebar: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [boardProducts, setBoardProducts] = useState<Product[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(true);
  const { currentProject } = useProject();
  const router = useRouter();
  const { products } = useProducts(currentProject!);
  const { sceneModel } = useEditor();

  useEffect(() => {
    const board = sceneModel?.getSelectedObject() as ProductBoard;
    if (board) {
      const stands = board.getStands();
      if (stands) {
        const existingProducts = stands
          .map((stand) => stand.getProduct())
          .filter((p): p is Product => p !== null);
        setBoardProducts(existingProducts);
        setIsSelectionMode(existingProducts.length === 0);
      }
    }
  }, [sceneModel]);

  const handleProductToggle = (product: Product) => {
    setSelectedProducts((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const handleSelectComplete = () => {
    const board = sceneModel?.getSelectedObject() as ProductBoard;
    if (board) {
      const newProducts = selectedProducts.filter(
        (product) => !boardProducts.some((p) => p.id === product.id)
      );
      newProducts.forEach((product) => board.addStand(product));
      setBoardProducts((prev) => [...prev, ...newProducts]);
      setSelectedProducts([]);
      setIsSelectionMode(false);
    }
  };

  const handleRemoveProduct = (product: Product) => {
    const board = sceneModel?.getSelectedObject() as ProductBoard;
    if (board) {
      const stands = board.getStands();
      if (stands) {
        const standToRemove = stands.find(
          (stand) => stand.getProduct()?.id === product.id
        );
        if (standToRemove) {
          board.removeStand(standToRemove);
          setBoardProducts((prev) => prev.filter((p) => p.id !== product.id));
        }
      }
    }
  };

  const board = sceneModel?.getSelectedObject() as ProductBoard;
  const maxProducts = board ? board.maxStands : 6;
  return (
    <ProductsWrapper>
      {products.length ? (
        <>
          <ProductsContainer>
            {isSelectionMode
              ? products.map((product, index) => (
                  <ProductRow
                    key={index}
                    onClick={() => handleProductToggle(product)}
                  >
                    <ProductImage src={product.image} alt={product.title} />
                    <TextCell>{product.title}</TextCell>
                    <Checkbox
                      checked={selectedProducts.some(
                        (p) => p.id === product.id
                      )}
                      readOnly
                    />
                  </ProductRow>
                ))
              : boardProducts.map((product, index) => (
                  <ProductRow key={index}>
                    <ProductImage src={product.image} alt={product.title} />
                    <TextCell>{product.title}</TextCell>
                    <Icon
                      name={IconName.TRASH}
                      onClick={() => handleRemoveProduct(product)}
                    />
                  </ProductRow>
                ))}
          </ProductsContainer>
          <ButtonContainer>
            <Button
              type={ButtonType.PRIMARY}
              variant={ButtonVariant.SECONDARY}
              size={ButtonSize.MEDIUM}
              text="Manage products"
              onClick={() => router.push("/dashboard/products")}
              />
              {isSelectionMode ? (
                <Button
                  type={ButtonType.PRIMARY}
                  variant={ButtonVariant.PRIMARY}
                  size={ButtonSize.MEDIUM}
                  text={`Select ${selectedProducts.length}/${maxProducts}`}
                  onClick={handleSelectComplete}
                  mode={
                    selectedProducts.length === 0 ||
                    selectedProducts.length > maxProducts
                      ? ButtonMode.DISABLED
                      : ButtonMode.NORMAL
                  }
                />
              ) : (
                <Button
                  type={ButtonType.PRIMARY}
                  variant={ButtonVariant.PRIMARY}
                  size={ButtonSize.MEDIUM}
                  text="Add More Products"
                  onClick={() => setIsSelectionMode(true)}
                />
              )}
          </ButtonContainer>
        </>
      ) : (
        <CenteredMessage>
          <Icon name={IconName.EMPTY} />
          <Text> Seems like you haven't added any products yet</Text>
          <Text
            color={TextColor.LINK}
            onClick={() => router.push("/dashboard/products")}
          >
            Go to dashboard
          </Text>
        </CenteredMessage>
      )}
    </ProductsWrapper>
  );
};

export default ProductListSidebar;
